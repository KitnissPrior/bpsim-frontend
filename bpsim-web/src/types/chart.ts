export type Chart = {
    id?: string,
    name: string,
    model_id: number,
    object_id?: number,
    x_legend: string,
    y_legend: string,
    posX: number,
    posY: number
}

export const defaultChart: Chart = {
    name: 'Диаграмма 1',
    model_id: 0,
    object_id: undefined,
    x_legend: '',
    y_legend: '',
    posX: 0,
    posY: 0
}

export type ChartState = {
    charts: Chart[],
    currentChart?: Chart | null
    currentChartName: string
    currentChartObjectId?: number
    currentChartObjectName: string,
    currentXLegend: string
    currentYLegend: string
    currentValues: number[]
}

export type ChartData = {
    x: number,
    y: number
}