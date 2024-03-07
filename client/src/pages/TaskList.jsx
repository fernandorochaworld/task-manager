import { redirect, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { addTaskList } from "../reducers/taskManagerReducer";
import { useEffect, useState } from "react";

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
    dueDate: new Date().toJSON(),
};

const TaskList = () => {
    const { id } = useParams();
    const taskList = useSelector(state => state.taskManager.taskListIndex.find(item => item.id == id));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(taskList || taskListInitialData);
    const [taskTitle, setTaskTitle] = useState('');

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

    return (
        <form className="flex flex-wrap gap-5">
            <div className="flex flex-1 justify-between">
                <h1 className="tm-title text-start">
                    Task List
                </h1>
                <Button title="x" className="w-12" onClick={handleGoBack} />
            </div>
            <Input type="text" name="name" title="List Name" value={data.name} onChange={handleFieldChange} />


            <form className="flex w-full justify-between items-end gap-5">
                <Input type="text" name="taskTitle" title="New Task" value={taskTitle} onChange={handleTaskTitleChange} />
                <Button type="submit" title="Add Task" styleType="primary" className="w-24" onClick={handleAddTask} />
            </form>



            <div className="w-full">
                * My Tasks
                <ul>
                    {data.tasks.map(task => (
                        <li key={task.id} className="flex justify-between items-center m-2 odd:bg-gray-100 even:bg-gray-50">
                            {task.title}
                            <Button className="w-28" title="Select ✔️" onClick={() => handleSelectTask(task)}></Button>
                        </li>
                    ))}
                </ul>
            </div>

            <Button title="Save" type="submit" styleType="primary" className="flex-1" onClick={handleClickSave} />
        </form>
    )
};

export default TaskList;