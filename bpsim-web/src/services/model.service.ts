import { AxiosResponse, AxiosError } from "axios";
import { publicApi } from "./api";

export const getModels = async (): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get('/models/')

        //console.log('Get models status:', response)

        return response;
    }
    catch (error: any) {
        console.error('Get models error:', error);
        return error as AxiosError;
    }
};