import { redirect, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const TaskList = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap gap-5">
            <h1 className="tm-title">
                Task List
            </h1>
            <Input type="text" name="name" title="List Name"  />
            <Button title="Add New Task" className="flex-1" onClick={() => navigate('/task')} />
            <Button title="Save" className="flex-1" onClick={() => navigate('/')} />
        </div>
    )
};

export default TaskList;