const actions = {
    SET_BPSIM_ITEMS: 'SET_BPSIM_ITEMS',
    SET_GRAPHIC_ITEMS: 'SET_GRAPHIC_ITEMS',
}

const defaultState = {
    bpsimItems: [],
    graphicItems: [],
    current: null,
    isLoading: true,
    error: null
}

export const nodeReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_BPSIM_ITEMS:
            return { ...state, bpsimItems: action.payload }
        case actions.SET_GRAPHIC_ITEMS:
            return { ...state, graphicItems: action.payload }
        default:
            return state;
    }
}

export const setGraphicItems = (items: any) => ({ type: actions.SET_BPSIM_ITEMS, payload: items })

export const setBpsimItems = (items: any) => ({ type: actions.SET_GRAPHIC_ITEMS, payload: items })