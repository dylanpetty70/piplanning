import { combineReducers } from 'redux';

import activeSimulation from './activeSimulation';
import templateSimulation from './templateSimulation';
import userStatus from './userStatus';

export default combineReducers({
    activeSimulation,
    templateSimulation,
    userStatus
})