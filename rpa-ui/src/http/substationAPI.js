import { $authHost } from './index';

export const getAllSubstations = async () => {
    return await $authHost.get('/substation');
};

export const getSubstationById = async (id) => {
    return await $authHost.get('/substation/' + id);
};
