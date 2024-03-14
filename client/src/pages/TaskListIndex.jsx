import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import tasklistService from "../services/tasklist-service";
import { setTaskListIndex } from "../reducers/taskManagerReducer";

const TaskListIndex = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.taskManager.user);
    const taskListIndex = useSelector(state => state.taskManager.taskListIndex);
    // if (!taskListIndex) {
    //     tasklistService.loadTaskList(user.id).then( tasklists => dispatch(setTaskListIndex(tasklists)))
    // }

    function handleSelectTaskList(taskList) {
        navigate(`/task-list/${taskList.id}`);
    }

    return (
        <div className="flex flex-col gap-5">
            <h3 className="tm-title-2 text-start">
                Task List Index
            </h3>

            <Button title="Create A New Task List" onClick={() => navigate('/task-list')} />

            <div>
                * Click on a item to open and edit it.
                <ul>
                    { taskListIndex && taskListIndex.map(taskList => (
                        <li key={taskList.id} className="flex justify-between items-center my-2 ps-2 odd:bg-gray-100 even:bg-gray-50">
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
