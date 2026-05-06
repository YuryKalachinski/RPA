import { http } from "./httpService";

export const getAllVoltageLevels = async () => {
    return await http.get("/utility/voltage_level");
};

export const getAllBranches = async () => {
    return await http.get("/utility/branch");
};

export const getProtDictionary = async () => {
    return await http.get("/dictionary/protection");
};

export const getParamDictionary = async () => {
    return await http.get("/dictionary/parameter");
};
