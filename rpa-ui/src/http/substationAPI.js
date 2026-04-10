import { http } from "./httpService";

export const getAllSubstations = async () => {
    return await http.get("/substation");
};

export const getSubstationById = async (id) => {
    return await http.get("/substation/" + id);
};

export const addSubstation = async (substation) => {
    return await http.post("/substation/", substation);
};
