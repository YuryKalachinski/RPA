import { http } from "./httpService";

export const getAllTemplates = async () => {
    return await http.get("/complex_template/");
};

export const addTemplate = async (template) => {
    return await http.post("/complex_template/", template);
};
