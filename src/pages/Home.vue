<template>
  <v-container fluid>
      <h1>Videothèque</h1>
      <!-- Image de la vidéothèque, avec un effet de curseur en forme de main et un petit espace en bas -->
      <img src="../assets/video.jpg" style="cursor:pointer; margin-left: 11px; margin-bottom: 20px" height="300" width="300"/>
      <h4>Une appli de gestion de film</h4>
      <!-- Bouton qui permet à l'utilisateur de se connecter en tant qu'utilisateur anonyme -->
      <v-btn color="primary" v-on:click.once="click">Connectez-vous en anonyme</v-btn>
      <!-- Composant NotFound, probablement pour afficher un message d'erreur ou de redirection -->
      <not-found></not-found>
      <!-- <h4><router-link to="/connexion" class="mt-3" style="color: ; font-weight: bold; text-decoration:none">Connectez-vous</router-link></h4> -->
      <!-- <router-view></router-view>    -->
  </v-container>
</template>

<script>
// Importation du composant NotFound
import NotFound from '../NotFound.vue';
// Importation de Firebase pour la gestion de l'authentification
import {firebase} from "../config/configApp";
// import Login from '../components/auth/loggin';

export default {
  components: { NotFound },

  methods: {
    // Méthode appelée lors du clic sur le bouton pour se connecter anonymement
    click() {
      // Connexion anonyme avec Firebase
      firebase.auth().signInAnonymously()
        .then(() => {
          // Actions à effectuer une fois la connexion réussie (aucune action ici pour le moment)
        })
        .catch((error) => {
          // Gestion des erreurs lors de la connexion
          console.log(error.code);
          console.log(error.message);
        });
    }
  }

}
</script>

<style>
/* Aucun style particulier n'est défini ici */
</style>