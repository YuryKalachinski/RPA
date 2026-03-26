import { http } from "./httpService";

export const getAllSubstations = async () => {
    return await http.get("/substation");
};

export const getSubstationById = async (id) => {
    return await http.get("/substation/" + id);
};

export const getSubstationBySubstationIdAndBayId = async (sub_id, bay_id) => {
    return await http.get(`/substation/${sub_id}/bay/${bay_id}`);
};

export const addNewSubstation = async (substation) => {
    return await http.post("/substation/", substation);
};

export const getAllBranches = async () => {
    return await http.get("/substation/branch");
};
