<template>
  <v-container fluid>
    <!-- Intégration du composant Devmode pour gérer l'affichage des films de test -->
    <devmode 
      :ListeFilms="ListeFilms" 
      :ListeFilmsTest="FilmsTest" 
      v-bind:tested="test" 
      v-on:show="updateTest($event)" 
      v-on:hide="updateTestHide($event)">
    </devmode>

    <!-- Affichage d'un message de succès si aucune erreur et alert est activée -->
    <v-alert v-if="erreur.length == 0 && alert == true" type="success">{{success}}</v-alert>
    <!-- Affichage d'un message d'erreur si une erreur est présente et l'alert est désactivée -->
    <v-alert v-else-if="erreur.length != 0 && alert == false" type="error">{{erreur}}</v-alert>

    <v-container fluid>
      <!-- Affichage du formulaire d'ajout de films si la liste 'Films' n'est pas vide -->
      <ajout-films v-bind:Favs="Films" class="col-lg-12 col-xs-12" v-if="Films.Id.length != 0"></ajout-films>
      <ajout-films v-bind:Favs="Films" class="col-lg-12 col-xs-12" v-else></ajout-films>

      <!-- Bouton pour valider l'ajout des films dans la base de données -->
      <v-btn tile outlined color="success" class="col-lg-3 col-xs-3 add" style="margin-bottom: 20px" 
        v-if="Films.Id.length != 0" v-on:keyup.enter="addFilmsFirebase" @click="addFilmsFirebase">
        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon> Valider
      </v-btn>
    </v-container>

    <!-- Affichage de la liste des films de test ou des films réels en fonction de l'état 'test' -->
    <liste-test v-bind:FilmsTest="FilmsTest" v-if="test === true"></liste-test>
    <liste-films v-bind:ListeFilms="ListeFilms" v-else></liste-films>
  </v-container>
</template>

<script>
  // Importation des données de Firebase (maListeFilms et maListeTest)
  import {maListeFilms, maListeTest} from '../../config/configApp';
  import Devmode from '../dashboard/Devmode.vue';  // Importation du composant Devmode
  import ListeTest from './Films/ListeTest.vue';  // Importation du composant ListeTest
  import AjoutFilms from './Films/AjoutFilms.vue';  // Importation du composant AjoutFilms
  import ListeFilms from './Films/ListeFilms.vue';  // Importation du composant ListeFilms

  export default {
    name : 'Films',  // Nom du composant

    components: {
      "devmode" : Devmode, 
      "ajoutFilms" : AjoutFilms, 
      ListeTest, 
      ListeFilms
    },

    data () {
      return {
        // Structure pour stocker les informations des films
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
        ListeFilms: [],  // Liste des films
        FilmsTest: [],  // Liste des films de test
        erreur: "",  // Message d'erreur
        test: false,  // État pour savoir si on est en mode test
        alert: false,  // État pour afficher les alertes
        success: "",  // Message de succès
        bdd: false,  // État indiquant si l'ajout a réussi ou non
        largeur: window.innerWidth  // Largeur de la fenêtre
      }
    },

    methods: {
      // Méthodes pour mettre à jour l'état 'test' lors du changement
      updateTest(updatedTest) { this.test = updatedTest; },
      updateTestHide(updateTestHide) { this.test = updateTestHide; },

      // Méthode pour ajouter les films à Firebase
      addFilmsFirebase() {
        for (var item = 0; item < this.Films.Id.length; item++) {
          // Vérification de la validité des données (s'il manque des informations)
          while(this.Films.Titre[item].length == 0 || this.Films.Date_Sortie[item].length == 0 || this.Films.Poster[item].length == 0 || this.Films.Genre_Id[item].length == 0 || this.Films.Acteur[item].length == 0 || this.Films.Direction[item].length == 0 || this.Films.Descriptif[item].length == 0) {
            this.erreur = 'Un problème dans ta saisie ! En cause : un titre vide, une date de sortie manquant, pas de genre, un casting manquant, pas de synopsis ou sinon pas de poster mais dans ce cas là change de lunettes !';
            item++;  // Incrémenter pour éviter de continuer à ajouter un film incomplet
            return this.bdd = false;  // Réinitialiser l'état 'bdd' à false
          }

          // Si le mode test est désactivé, ajouter le film dans la base de données réelle
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
          } else {  // Si le mode test est activé, ajouter le film dans la base de données de test
            maListeTest.child('Id').child(this.Films.Id[item]).set({
              Id : this.Films.Id[item],
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
        // Après l'ajout, rediriger l'utilisateur vers la page d'accueil
        this.$router.replace({ path: '/' });
        this.success = 'Bravo tes films ont été ajoutés avec succès à la base de données !';
        this.alert = true;  // Afficher l'alerte de succès
      }
    }
  }
</script>

<style src="../../assets/css/style.css"></style>
