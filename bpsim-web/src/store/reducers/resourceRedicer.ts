interface ResIds {
    id: number;
}
const actions = {
    SET_TYPES: 'SET_TYPES',
    SET_RESOURCES: 'SET_RESOURCES',
    SET_CURRENT_TYPE_ID: 'SET_CURRENT_TYPE_ID',
    SET_CURRENT_RESOURCE: 'SET_CURRENT_RESOURCE',
    ADD_RESOURCE: 'ADD_RESOURCE',
    ADD_VISIBLE_RESOURCE: 'ADD_VISIBLE_RESOURCE',
    DELETE_VISIBLE_RESOURCE: 'DELETE_VISIBLE_RESOURCE',
    DELETE_RESOURCE: 'DELETE_RESOURCE',
}

type ResState = {
    types: any[],
    visibleTypeIds: ResIds[],
    resources: any[],
    currentTypeId: number,
    currentResource: any
}

const defaultState: ResState = {
    types: [],
    visibleTypeIds: [],
    resources: [],
    currentTypeId: 0,
    currentResource: null
}

export const resourceReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_TYPES:
            return { ...state, types: action.payload }
        case actions.SET_RESOURCES:
            return { ...state, resources: action.payload }
        case actions.SET_CURRENT_TYPE_ID:
            return { ...state, currentTypeId: action.payload }
        case actions.SET_CURRENT_RESOURCE:
            return { ...state, currentResource: action.payload }
        case actions.ADD_RESOURCE:
            return { ...state, resources: [...state.resources, action.payload] }
        case actions.DELETE_RESOURCE:
            return { ...state, resources: state.resources.filter((id: number) => id !== action.payload) }
        case actions.ADD_VISIBLE_RESOURCE:
            return { ...state, visibleTypeIds: [...state.visibleTypeIds, action.payload] }
        case actions.DELETE_VISIBLE_RESOURCE:
            return { ...state, visibleTypeIds: state.visibleTypeIds.filter((id) => id !== action.payload) }
        default:
            return state;
    }
}

export const setResTypes = (items: any) => ({ type: actions.SET_TYPES, payload: items })
export const setCurrentResTypeId = (id: any) => ({ type: actions.SET_CURRENT_TYPE_ID, payload: id })

export const setResources = (items: any) => ({ type: actions.SET_RESOURCES, payload: items })
export const setCurrentResource = (res: any) => ({ type: actions.SET_CURRENT_RESOURCE, payload: res })

export const addVisibleResId = (id: number) => ({ type: actions.ADD_VISIBLE_RESOURCE, payload: id })
export const deleteVisibleResId = (id: number) => ({ type: actions.DELETE_VISIBLE_RESOURCE, payload: id })


export const addResource = (res: any) => ({ type: actions.ADD_RESOURCE, payload: res })
export const deleteResource = async (id: number) => ({ type: actions.DELETE_RESOURCE, payload: id })