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

export const getAllBranches = async () => {
    return await http.get("/substation/branch");
};

export const getComplexById = async (id) => {
    return await http.get("/complex/" + id);
};

export const addComplex = async (bay_id, complex) => {
    return await http.post(`/bay/${bay_id}/complex/`, complex);
};
