import { AxiosResponse, AxiosError } from "axios";
import { publicApi } from "./api";
import { Relation } from "../types/relation";

export const getRelations = async (model_id: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get(`/relations/${model_id}`);

        console.log('Get relations status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Get relations error:', error);
        return error as AxiosError;
    }
}

export const createRelation = async (relation: Relation): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.post('/relation/');

        console.log('Relation creation status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Relation creation error:', error);
        return error as AxiosError;
    }
}

export const deleteRelation = async (relationId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.delete(`/relation/${relationId}/`);

        console.log('Relation delete status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Relation delete error:', error);
        return error as AxiosError;
    }
}