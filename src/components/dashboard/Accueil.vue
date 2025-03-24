<template>
  <!-- Conteneur principal de la page -->
  <v-container fluid>
    
    <!-- Intégration du composant "devmode" avec des props et des événements -->
    <devmode :ListeFilms="Films" :ListeFilmsTest="FilmsTest" v-bind:tested="test" v-on:show="updateTest($event)" v-on:hide="updateTestHide($event)"></devmode>
    
    <!-- Affichage d'une alerte si l'utilisateur est anonyme -->
    <v-alert dense type="info" style="margin-top: -60px" v-if="isAnonymous">{{Anonymous}}</v-alert>
    
    <!-- Titre des films ajoutés dernièrement, affiché seulement si l'utilisateur est connecté -->
    <h4 class="titrePAccueil" v-if="logged">Films ajoutés dernièrement</h4>
    
    <!-- Si l'utilisateur n'est pas connecté, afficher un composant NotFound -->
    <not-found v-else></not-found>
    
    <!-- Afficher la liste des films de test si "test" est true -->
    <liste-test v-bind:FilmsTest="FilmsTest" v-if="test === true"></liste-test>
    
    <!-- Sinon afficher la liste des films -->
    <liste-films v-bind:ListeFilms="ListeFilms" v-else></liste-films>
  </v-container>
</template>

<script>
  // Importation des composants et de la configuration Firebase
  import {firebase} from '../../config/configApp';
  import NotFound from '../../NotFound';
  import Devmode from './Devmode.vue';
  import ListeFilms from './Films/ListeFilms.vue';
  import ListeTest from './Films/ListeTest.vue';

  export default {
    name: 'Accueil',  // Nom du composant
    
    components: {  // Définition des composants enfants
      NotFound, 
      "devmode": Devmode, 
      ListeTest, 
      ListeFilms 
    },

    data () {
      return {
        // Initialisation des données nécessaires pour le fonctionnement du composant
        Films: [],  // Liste des films
        logged: false,  // Indicateur si l'utilisateur est connecté
        test: false,  // Indicateur pour savoir si on affiche les films de test
        verify: false,  // Indicateur pour la vérification de l'email (non utilisé actuellement)
        ListeFilms: [],  // Liste des films à afficher
        FilmsTest: [],  // Liste des films de test
        Anonymous: "",  // Message d'anonymat
        isAnonymous: false  // Indicateur si l'utilisateur est anonyme
      }
    },

    created() {
      // Vérification de l'état de l'utilisateur lors de la création du composant
      firebase.auth().onAuthStateChanged((user) => {
        if(user !== null) {  // Si l'utilisateur est connecté
          this.logged = true;
        } else {
          this.logged = false;  // Si l'utilisateur n'est pas connecté
        }

        // Vérification si l'utilisateur n'a pas de nom d'affichage (utilisateur anonyme)
        if(user.displayName === null) {
          this.Anonymous = "Vous êtes connecté pour tester l'application, vous avez accès au minimum";
          this.isAnonymous = true;  // Indiquer que l'utilisateur est anonyme
        }
      });

      // Code pour vérifier l'email de l'utilisateur (commenté pour le moment)
      // firebase.auth().currentUser.sendEmailVerification().then(() => {
      //   this.verify = true;
      //   console.log(this.verify);
      // }).catch(function(error) {
      //   console.log(error);
      // });
    },

    methods: {
      // Méthodes pour mettre à jour l'état du test
      updateTest (updatedTest) {this.test = updatedTest;},
      updateTestHide(updateTestHide) {this.test = updateTestHide;}  // Mise à jour de l'état "test"
    }
  }
</script>

<style src="../../assets/css/style.css"></style>
