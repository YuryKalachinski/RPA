import { jwtDecode } from "jwt-decode";

export const getExpirationFromJwtToken = (jwtToken) => {
    return jwtDecode(jwtToken).exp * 1000;
};
