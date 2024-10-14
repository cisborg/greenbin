
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecogreen-ouaj.onrender.com//api/v1', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    // timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        // Example: Adding Authorization header with a token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor (for error handling, logging, etc.)
api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response.status === 401) {
            console.log('Unauthorized, logging out...');
            // Perform any logout or redirect actions here
        }
        return Promise.reject(error);
    }
);

export default api;
