import axios from 'axios';
import { ACCESS_TOKEN, TOKEN } from '../utils/constants';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
    if (config.headers) {
        config.headers.authorization = `${TOKEN}${localStorage.getItem(
            ACCESS_TOKEN
        )}`;
    }
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
