import { AxiosError } from "axios";
import { publicApi } from "./api";

export const getModelControls = async (modelId: number) => {
    try {
        const response = await publicApi.get(`/modelControls/${modelId}/`);
        return response;
    }
    catch (error: any) {
        console.error('Get controls error:', error);
        return error as AxiosError;
    }
}