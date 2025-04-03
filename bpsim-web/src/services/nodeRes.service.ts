import { AxiosResponse, AxiosError } from "axios";
import { publicApi } from "./api";

export const createNodeRes = async (res: any): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.post('/nodeRes/', res);
        return response;
    }
    catch (error: any) {
        console.error('Create node res error:', error);
        return error as AxiosError;
    }
}

export const getNodeResources = async (nodeId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get(`/nodeRessources/${nodeId}`);
        return response;
    }
    catch (error: any) {
        console.error('Get all node res error:', error);
        return error as AxiosError;
    }
}