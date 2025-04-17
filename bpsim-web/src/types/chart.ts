export type Chart = {
    id?: string,
    model_id: number,
    object_id?: number,
    control_id: number,
    name: string,
    x_legend: string,
    y_legend: string,
}
export type ChartControl = Chart & {
    pos_x?: number,
    pos_y?: number,
    width?: number,
    height?: number
}

export const defaultChart: ChartControl = {
    name: 'Диаграмма 1',
    model_id: 0,
    object_id: undefined,
    control_id: 0,
    x_legend: '',
    y_legend: '',
    pos_x: 0,
    pos_y: 0,
    width: 300,
    height: 300
}

export type ChartState = {
    chartControls: ChartControl[],
    currentChart?: ChartControl | null
    currentChartName: string
    currentChartObjectId?: number
    currentChartObjectName: string,
    currentXLegend: string
    currentYLegend: string
    currentValues: number[]
    currentX: number
    currentY: number
    currentWidth: number
    currentHeight: number
}

export type ChartData = {
    x: number,
    y: number
}