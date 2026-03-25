import { createContext, useContext, useEffect, useState } from "react";
import localStorageServive from "../utils/localStorageService";
import userApi from "../http/userAPI";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    const getUserData = async () => {
        try {
            const { data } = await userApi.getCurrentUser();
            setCurrentUser(data);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const logIn = async ({ email, password }) => {
        try {
            const { data } = await userApi.authenticate(email, password);

            localStorageServive.setTokens(data);
            getUserData();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        if (localStorageServive.getAccessToken()) {
            getUserData();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser, getUserData, logIn }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
