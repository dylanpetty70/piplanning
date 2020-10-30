import { databaseRef } from '../firebaseAPI';
export const GRAB_TEMPLATE_SIMULATION = 'GRAB_TEMPLATE_SIMULATION';
export const GRAB_TEMPLATE_SIMULATION_OPTIONS = 'GRAB_TEMPLATE_SIMULATION_OPTIONS';
export const GRAB_ACTIVE_SIMULATION = 'GRAB_ACTIVE_SIMULATION';
export const GRAB_ACTIVE_SIMULATION_OPTIONS = 'GRAB_ACTIVE_SIMULATION_OPTIONS';

export const handleGrabTemplateSimulation = (sim) => async dispatch => {
    await databaseRef.child("templateSimulations/" + sim).on("value", (snapshot) => {
        if (snapshot.val() !== null) {
            dispatch({
                type: GRAB_TEMPLATE_SIMULATION,
                data: snapshot.val()
            })
        } else {
            dispatch({
                type: GRAB_TEMPLATE_SIMULATION,
                data: {}
            })
        }
    })
}

export const handleGrabTemplateSimulationOptions = () => async dispatch => {
    await databaseRef.child("templateSimulations/options").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
            dispatch({
                type: GRAB_TEMPLATE_SIMULATION_OPTIONS,
                data: snapshot.val()
            })
        } else {
            dispatch({
                type: GRAB_TEMPLATE_SIMULATION_OPTIONS,
                data: {}
            })
        }
    })
}

export const handleNewTemplateSimulation = (name) => async dispatch => {
    let newSimulationKey = databaseRef.child("templateSimulations").push().key;
    let data = { name: name, key: newSimulationKey };

    let simulationPath = "templateSimulations/" + String(newSimulationKey);
    let optionPath = "templateSimulations/options/" + String(newSimulationKey);

    await databaseRef.update({ [optionPath]: name });
    await databaseRef.update({ [simulationPath]: data });
}

export const handleNewActiveSimulation = (name, sim) => async dispatch => {
    await databaseRef.child("templateSimulations/" + sim).once('value').then(async function (snapshot) {
        let data = snapshot.val();
        data.activeName = name;
        let newSimulationKey = databaseRef.child("activeSimulations").push().key;
        data.key = newSimulationKey;

        let simulationPath = "activeSimulations/" + String(newSimulationKey);
        let optionPath = "activeSimulations/options/" + String(newSimulationKey);

        await databaseRef.update({ [optionPath]: name });
        await databaseRef.update({ [simulationPath]: data });
    })
}

export const handleGrabActiveSimulation = (sim) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim).on("value", (snapshot) => {
        if (snapshot.val() !== null) {
            dispatch({
                type: GRAB_ACTIVE_SIMULATION,
                data: snapshot.val()
            })
        } else {
            dispatch({
                type: GRAB_ACTIVE_SIMULATION,
                data: {}
            })
        }
    })
}

export const handleGrabActiveSimulationOptions = () => async dispatch => {
    await databaseRef.child("activeSimulations/options").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
            dispatch({
                type: GRAB_ACTIVE_SIMULATION_OPTIONS,
                data: snapshot.val()
            })
        } else {
            dispatch({
                type: GRAB_ACTIVE_SIMULATION_OPTIONS,
                data: {}
            })
        }
    })
}

export const handleDeleteTemplateSimulation = (sim) => async dispatch => {
    await databaseRef.child("templateSimulations/" + sim).remove();
    await databaseRef.child("templateSimulations/options/" + sim).remove();
}

export const handleDeleteActiveSimulation = (sim) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim).remove();
    await databaseRef.child("activeSimulations/options/" + sim).remove();
}