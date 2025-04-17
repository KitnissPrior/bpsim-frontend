import { AxiosError } from "axios";
import { publicApi } from "./api";
import { ChartControl } from "../types/chart";

export const addChart = async (chart: ChartControl) => {
    try {
        const response = await publicApi.post('/chart/', chart);
        return response;
    }
    catch (error: any) {
        console.error('Chart creation error:', error);
        return error as AxiosError;
    }

}

export const updateChart = async (chart: ChartControl) => {
    try {
        const response = await publicApi.put(`/chart/${chart.id}/`, chart);
        return response;
    }
    catch (error: any) {
        console.error('Chart update error:', error);
        return error as AxiosError;
    }

}

export const deleteChart = async (id: number) => {
    try {
        const response = await publicApi.delete(`/chart/${id}/`);
        return response;
    }
    catch (error: any) {
        console.error('Chart deletion error:', error);
        return error as AxiosError;
    }

}