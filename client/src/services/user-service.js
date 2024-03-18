import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_API_URL}/person`;

const createUser = (newUser) => {
    const request = axios.post(baseUrl, newUser);
    return request.then(response => response.data);
}

export default { createUser }
