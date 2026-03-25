import { http, httpRefreshToken } from "./httpService";

export const authenticate = async (email, password) => {
    return http.post("/authentication/authenticate", {
        email,
        password,
    });
};

export const refreshToken = async () => {
    return httpRefreshToken.post("/authentication/refresh-token");
};

export const getCurrentUser = async () => {
    return http.get("/user/authenticated");
};

const userApi = {
    authenticate,
    refreshToken,
    getCurrentUser,
};

export default userApi;
