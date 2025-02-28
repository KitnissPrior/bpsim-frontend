import { AxiosResponse, AxiosError } from "axios";
import { Node } from "../types/node";
import { publicApi } from "./api";

export const createNode = async (node: Node): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.post('/node/', node);

        console.log('Node creation status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Node creation error:', error);
        return error as AxiosError;
    }
};

export const getNodes = async (): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get('/nodes/');

        console.log('Get nodes status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Get nodes error:', error);
        return error as AxiosError;
    }
};

export const updateNode = async (node: Node): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.put(`/node/${node.id}/`, node);

        console.log('Node update status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Node update error:', error);
        return error as AxiosError;
    }
};

export const deleteNode = async (nodeId: string): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.delete(`/node/${nodeId}/`);

        console.log('Node delete status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Node delete error:', error);
        return error as AxiosError;
    }
};