import { $authHost } from './index';

export const getAllSubstations = async () => {
    return await $authHost.get('/substation');
};

export const getSubstationById = async (id) => {
    return await $authHost.get('/substation/' + id);
};

export const getSubstationBySubstationIdAndBayId = async (sub_id, bay_id) => {
    return await $authHost.get(`/substation/${sub_id}/bay/${bay_id}`);
};
