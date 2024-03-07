import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
// import { setSelectedTaskList } from "../reducers/taskManagerReducer";

const TaskListIndex = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const taskListIndex = useSelector(state => state.taskManager.taskListIndex);
    function handleSelectTaskList(taskList) {
        console.log(taskList);
        // dispatch(setSelectedTaskList(taskList));
        navigate(`/task-list/${taskList.id}`);
    }
    return (
        <div className="flex flex-col gap-5">
            <h1 className="tm-title text-start">
                Task List Index
            </h1>

            <Button title="Create A New Task List" onClick={() => navigate('/task-list')} />

            <div>
                * Click on a item to open and edit it.

                <ul>
                    {taskListIndex.map(taskList => (
                        <li key={taskList.id} className="flex justify-between items-center m-2 odd:bg-gray-100 even:bg-gray-50">
                            {taskList.name}
                            <Button className="w-28" title="Select ✔️" onClick={() => handleSelectTaskList(taskList)}></Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default TaskListIndex;

// ➕ ✖️ ✔️ ❌ 🖋️ ✏️ 🚀 ✅ 🔖 🏷️ 💾 
