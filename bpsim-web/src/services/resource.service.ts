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

export const deleteResource = async (id: number) => {
    try {
        const response = await publicApi.delete(`/resource/${id}/`);
        return response;
    }
    catch (error: any) {
        console.error('Resource deletion error:', error);
        return error as AxiosError;
    }
}

export const getResourceTypes = async () => {
    try {
        const response = await publicApi.get('/resourceTypes/');
        return response;
    }
    catch (error: any) {
        console.error('Get resource types error:', error);
        return error as AxiosError;
    }
}