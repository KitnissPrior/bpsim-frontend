const actions = {
    SET_MEASURES: 'SET_MEASURES',
    SET_CURRENT_ID: 'SET_CURRENT_ID',
}

const defaultState = {
    items: [],
    currentId: null,
}

export const measureReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_MEASURES:
            return { ...state, items: action.payload }
        case actions.SET_CURRENT_ID:
            return { ...state, currentId: action.payload }
        default:
            return state;
    }
}

export const setMeasures = (items: any) => ({ type: actions.SET_MEASURES, payload: items })

export const setCurrentMeasureId = (id: any) => ({ type: actions.SET_CURRENT_ID, payload: id })