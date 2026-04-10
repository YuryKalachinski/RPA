import { http } from "./httpService";

export const addComplex = async (complex) => {
    return await http.post("/complex/", complex);
};
