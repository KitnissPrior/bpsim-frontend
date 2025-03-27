const actions = {
    SET_TYPES: 'SET_TYPES',
    SET_RESOURCES: 'SET_RESOURCES',
    SET_CURRENT_TYPE_ID: 'SET_CURRENT_TYPE_ID',
    SET_CURRENT_RESOURCE: 'SET_CURRENT_RESOURCE',
    DELETE_RESOURCE: 'DELETE_RESOURCE',
}

const defaultState = {
    types:[],
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
        case actions.DELETE_RESOURCE:
            return { ...state, resources: state.resources.filter((item: any) => item.id !== action.payload) }
        default:
            return state;
    }
}

export const setResTypes = (items: any) => ({ type: actions.SET_TYPES, payload: items })
export const setCurrentResTypeId = (id: any) => ({ type: actions.SET_CURRENT_TYPE_ID, payload: id })

export const setResources = (items: any) => ({ type: actions.SET_RESOURCES, payload: items })
export const setCurrentResource = (resource: any) => ({ type: actions.SET_CURRENT_RESOURCE, payload: resource })

export const deleteResource = async (id: number) => ({type: actions.DELETE_RESOURCE, payload: id})