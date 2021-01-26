<template>
  <v-container fluid>
    <devmode :ListeFilms="ListeFilms" :ListeFilmsTest="FilmsTest" v-bind:tested="test" v-on:show="updateTest($event)" v-on:hide="updateTestHide($event)"></devmode>
    <v-alert v-if="erreur.length == 0 && alert == true" type="success">{{success}}</v-alert>
    <v-alert v-else-if="erreur.length != 0 && alert == false" type="error">{{erreur}}</v-alert>
    <v-container fluid>
        <ajout-films v-bind:Favs="Films" class="col-lg-12 col-xs-12" v-if="Films.Id.length != 0"></ajout-films>
        <ajout-films v-bind:Favs="Films" class="col-lg-12 col-xs-12" v-else></ajout-films>
        <v-btn tile outlined color="success" class="col-lg-3 col-xs-3 add" style="margin-bottom: 20px" v-if="Films.Id.length != 0" v-on:keyup.enter="addFilmsFirebase" @click="addFilmsFirebase">
          <v-icon left>mdi-checkbox-marked-circle-outline</v-icon> Valider
        </v-btn>
    </v-container>
    <liste-test v-bind:FilmsTest="FilmsTest" v-if="test === true"></liste-test>
    <liste-films v-bind:ListeFilms="ListeFilms" v-else></liste-films>
  </v-container>
</template>

<script>

import {maListeFilms, maListeTest} from '../../config/configApp';
import Devmode from '../dashboard/Devmode.vue';
import ListeTest from './Films/ListeTest.vue';
import AjoutFilms from './Films/AjoutFilms.vue';
import ListeFilms from './Films/ListeFilms.vue';
  
export default {
    name : 'Films', 
    
    components: {
      "devmode" : Devmode, 
      "ajoutFilms" : AjoutFilms, 
      ListeTest, 
      ListeFilms
    },
    
    data () {
      return {
        Films: {
          Id: [],
          Genre_Id: [],
          Acteur: [],
          Direction: [],
          Titre: [],
          Date_Sortie: [],
          Date_Creation: [],
          Poster: [],
          Descriptif: []
        },
        ListeFilms: [],
        FilmsTest: [],
        erreur: "",
        test: false,
        alert: false,
        success: "",
        bdd: false,
        largeur: window.innerWidth
      }
    },

    methods: {
      updateTest(updatedTest) {this.test = updatedTest;},
      updateTestHide(updateTestHide) {this.test = updateTestHide;},

      addFilmsFirebase() {
        for (var item = 0; item < this.Films.Id.length; item++) {
          while(this.Films.Titre[item].length == 0 || this.Films.Date_Sortie[item].length == 0 || this.Films.Poster[item].length == 0 || this.Films.Genre_Id[item].length == 0 || this.Films.Acteur[item].length == 0 || this.Films.Direction[item].length == 0 || this.Films.Descriptif[item].length == 0) {
            this.erreur = 'Un problème dans ta saisie ! En cause : un titre vide, une date de sortie manquant, pas de genre, un casting manquant, pas de synopsis ou sinon pas de poster mais dans ce cas là change de lunettes !';
            item++;
            return this.bdd = false;
          }
          if(this.test === false) {
            maListeFilms.child('Id').child(this.Films.Id[item]).set({
              Titre : this.Films.Titre[item],
              Date_Sortie : this.Films.Date_Sortie[item],
              Date_Creation : this.Films.Date_Creation[item],
              Genre : this.Films.Genre_Id[item],
              Poster : this.Films.Poster[item], 
              Acteur : this.Films.Acteur[item],
              Direction : this.Films.Direction[item],
              Descriptif : this.Films.Descriptif[item]
            }); 
          } else {
            maListeTest.child('Id').child(this.Films.Id[item]).set({
              /* Id : this.Films.Id[item], */
              Titre : this.Films.Titre[item],
              Date_Sortie : this.Films.Date_Sortie[item],
              Date_Creation : this.Films.Date_Creation[item],
              Genre : this.Films.Genre_Id[item],
              Poster : this.Films.Poster[item], 
              Acteur : this.Films.Acteur[item],
              Direction : this.Films.Direction[item],
              Descriptif : this.Films.Descriptif[item]
            }); 
          }
        }
        this.$router.replace({ path: '/' });
        this.success = 'Bravo tes films ont été ajoutés avec succès à la base de données !';
        this.alert = true; 
      }
    }
}
</script>
<style src="../../assets/css/style.css"></style>