import { redirect, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { addTask, addTaskList } from "../reducers/taskManagerReducer";
import { useState } from "react";
import TaskDetail from "./TaskDetails";

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
    const [pageKey, setPageKey] = useState(1);

    function handleGoBack() {
        navigate('/');
    }

    function handleFieldChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    function handleTaskTitleChange(e) {
        setTaskTitle(e.target.value);
    }

    const handleClickSave = (e) => {
        e.preventDefault();
        
        const newTask = {
            ...data,
            id: data.id || data.name
        };

        console.log(newTask);
        dispatch(addTaskList(newTask));
        // dispatch(setSelectedTaskList(null));
        navigate('/')
    }

    function handleSelectTask(task) {
        console.log(task);
        navigate(`/task-list/${data.id}/task/${task.id}`);
    }

    function handleAddTask(e) {
        e.preventDefault();
        e.stopPropagation();
        const newTask = {
            ...taskInitialData,
            id: taskTitle,
            title: taskTitle,
        };
        const newData = {
            ...data,
            tasks: data.tasks.map(item => item)
        };
        newData.tasks.push(newTask);
        newData.id = newData.id || newData.name;
        setData(newData);
        setTaskTitle('');
        
        //Save TaskList
        dispatch(addTaskList(newData));
    }

    const handleClickUpdateTask = (task, propertyName, newValue) => {
        const editedTask = {...task};
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
        setPageKey(pageKey+1);
        
        handleGoBack();
        setTimeout(()=> navigate(`/task-list/${data.id}`));
    }

    return (
        <form className="flex flex-wrap gap-5">
            <div className="flex flex-1 justify-between">
                <h1 className="tm-title text-start">
                    Task List
                </h1>
                <Button text="X" title="Go to Index" className="w-12 text-bold" styleType="transparent" onClick={handleGoBack} />
            </div>
            <Input type="text" name="name" title="List Name" value={data.name} onChange={handleFieldChange} />


            <form className="flex w-full justify-between items-end gap-5">
                <Input type="text" name="taskTitle" title="New Task" value={taskTitle} onChange={handleTaskTitleChange} />
                <Button type="submit" title="Add Task" styleType="primary" className="w-24" onClick={handleAddTask} />
            </form>



            <div key={pageKey} className="w-full">
                * My Tasks
                <ul>
                    <li className="flex justify-between items-center m-2 bg-gray-100 font-bold">
                        <div className="w-2/4">Title</div>
                        <div className="w-1/4">Priority</div>
                        <div className="w-1/4">DueDate</div>
                        <div className="w-28">Actions</div>
                    </li>
                </ul>
                <TaskDetail key={`InProgress`+pageKey} tasks={data.tasks} status="inProgress" handleClickUpdateTask={handleClickUpdateTask} handleSelectTask={handleSelectTask} />
                <TaskDetail key={`Todo`+pageKey} tasks={data.tasks} status="todo" handleClickUpdateTask={handleClickUpdateTask} handleSelectTask={handleSelectTask} />
                <TaskDetail key={`Done`+pageKey} tasks={data.tasks} status="done" handleClickUpdateTask={handleClickUpdateTask} handleSelectTask={handleSelectTask} />
            </div>

            <Button title="Save" type="submit" styleType="primary" className="flex-1" onClick={handleClickSave} />
        </form>
    )
};

export default TaskList;