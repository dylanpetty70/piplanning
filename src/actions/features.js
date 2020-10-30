import { databaseRef } from '../firebaseAPI';

export const handleNewTemplateFeature = (sim, name) => async dispatch => {
    let newFeatureKey = databaseRef.child("templateSimluations/" + sim + "/features").push().key;
    let data = { name: name, key: newFeatureKey };

    let featurePath = "templateSimulations/" + sim + "/features/" + String(newFeatureKey);
    
    await databaseRef.update({ [featurePath]: data });
}

export const handleDeleteTemplateFeature = (sim, feat) => async dispatch => {
    await databaseRef.child("templateSimulations/" + sim + "/features/" + feat).remove();
}

export const handleUpdateTemplateFeature = (sim, feat, data) => async dispatch => {
    await databaseRef.child("templateSimulations/" + sim + "/features").update({ [feat]: data });
}

export const handleNewTemplateStory = (sim, feat, name) => async dispatch => {
    let newStoryKey = databaseRef.child("templateSimluations/" + sim + "/features/" + feat + "/stories").push().key;
    let data = { name: name, key: newStoryKey };

    let storyPath = "templateSimulations/" + sim + "/features/" + feat + "/stories/" + String(newStoryKey);

    await databaseRef.update({ [storyPath]: data });
}

export const handleDeleteTemplateStory = (sim, feat, story) => async dispatch => {
    await databaseRef.child("templateSimulations/" + sim + "/features/" + feat + "/stories/" + story).remove();
}

export const handleUpdateTemplateStory = (sim, feat, story, data) => async dispatch => {
    await databaseRef.child("templateSimulations/" + sim + "/features/" + feat + "/stories").update({ [story]: data });
}

export const handleUpdateActiveStory = (sim, feat, story, data) => async dispatch => {
    await databaseRef.child("activeSimulations/" + sim + "/features/" + feat + "/stories").update({ [story]: data });
}