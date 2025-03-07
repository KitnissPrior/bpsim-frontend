const actions = {
    SET_CURRENT_MODEL: 'SET_CURRENT_MODEL',
    SET_MODEL_ITEMS: 'SET_MODEL_ITEMS',
}

const defaultState = {
    items: [],
    current: null,
    isLoading: true,
    error: null
}

export const modelReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_CURRENT_MODEL:
            return { ...state, current: action.payload }
        case actions.SET_MODEL_ITEMS:
            return { ...state, items: action.payload }
        default:
            return state;
    }
}

export const setCurrentModel = (current: any) => ({ type: actions.SET_CURRENT_MODEL, payload: current })
export const setModelItems = (items: any) => ({ type: actions.SET_MODEL_ITEMS, payload: items })