import axios from 'axios';
const baseUrl = '/api/pessoa';

const createUser = (newUser) => {
    const request = axios.post(baseUrl, newUser);
    return request.then(response => response.data);
}

export default { createUser }
