import { NodeDetails } from "../../types/node";

const actions = {
    SET_DATA: 'SET_DATA',
    SET_NAME: 'SET_NAME',
    SET_COST: 'SET_COST',
    SET_DURATION: 'SET_DURATION',
}

const defaultState = {
    id: 0,
    node_id: 0,
    node_name: "",
    duration: "",
    cost: 0,
}

export const nodeDetailsReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_DATA:
            return {
                ...state,
                id: action.payload.id,
                node_id: action.payload.node_id,
                duration: action.payload.duration,
                cost: action.payload.cost,
            }
        case actions.SET_NAME:
            return { ...state, node_name: action.payload }
        case actions.SET_COST:
            return { ...state, cost: action.payload }
        case actions.SET_DURATION:
            return { ...state, duration: action.payload }
        default:
            return state;
    }
}

export const setNodeCost = (cost: number) => ({ type: actions.SET_COST, payload: cost })

export const setNodeDuration = (duration: string) => ({ type: actions.SET_DURATION, payload: duration })

export const setNodeDetails = (data: NodeDetails) => ({ type: actions.SET_DATA, payload: data })
export const setNodeName = (name: string) => ({ type: actions.SET_NAME, payload: name })