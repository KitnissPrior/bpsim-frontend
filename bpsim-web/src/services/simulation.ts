import { AxiosResponse, AxiosError } from "axios";
import { publicApi } from "./api";

export const startSimulation = async (sub_area_id: number, model_id: number)
    : Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get(`/start/${sub_area_id}/${model_id}/`);
        return response;
    }
    catch (error: any) {
        return error as AxiosError;
    }
}