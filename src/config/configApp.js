import firebase from 'firebase';
import moment from 'moment';
import axios from 'axios';

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

const LienAppli = "http://192.168.1.17:8080";

export {axios, moment, Base_URL, API_KEY, firebase, maListe, LienAppli}