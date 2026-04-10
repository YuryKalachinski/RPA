import { http } from "./httpService";

export const getBayById = async (id) => {
    return await http.get("/bay/" + id);
};

export const addBay = async (bay) => {
    return await http.post("bay/", bay);
};
