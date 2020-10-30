import { GRAB_ACTIVE_SIMULATION, GRAB_ACTIVE_SIMULATION_OPTIONS } from '../actions/simulation';

export default function activeSimulation(state = { simulation: {}, options: {}}, action) {
	switch (action.type) {
		case GRAB_ACTIVE_SIMULATION:
			return { ...state, simulation: action.data };
		case GRAB_ACTIVE_SIMULATION_OPTIONS:
			return { ...state, options: action.data }
		default:
			return state
	}
}