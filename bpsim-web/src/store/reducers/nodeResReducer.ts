import { NodeResState } from "../../types/node";
import { NodeResType } from "../../types/resource";

const actions = {
    SELECT_RESOURCE: 'SELECT_RESOURCE',
    SET_VALUE: 'SET_VALUE',
    ADD_READY_RESOURCE: 'ADD_READY_RESOURCE',
    SET_NODE_ID: 'SET_NODE_ID',
    SET_IN_OUT: 'SET_IN_OUT'
}

const defaultState: NodeResState = {
    selectedResource: null,
    selectedResValue: '',
    resources: [],
    res_in_out: NodeResType.IN,
    node_id: 0
}

export const nodeResReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SELECT_RESOURCE:
            return { ...state, selectedResource: action.payload }
        case actions.SET_VALUE:
            return { ...state, selectedResValue: action.payload }
        case actions.SET_IN_OUT:
            return { ...state, res_in_out: action.payload }
        case actions.SET_NODE_ID:
            return { ...state, node_id: action.payload }
        case actions.ADD_READY_RESOURCE:
            return { ...state, resources: [...state.resources, action.payload] }
        default:
            return state;
    }
}

export const selectResource = (res: any) => ({ type: actions.SELECT_RESOURCE, payload: res })

export const setValue = (value: string) => ({ type: actions.SET_VALUE, payload: value })

export const setResInOut = (value: number) => ({ type: actions.SET_IN_OUT, payload: value })

export const setNodeId = (value: number) => ({ type: actions.SET_NODE_ID, payload: value })

export const addReadyResource = (res: any) => ({ type: actions.ADD_READY_RESOURCE, payload: res })