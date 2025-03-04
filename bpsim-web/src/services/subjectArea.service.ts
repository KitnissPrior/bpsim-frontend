import { AxiosResponse, AxiosError } from "axios";
import { SubjectArea } from "../types/subjectArea";
import { publicApi } from "./api";

export const createSubjectArea = async (subArea: SubjectArea): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.post('/subjectArea/', subArea);

        console.log('Subject Area creation status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Subject Area creation error:', error);
        return error as AxiosError;
    }
};

export const getSubjectAreas = async (): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get('/subjectAreas/'); 

        console.log('Get subject areas status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Get subject areas error:', error);
        return error as AxiosError;
    }
};

export const getSubjectArea = async (subAreaId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.get(`/subjectArea/${subAreaId}/`);

        console.log('Get subject area status:', response);

        return response;        
    }
    catch (error: any) {
        console.error('Get subject area error:', error);
        return error as AxiosError;
    }
}

export const deleteSubjectArea = async (subAreaId: number): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.delete(`/subjectArea/${subAreaId}/`);

        console.log('Subject Area delete status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Subject Area delete error:', error);
        return error as AxiosError;
    }
};
