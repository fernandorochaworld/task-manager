import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_API_URL}/login`;

const loginUser = (user) => {
    const request = axios.post(baseUrl, user);
    return request.then(response => response.data);
}

export default { loginUser }
