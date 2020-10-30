import {databaseRef} from '../firebaseAPI';


export const handleNewTeam = (sim, name) => async dispatch => {
    let newTeamKey = databaseRef.child("activeSimulations/" + sim + "/teams").push().key;

    let teamPath = "activeSimulations/" + sim + "/teams/" + String(newTeamKey);
    
    await databaseRef.update({ [teamPath]: { name: name } });
}

export const handleDeleteTeam = (sim, team) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team).remove();
}

export const handleAddTeamFeature = (sim, team, feature, name) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/features").update({ [feature]: name });
}

export const handleDeleteTeamFeature = (sim, team, feat) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/features/" + feat).remove();
}

export const handleAddTeamIteration = (sim, team, name) => async dispatch => {
    let newIterationKey = databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/iterations").push().key;

    let iterationPath = "activeSimulations/" + sim + "/teams/" + team + "/iterations/" + String(newIterationKey);

    await databaseRef.update({ [iterationPath]: { name: name } });
}

export const handleUpdateTeamIteration = (sim, team, iteration, data) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/iterations/" + iteration).update(data);
}

export const handleDeleteTeamIteration = (sim, team, iteration) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/iterations/" + iteration).remove();
}

export const handleAddTeamRisk = (sim, team, name) => async dispatch => {
    let newRiskKey = databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/risks").push().key;

    let riskPath = "activeSimulations/" + sim + "/teams/" + team  + "/risks/" + String(newRiskKey);

    await databaseRef.update({ [riskPath]: { name: name } });
}

export const handleUpdateTeamRisk = (sim, team, risk, data) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/risks/" + risk).update(data);
}

export const handleDeleteTeamRisk = (sim, team, risk) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/risks/" + risk).remove();
}

export const handleAddTeamIterationStory = (sim, team, iteration, key, featKey) => async dispatch => {
    let newStoryKey = databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/iterations/" + iteration + "/story").push().key;

    let storyPath = "activeSimulations/" + sim + "/teams/" + team + "/iterations/" + iteration + "/story/" + String(newStoryKey);

    await databaseRef.update({ [storyPath]: { key: key, featKey: featKey } });
}

export const handleUpdateActiveStory = (sim, feat, story, data) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/features/" + feat + "/stories").update({ [story]: data });
}

export const handleDeleteTeamIterationStory = (sim, team, iteration, story) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/iterations/" + iteration + "/story/" + story).remove();
}

export const handleAddTeamUser = (sim, team, name) => async dispatch => {
    let newUserKey = databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/users").push().key;

    let userPath = "activeSimulations/" + sim + "/teams/" + team + "/users/" + String(newUserKey);

    await databaseRef.update({ [userPath]: { name: name } });
}

export const handleUpdateTeamUser = (sim, team, user, data) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/users/" + user + "/iterations").update(data);
}

export const handleDeleteTeamUser = (sim, team, user) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/users/" + user).remove();
}

export const handleAddTeamPIObjective = (sim, team, name) => async dispatch => {
    let newPiKey = databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/piObjectives").push().key;

    let piPath = "activeSimulations/" + sim + "/teams/" + team + "/piObjectives/" + String(newPiKey);

    await databaseRef.update({ [piPath]: { name: name } });
}

export const handleUpdateTeamPIObjective = (sim, team, objective, data) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/piObjectives/" + objective).update(data);
}

export const handleDeleteTeamPIObjective = (sim, team, objective) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/teams/" + team + "/piObjectives/" + objective).remove();
}