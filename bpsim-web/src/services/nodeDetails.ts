import { AxiosResponse, AxiosError } from "axios";
import { publicApi } from "./api";
import { NodeDetails } from "../types/nodeDetails";

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
        const response = await publicApi.put(`/nodeDetails/${id}/`, nodeDetails);
        return response;
    }
    catch (error: any) {
        console.error('Update node details error:', error);
        return error as AxiosError;
    }
}