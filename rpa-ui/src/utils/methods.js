import { jwtDecode } from "jwt-decode";

export const isExpired = (jwtToken) => {
    if (!jwtToken) return true;
    try {
        const decoded = jwtDecode(jwtToken);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};
