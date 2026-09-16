import { http } from "./httpService";

export const getAllTemplates = async () => {
    return await http.get("/complex_template/");
};
