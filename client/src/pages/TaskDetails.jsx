import { useState } from "react";
import Button from "../components/Button";


const TaskDetail = ({tasks, status, handleClickUpdateTask, handleSelectTask, handleClickDeleteTask}) => {

    const levelSettings = {
        inProgress: ['text-orange-600', 'bg-orange-50', 'In Progress'],
        todo: ['text-blue-600', 'bg-blue-50', 'Todo'],
        done: ['text-green-600', 'bg-green-50', 'Done'],
    }

    const [textColor, bgColor, title] = levelSettings[status];
    const tasksStatus = tasks.filter(item => item.status === status);
    const [overTask, setOverTask] = useState(null);


    const handleMouseOverTask = (task) => {
        setOverTask(task);
    }
    const handleMouseOutTask = (task) => {
        if (task === overTask) {
            setOverTask(null);
        }
    }

    return (
        <ul className={`${textColor} mb-5`}>
            {tasksStatus.length > 0 && (
                <li className="text-center items-center m-2 font-bold">
                    <div className="w-full text-sm">Tasks {title}</div>
                </li>
            )}
            {tasksStatus.map(task => (
                <li
                    key={task.id}
                    
                    className={`flex justify-between items-center my-1 px-2 ${bgColor}`}
                    onMouseOver={() => handleMouseOverTask(task)}
                    onMouseOut={() => handleMouseOutTask(task)}
                    >

                    <div className="w-full flex items-center">
                        <div className="grow">{task.title}</div>
                        <div className="flex shrink items-center text-xs">
                            {task.priority !== 'low' ? `${task.priority} priority. `: ''}
                            {task.dueDate ? `Due on ${task.dueDate}. `: ''}
                            
                            {
                                ['inProgress', 'todo'].includes(status) && (overTask === task) &&
                                <>
                                    <Button className="w-9 me-2" text="🔖" title="Change Priority" styleType="transparent" onClick={() => handleClickUpdateTask(task, 'priority')}></Button>
                                    <Button className="w-9 me-2" text="❌" title="Remove Task" styleType="transparent" onClick={() => handleClickDeleteTask(task)}></Button>
                                </>
                            }
                            {
                                status ==='todo' &&
                                <Button className="w-9 me-2" text="🚀" title="Start task" styleType="transparent" onClick={() => handleClickUpdateTask(task, 'status', 'inProgress')}></Button>
                            }
                            {
                                status ==='inProgress' &&
                                <Button className="w-9 me-2" text="✔️" title="Finish task" styleType="transparent" onClick={() => handleClickUpdateTask(task, 'status', 'done')}></Button>
                            }
                            <Button className="w-9" text="✏️" title="Edit task" styleType="transparent" onClick={() => handleSelectTask(task)}></Button>
                        </div>
                    </div>

                </li>
            ))}
        </ul>
    )
};

export default TaskDetail;