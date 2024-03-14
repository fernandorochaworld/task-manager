import axios from 'axios';

const loadTaskList = (userId) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/full`;
    const request = axios.get(url);
    return request.then(response => response.data);
}


const createTaskList = (userId, tasklist) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist`;
    const request = axios.post(url, tasklist);
    return request.then(response => response.data);
}

const editTaskList = (userId, tasklistId, tasklist) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/${tasklistId}`;
    const request = axios.put(url, tasklist);
    return request.then(response => response.data);
}

const deleteTaskList = (userId, tasklistId) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/${tasklistId}`;
    const request = axios.delete(url);
    return request.then(response => response.data);
}

export default { loadTaskList, createTaskList, editTaskList, deleteTaskList }
