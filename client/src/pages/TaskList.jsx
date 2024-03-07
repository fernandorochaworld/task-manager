import { redirect, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { addTaskList, setSelectedTaskList } from "../reducers/taskManagerReducer";
import { useState } from "react";

const taskListInitialData = {
    id: '',
    name: '',
    tasks: [],
};

const TaskList = () => {
    const taskList = useSelector(state => state.taskManager.selectedTaskList);
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(taskList || taskListInitialData);

    function handleGoBack() {
        navigate('/');
    }

    function handleFieldChang(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    const handleClickSave = () => {
        data.id = data.id ?? data.name;
        dispatch(addTaskList(data));
        dispatch(setSelectedTaskList(null));
        navigate('/')
    }

    return (
        <form className="flex flex-wrap gap-5">
            <div className="flex flex-1 justify-between">
                <h1 className="tm-title text-start">
                    Task List
                </h1>
                <Button title="x" className="w-12" onClick={handleGoBack} />
            </div>
            <Input type="text" name="name" title="List Name" value={data.name} onChange={handleFieldChang} />
            <Button title="Add New Task" className="flex-1" onClick={() => navigate('/task')} />
            <Button title="Save" type="submit" styleType="primary" className="flex-1" onClick={handleClickSave} />
        </form>
    )
};

export default TaskList;