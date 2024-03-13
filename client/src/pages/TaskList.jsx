import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { addTask, addTaskList, deleteTask, deleteTaskList } from "../reducers/taskManagerReducer";
import { useState } from "react";
import TaskDetail from "../components/TaskDetails";

const taskListInitialData = {
    id: '',
    name: '',
    tasks: [],
};
const taskInitialData = {
    id: null,
    title: '',
    description: null,
    priority: 'medium',
    status: 'todo',
    dueDate: null,
};

const TaskList = () => {
    const updateTaskList = (state) => state.taskManager.taskListIndex.find(item => item.id == id)
    const { id } = useParams();
    const taskList = useSelector(updateTaskList);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(taskList || taskListInitialData);
    const [taskTitle, setTaskTitle] = useState('');
    const [errorTask, setErrorTask] = useState(null);
    const [errorList, setErrorList] = useState(null);

    function handleGoBack() {
        navigate('/');
    }

    function handleFieldChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const validateList = () => {
        const name = data?.name?.trim();
        return name ? null : 'List name is required.';
    }

    const validateTask = () => {
        const title = taskTitle.trim();
        return title ? null : 'New task title is required.';
    }

    function handleTaskTitleChange(e) {
        setTaskTitle(e.target.value);
    }

    const reloadData = (taskListId) => {
        handleGoBack();
        setTimeout(() => navigate(`/task-list/${taskListId}`));
    }

    const handleClickSave = (e) => {
        e.preventDefault();

        const error = validateList();
        if (error) {
            setErrorList(error);
            return;
        }
        setErrorList(null);

        const newTaskList = {
            ...data,
            id: data.id || data.name
        };

        console.log(newTaskList);
        dispatch(addTaskList(newTaskList));

        // If adding new Task List, then continue on the page. Else go back.
        if (data.id) {
            handleGoBack();
        } else {
            setData(newTaskList);
            reloadData(newTaskList.id);
        }
    }

    const handleClickDelete = (e) => {
        e.preventDefault();

        if (data.id) {

            const confirmation = confirm(`Are you sure to remove this task list "${data.name}"?`);
            if (confirmation) {
                setErrorList(null);

                dispatch(deleteTaskList(data));
                handleGoBack();
            }
        }
    }

    function handleSelectTask(task) {
        console.log(task);
        navigate(`/task-list/${data.id}/task/${task.id}`);
    }

    function handleAddTask(e) {
        e.preventDefault();
        e.stopPropagation();

        const error = validateTask();
        if (error) {
            setErrorTask(error);
            return;
        }
        setErrorTask(null);

        const newTask = {
            ...taskInitialData,
            id: taskTitle,
            title: taskTitle,
        };
        const newList = {
            ...data,
            tasks: data.tasks.map(item => item)
        };
        newList.tasks.push(newTask);
        newList.id = newList.id || newList.name;
        setData(newList);
        setTaskTitle('');

        //Save TaskList
        dispatch(addTaskList(newList));
        // reloadData(data.id);
    }

    const handleClickUpdateTask = (task, propertyName, newValue) => {
        const editedTask = { ...task };
        const levels = {
            high: 'low',
            medium: 'high',
            low: 'medium',
        }
        editedTask.taskListId = taskList.id;
        if (propertyName === 'priority') {
            editedTask['priority'] = levels[editedTask.priority] || 'high';
        } else {
            editedTask[propertyName] = newValue;
        }
        dispatch(addTask(editedTask));

        reloadData(data.id);
    }

    const handleClickDeleteTask = (task) => {
        if (task.id) {

            const confirmation = confirm(`Are you sure to remove this task "${task.title}"?`);
            if (confirmation) {
                const editedTask = { ...task };
                editedTask.taskListId = taskList.id;
                dispatch(deleteTask(editedTask));

                reloadData(data.id);
            }
        }
    }

    return (
        <form className="flex flex-wrap gap-5">
            <div className="flex flex-1 justify-between">
                <h1 className="tm-title-2 text-start">
                    Task List
                </h1>
                <Button text="X" title="Go to Index" className="w-12 text-bold" styleType="transparent" onClick={handleGoBack} />
            </div>
            <Input type="text" name="name" title="List Name" value={data.name} error={errorList} onChange={handleFieldChange} />


            {
                taskList?.id &&
                <>
                    <form className="flex w-full justify-between items-end gap-5">
                        <Input type="text" name="taskTitle" title="New Task" placeholder="Type and press enter to add a new task."
                            value={taskTitle}
                            onChange={handleTaskTitleChange}
                            error={errorTask}
                        />
                        <Button type="submit" title="Add Task" styleType="primary" className="w-24" onClick={handleAddTask} />
                    </form>

                    <div className="w-full">
                        <TaskDetail tasks={data.tasks} status="inProgress" handleClickUpdateTask={handleClickUpdateTask} handleSelectTask={handleSelectTask} handleClickDeleteTask={handleClickDeleteTask} />
                        <TaskDetail tasks={data.tasks} status="todo" handleClickUpdateTask={handleClickUpdateTask} handleSelectTask={handleSelectTask} handleClickDeleteTask={handleClickDeleteTask} />
                        <TaskDetail tasks={data.tasks} status="done" handleClickUpdateTask={handleClickUpdateTask} handleSelectTask={handleSelectTask} handleClickDeleteTask={handleClickDeleteTask} />
                    </div>
                </>
            }

            {
                data.id &&
                <Button title="Delete" type="button" styleType="danger" className="flex-1" onClick={handleClickDelete} />
            }
            <Button title="Save" type="submit" styleType="primary" className="flex-1" onClick={handleClickSave} />
        </form>
    )
};

export default TaskList;