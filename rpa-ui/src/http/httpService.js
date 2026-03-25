import axios from "axios";
import { TOKEN } from "../utils/constants";
import localStorageService from "../utils/localStorageService";
import { getExpirationFromJwtToken } from "../utils/methods";
import userApi from "./userAPI";

export const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const httpRefreshToken = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const httpInterceptor = async (config) => {
    if (
        config.headers &&
        localStorageService.getRefreshToken() &&
        getExpirationFromJwtToken(localStorageService.getRefreshToken()) <=
            Date.now()
    ) {
        localStorageService.logOut();
        return config;
    }

    if (
        config.headers &&
        localStorageService.getAccessToken() &&
        getExpirationFromJwtToken(localStorageService.getAccessToken()) <=
            Date.now()
    ) {
        try {
            const { data } = await userApi.refreshToken();
            localStorageService.setTokens(data);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    if (
        config.headers &&
        localStorageService.getAccessToken() &&
        getExpirationFromJwtToken(localStorageService.getAccessToken()) >
            Date.now()
    ) {
        config.headers.authorization = `${TOKEN}${localStorageService.getAccessToken()}`;
    }

    return config;
};

const httpRefreshTokenInterceptor = async (config) => {
    config.headers.authorization = `${TOKEN}${localStorageService.getRefreshToken()}`;
    return config;
};

http.interceptors.request.use(httpInterceptor);

httpRefreshToken.interceptors.request.use(httpRefreshTokenInterceptor);

//выполнить отлавливание неавторизированного запроса
//log errors

http.interceptors.response.use(
    (res) => res,
    function (err) {
        const expectedErrors =
            err.response &&
            err.response.status >= 400 &&
            err.response.status < 500;

        if (!expectedErrors) {
            console.log("Unexpected error");
        }

        console.log("Error");
        console.log(err);

        return Promise.reject(err);
    },
);
