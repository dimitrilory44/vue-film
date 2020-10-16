import firebase from 'firebase';

const config = {
    apiKey: "******************************",
    authDomain: "******************************",
    databaseURL: "******************************",
    projectId: "******************************",
    storageBucket: "******************************",
    messagingSenderId: "******************************",
    appId: "******************************",
    measurementId: "******************************"
};

const Base_URL = "https://api.themoviedb.org/3/";
const API_KEY = '******************************';

const app = firebase.initializeApp(config);
const db = app.database();

const maListe = db.ref('ListeFilms');

export {Base_URL, API_KEY, firebase, maListe}