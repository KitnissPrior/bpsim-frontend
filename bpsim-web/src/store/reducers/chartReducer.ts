import { ChartState, defaultChart } from "../../types/chart"


const actions = {
    SET_CURRENT_CHART_NAME: 'SET_CURRENT_CHART_NAME',
    SET_CURRENT_CHART_OBJECT_ID: 'SET_CURRENT_CHART_OBJECT_ID',
    SET_CURRENT_CHART_OBJECT_NAME: 'SET_CURRENT_CHART_OBJECT_NAME',
    SET_CURRENT_CHART_VALUES: 'SET_CURRENT_CHART_VALUES',
    ADD_CHART: 'ADD_CHART',
}

const defaultState: ChartState = {
    charts: [],
    currentChart: defaultChart,
    currentValues: [],
    currentChartObjectId: 0,
    currentChartObjectName: '',
    currentChartName: '',
    currentXLegend: '',
    currentYLegend: '',
}

export const chartReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_CURRENT_CHART_NAME:
            return { ...state, currentChartName: action.payload }
        case actions.SET_CURRENT_CHART_OBJECT_ID:
            return { ...state, currentChartObjectId: action.payload }
        case actions.SET_CURRENT_CHART_OBJECT_NAME:
            return { ...state, currentChartObjectName: action.payload }
        case actions.ADD_CHART:
            return { ...state, charts: [...state.charts, action.payload] }
        case actions.SET_CURRENT_CHART_VALUES:
            return { ...state, currentValues: action.payload }
        default:
            return state;
    }
}

export const setChartObjectId = (id: number) => ({ type: actions.SET_CURRENT_CHART_OBJECT_ID, payload: id })
export const setChartObjectName = (name: string) => ({ type: actions.SET_CURRENT_CHART_OBJECT_NAME, payload: name })

export const setChartName = (name: string) => ({ type: actions.SET_CURRENT_CHART_NAME, payload: name })
export const addChart = (chart: any) => ({ type: actions.ADD_CHART, payload: chart })

export const setChartValues = (values: any) => ({ type: actions.SET_CURRENT_CHART_VALUES, payload: values })
