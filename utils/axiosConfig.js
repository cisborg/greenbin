import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For token storage in React Native

const api = axios.create({
    baseURL: 'https://ecogreen-ouaj.onrender.com/api/v1', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    // timeout: 10000,
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized, logging out...');
        }
        return Promise.reject(error);
    }
);

export default api;
