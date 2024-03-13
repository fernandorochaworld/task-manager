import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import { addTask, deleteTask } from "../reducers/taskManagerReducer";


const Task = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { taskListId, taskId } = useParams();
    const taskListIndex = useSelector(state => state.taskManager.taskListIndex);
    const task = taskListIndex.find(item => item.id == taskListId)?.tasks.find(task => task.id === taskId);
    // const task = useSelector(state => state.taskManager.taskListIndex.find(item => item.id == taskListId)?.tasks.find(task => task.id === taskId));

    const [data, setData] = useState(task);

    // const testValue = useSelector(state => state.test);

    const handleClickSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // const action = {
        //     type: 'test',
        //     payload: 'ABCD'
        // };

        // dispatch(action);
        // alert('here');
        const editedTask = { ...data };
        editedTask.taskListId = taskListId;
        dispatch(addTask(editedTask));
        handleGoBack();
    }

    const handleClickDeleteTask = () => {
        if (data.id) {
            const confirmation = confirm(`Are you sure to remove this task "${data.title}"?`);
            if (confirmation) {
                const editedTask = { ...data };
                editedTask.taskListId = taskListId;
                dispatch(deleteTask(editedTask));
                handleGoBack();
            }
        }
    }

    function handleFieldChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    function handleGoBack() {
        navigate(`/task-list/${taskListId}`);
    }

    return (
        <form className="flex flex-wrap gap-5">
            <div className="flex flex-1 justify-between">
                <h1 className="tm-title-2 text-start">
                    Task
                </h1>
                <Button title="x" className="w-12" styleType="transparent" onClick={handleGoBack} />
            </div>

            <Input type="text" name="title" title="Title" value={data.title} onChange={handleFieldChange} />

            <div className="flex w-full gap-5">
                <Input type="date" name="dueDate" title="Due Date" value={data.dueDate} onChange={handleFieldChange} />

                <Select name="priority" title="Priority"
                    value={data.priority}
                    options={{ high: 'High', medium: 'Medium', low: 'Low' }}
                    onChange={handleFieldChange}
                />

                <Select name="status" title="status"
                    value={data.status}
                    options={{ todo: 'Todo', inProgress: 'In Progress', done: 'Done' }}
                    onChange={handleFieldChange}
                />
            </div>

            <Textarea name="description" title="Description" value={data.description} onChange={handleFieldChange} />

            {
                data.id &&
                <Button title="Delete" className="flex-1" styleType="danger" onClick={handleClickDeleteTask} />
            }
            
            <Button title="Save" type="submit" className="flex-1" styleType="primary" onClick={handleClickSave} />
        </form>
    )
};

export default Task;