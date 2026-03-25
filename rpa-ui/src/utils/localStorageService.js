import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
}

function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
}

function setTokens(data) {
    localStorage.setItem(ACCESS_TOKEN, data.access_token);
    localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
}

function logOut() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

const localStorageServive = {
    setTokens,
    logOut,
    getAccessToken,
    getRefreshToken,
};

export default localStorageServive;
