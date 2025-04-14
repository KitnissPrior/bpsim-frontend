import { NodeRes, NodeResState } from "../../types/node";
import { NodeResType } from "../../types/resource";
import { TableNodeRes } from "../../types/table";

const actions = {
    SELECT_RESOURCE: 'SELECT_RESOURCE',
    SET_VALUE: 'SET_VALUE',
    ADD_NEW_NODE_RESOURCE: 'ADD_NEW_NODE_RESOURCE',
    SET_NODE_ID: 'SET_NODE_ID',
    SET_IN_OUT: 'SET_IN_OUT',
    SET_NODE_RESOURCES: 'SET_NODE_RESOURCES',
    SET_RESOURCES_IN: 'SET_RESOURCES_IN',
    SET_RESOURCES_OUT: 'SET_RESOURCES_OUT',
    ADD_RES_IN: 'ADD_RES_IN',
    ADD_RES_OUT: 'ADD_RES_OUT',
    CLEAR_NEW_RESOURCES: 'CLEAR_NEW_RESOURCES'
}

const defaultState: NodeResState = {
    selectedResource: null,
    selectedResValue: '',
    nodeResources: [],
    newResources: [],
    resInOut: NodeResType.IN,
    tableResourcesIn: [],
    tableResourcesOut: [],
    nodeId: 0
}

export const nodeResReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SELECT_RESOURCE:
            return { ...state, selectedResource: action.payload }
        case actions.SET_VALUE:
            return { ...state, selectedResValue: action.payload }
        case actions.SET_IN_OUT:
            return { ...state, resInOut: action.payload }
        case actions.SET_NODE_ID:
            return { ...state, nodeId: action.payload }
        case actions.ADD_NEW_NODE_RESOURCE:
            return { ...state, newResources: [...state.newResources, action.payload] }
        case actions.SET_NODE_RESOURCES:
            return { ...state, nodeResources: action.payload }
        case actions.SET_RESOURCES_IN:
            return { ...state, tableResourcesIn: action.payload }
        case actions.SET_RESOURCES_OUT:
            return { ...state, tableResourcesOut: action.payload }
        case actions.ADD_RES_IN:
            return { ...state, tableResourcesIn: [...state.tableResourcesIn, action.payload] }
        case actions.ADD_RES_OUT:
            return { ...state, tableResourcesOut: [...state.tableResourcesOut, action.payload] }
        case actions.CLEAR_NEW_RESOURCES:
            return { ...state, newResources: [] }
        default:
            return state;
    }
}

export const selectResource = (res: any) => ({ type: actions.SELECT_RESOURCE, payload: res })
export const setValue = (value: string) => ({ type: actions.SET_VALUE, payload: value })
export const setResInOut = (value: number) => ({ type: actions.SET_IN_OUT, payload: value })
export const setNodeId = (value: number) => ({ type: actions.SET_NODE_ID, payload: value })

export const addReadyResource = (res: any) => ({ type: actions.ADD_NEW_NODE_RESOURCE, payload: res })
export const setNodeResources = (items: NodeRes) => ({ type: actions.SET_NODE_RESOURCES, payload: items })
export const clearNewResources = () => ({ type: actions.CLEAR_NEW_RESOURCES })

export const setTableResourcesIn = (items: any) => ({ type: actions.SET_RESOURCES_IN, payload: items })
export const setTableResourcesOut = (items: any) => ({ type: actions.SET_RESOURCES_OUT, payload: items })

export const addResIn = (res: TableNodeRes) => ({ type: actions.ADD_RES_IN, payload: res })
export const addResOut = (res: TableNodeRes) => ({ type: actions.ADD_RES_OUT, payload: res })