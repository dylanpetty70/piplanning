var firebase = require("firebase/app");
require('firebase/database');


var firebaseConfig = {
    apiKey: "AIzaSyCwkiV8djSHACOuA-aiFWIRhbJ7nR9mdCQ",
    authDomain: "pi-planning-simulation.firebaseapp.com",
    databaseURL: "https://pi-planning-simulation.firebaseio.com",
    projectId: "pi-planning-simulation",
    storageBucket: "pi-planning-simulation.appspot.com",
    messagingSenderId: "336210056626",
    appId: "1:336210056626:web:f6dd831d6fbff5ac6580ab",
    measurementId: "G-ZC6JLG17VZ"
};

firebase.initializeApp(firebaseConfig);

export const databaseRef = firebase.database().ref();

