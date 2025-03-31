import { NodeResState } from "../../types/node";

const actions = {
    SELECT_RESOURCE: 'SELECT_RESOURCE',
    ADD_READY_RESOURCE: 'ADD_READY_RESOURCE'
}

const defaultState: NodeResState = {
    selectedResource: null,
    selectedResValue: '',
    resources: [],
}

export const nodeResReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SELECT_RESOURCE:
            return { ...state, selectedResource: action.payload }
        case actions.ADD_READY_RESOURCE:
            return { ...state, resources: [...state.resources, action.payload] }
        default:
            return state;
    }
}

export const selectResource = (res: any) => ({ type: actions.SELECT_RESOURCE, payload: res })

export const addReadyResource = (res: any) => ({ type: actions.ADD_READY_RESOURCE, payload: res })