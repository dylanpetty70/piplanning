import {
    GRAB_TEMPLATE_SIMULATION,
    GRAB_TEMPLATE_SIMULATION_OPTIONS
} from '../actions/simulation';


export default function templateSimulation(state = { simulation: {}, options: {}}, action) {
    switch (action.type) {
        case GRAB_TEMPLATE_SIMULATION:
            return { ...state, simulation: action.data };
        case GRAB_TEMPLATE_SIMULATION_OPTIONS:
            return { ...state, options: action.data };
        default:
            return state;
    }
}