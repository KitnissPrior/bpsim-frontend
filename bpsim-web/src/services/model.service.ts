import { AxiosResponse, AxiosError } from "axios";
import { publicApi } from "./api";
import { Model } from "../types/model";

export const getModels = async (subjectAreaId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get(`/models/${subjectAreaId}/`);

        //console.log('Get models status:', response)

        return response;
    }
    catch (error: any) {
        console.error('Get models error:', error);
        return error as AxiosError;
    }
};

export const createModel = async (model: Model, subjectAreaId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        model.sub_area_id = subjectAreaId;
        const response = await publicApi.post('/model/', model);
        console.log('Model creation status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Model creation error:', error);
        return error as AxiosError;
    }
};