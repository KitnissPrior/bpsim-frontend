import { AxiosResponse, AxiosError } from "axios";
import { Node } from "../types/node";
import { publicApi } from "./api";

export const createLesson = async (node: Node): Promise<AxiosResponse | AxiosError> => {
    try {
        const response = await publicApi.post('/node/', node);

        console.log('Lesson creation status:', response);

        return response;
    }
    catch (error: any) {
        console.error('Lesson creation error:', error);
        return error as AxiosError;
    }
};