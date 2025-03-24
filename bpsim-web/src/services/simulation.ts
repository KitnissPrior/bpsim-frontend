import { AxiosResponse, AxiosError } from "axios";
import { publicApi } from "./api";

export const startSimulation = async (model_id: number)
    : Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get(`/start/${model_id}/`);
        return response;
    }
    catch (error: any) {
        return error as AxiosError;
    }
}