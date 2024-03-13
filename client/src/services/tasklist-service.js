import axios from 'axios';

const loadTaskList = (userId) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/full`;
    const request = axios.get(url);
    return request.then(response => response.data);
}


const editTaskList = (userId) => {
    const url = `${import.meta.env.VITE_API_URL}/person/${userId}/tasklist/full`;
    const request = axios.get(url);
    return request.then(response => response.data);
}

export default { loadTaskList }
