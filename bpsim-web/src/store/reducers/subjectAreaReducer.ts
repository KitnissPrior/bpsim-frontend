export const actions = {
    SET_CURRENT_AREA: 'SET_CURRENT_AREA',
    GET_SUBJECT_AREAS: 'GET_SUBJECT_AREAS',
    GET_SUBJECT_AREA: 'GET_SUBJECT_AREA',
    CREATE_SUBJECT_AREA: 'CREATE_SUBJECT_AREA',
    UPDATE_SUBJECT_AREA: 'UPDATE_SUBJECT_AREA',
    DELETE_SUBJECT_AREA: 'DELETE_SUBJECT_AREA',
}

const defaultState = {
    items: [],
    current: null,
    isLoading: true,
    error: null
}

export const subjectAreaReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_CURRENT_AREA:
            return { ...state, current: action.payload }
        case actions.GET_SUBJECT_AREAS:
            return { ...state, items: action.payload }
        default:
            return state;
    }
}

export const setCurrentArea = (current: any) => ({ type: actions.SET_CURRENT_AREA, payload: current })

export const setDefaultArea = () => ({ type: actions.SET_CURRENT_AREA, payload: null })