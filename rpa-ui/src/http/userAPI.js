import { $authHost, $host } from './index';

export const authenticate = async (email, password) => {
    return $host.post('/authentication/authenticate', {
        email,
        password,
    });
};

export const refreshToken = async () => {
    return $authHost.post('/authentication/refresh-token');
};
