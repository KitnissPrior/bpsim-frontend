import { AxiosError } from "axios";
import { publicApi } from "./api";


export const getMeasures = async () => {
    try {
        const response = await publicApi.get('/measures/');
        return response;
    }
    catch (error: any) {
        console.error('Get measures error:', error);
        return error as AxiosError;
    }
}