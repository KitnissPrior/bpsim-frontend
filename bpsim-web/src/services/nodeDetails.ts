import { AxiosResponse, AxiosError } from "axios";
import { publicApi } from "./api";
import { NodeDetails } from "../types/node";

export const getNodeDetails = async (nodeId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get(`/nodeDetails/${nodeId}/`);
        return response;
    }
    catch (error: any) {
        console.error('Get node details error:', error);
        return error as AxiosError;
    }
}

export const updateNodeDetails = async (nodeDetails: NodeDetails, id: number) => {
    try {
        nodeDetails.cost = Number(nodeDetails.cost)
        const response = await publicApi.put(`/nodeDetails/${id}/`, nodeDetails);
        return response;
    }
    catch (error: any) {
        console.error('Update node details error:', error);
        return error as AxiosError;
    }
}

export const getNodeResources = async (nodeId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get(`/nodeResources/${nodeId}/`);
        return response;
    }
    catch (error: any) {
        console.error('Get node res error:', error);
        return error as AxiosError;
    }
}

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

export const deleteNodeRes = async (resId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.delete(`/nodeRes/${resId}/`);
        return response;
    }
    catch (error: any) {
        console.error('Delete node res error:', error);
        return error as AxiosError;
    }
}