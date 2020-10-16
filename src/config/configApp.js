import firebase from 'firebase';

let config = {
    apiKey: "******************************",
    authDomain: "****************************",
    databaseURL: "***************************",
    projectId: "*****************",
    storageBucket: "****************",
    messagingSenderId: "**************",
    appId: "*******************************",
    measurementId: "**************"
};

const Base_URL = "https://api.themoviedb.org/3/";
const API_KEY = '***************************';

const app = firebase.initializeApp(config);
const db = app.database();

export {Base_URL, API_KEY, db}