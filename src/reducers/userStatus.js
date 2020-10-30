import {
    CHANGE_USER_STATUS
} from '../actions/userStatus';


export default function templateSimulation(state = false, action) {
    switch (action.type) {
        case CHANGE_USER_STATUS:
            return !state;
        default:
            return state;
    }
}