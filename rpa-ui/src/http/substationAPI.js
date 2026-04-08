import { http } from "./httpService";

export const getAllSubstations = async () => {
    return await http.get("/substation");
};

export const getSubstationById = async (id) => {
    return await http.get("/substation/" + id);
};

export const getBayById = async (id) => {
    return await http.get("/bay/" + id);
};

export const addBay = async (sub_id, bay) => {
    return await http.post(`/substation/${sub_id}/bay/`, bay);
};

export const addSubstation = async (substation) => {
    return await http.post("/substation/", substation);
};

export const updateSubstation = async (substation) => {
    return await http.put(`/substation/${substation.id}`, substation);
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
