const actions = {
    'SET_SIMULATION_VALUES': 'SET_SIMULATION_VALUES',
}

const defaultState= {
    values:[]
}

export const simulationReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actions.SET_SIMULATION_VALUES:
            return { ...state, values: action.payload }
        default:
            return state;
    }
}

export const setSimulationValues = (values: any) => ({ type: actions.SET_SIMULATION_VALUES, payload: values })