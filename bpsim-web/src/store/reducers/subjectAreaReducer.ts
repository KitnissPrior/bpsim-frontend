import { ProjectStatus } from "../../enums/projectStatus.enum"

export const actions = {
    SET_CURRENT_AREA: 'SET_CURRENT_AREA',
    SET_PROJECT_STATUS: 'SET_PROJECT_STATUS',
    UNSET_SUB_AREA_STATE: 'UNSET_SUB_AREA_STATE',
}

const defaultState = {
    items: [],
    current: null,
    isLoading: true,
    error: null,
    status: ProjectStatus.NONE
}

export const subjectAreaReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_CURRENT_AREA:
            return { ...state, current: action.payload }
        case actions.SET_PROJECT_STATUS:
            return { ...state, status: action.payload }
        default:
            return state;
    }
}

export const setCurrentArea = (current: any) => ({ type: actions.SET_CURRENT_AREA, payload: current })

export const setDefaultArea = () => ({ type: actions.UNSET_SUB_AREA_STATE, payload: defaultState })

export const setProjectOpened = () => ({ type: actions.SET_PROJECT_STATUS, payload: ProjectStatus.OPENED })


export const setProjectSaved = () => ({ type: actions.SET_PROJECT_STATUS, payload: ProjectStatus.SAVED })

export const setProjectUnsaved = () => ({ type: actions.SET_PROJECT_STATUS, payload: ProjectStatus.UNSAVED })