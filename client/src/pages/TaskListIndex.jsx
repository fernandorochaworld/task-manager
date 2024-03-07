import { redirect, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const TaskListIndex = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-5">
            <h1 className="tm-title">
                Task List Index
            </h1>

            <Button title="Create A New Task List" onClick={() => navigate('/task-list')} />

            <div>
                * Click on a item to open and edit it.

                <ul>
                    <li>Priorities for the day</li>
                    <li>Sprint 1</li>
                    <li>Sprint 2</li>
                    <li>Sprint 3</li>
                    <li>Sprint 4</li>
                    <li>Sprint 5</li>
                </ul>
            </div>
        </div>
    )
};

export default TaskListIndex;