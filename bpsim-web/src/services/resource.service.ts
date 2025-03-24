import { AxiosError } from "axios";
import { publicApi } from "./api";
import { Resource } from "../types/resource";

export const createResource = async (resource: Resource) => {
    try {
        const response = await publicApi.post('/resource/', resource);
        return response;
    }
    catch (error: any) {
        console.error('Resource creation error:', error);
        return error as AxiosError;
    }
}

export const getResources = async (subAreaId: number) => {
    try {
        const response = await publicApi.get(`/resources/${subAreaId}/`);
        return response;
    }
    catch (error: any) {
        console.error('Get resources error:', error);
        return error as AxiosError;
    }
}