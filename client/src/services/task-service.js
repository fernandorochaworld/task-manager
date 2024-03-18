import axios from 'axios';

// const loadTask = (userId) => {
//     const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/${tasklistId}/task/full`;
//     const request = axios.get(url);
//     return request.then(response => response.data);
// }


const createTask = (userId, tasklistId, task) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/${tasklistId}/task`;
    const request = axios.post(url, task);
    return request.then(response => response.data);
}

const editTask = (userId, tasklistId, taskId, task) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/${tasklistId}/task/${taskId}`;
    const request = axios.put(url, task);
    return request.then(response => response.data);
}

const deleteTask = (userId, tasklistId, taskId) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/${tasklistId}/task/${taskId}`;
    const request = axios.delete(url);
    return request.then(response => response.data);
}

export default { createTask, editTask, deleteTask }
