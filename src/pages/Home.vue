<template>
  <v-container fluid>
      <h1>Videothèque</h1> 
      <img src="../assets/video.jpg" style="cursor:pointer; margin-left: 11px; margin-bottom: 20px" height="300" width="300"/>
      <h4>Une appli de gestion de film</h4>
      <v-btn color="primary" v-on:click.once="click">Connectez-vous en anonyme</v-btn>
      <not-found></not-found>
      <!-- <h4><router-link to="/connexion" class="mt-3" style="color: ; font-weight: bold; text-decoration:none">Connectez-vous</router-link></h4> -->
      <!-- <router-view></router-view>    -->
  </v-container>
</template>

<script>
import NotFound from '../NotFound.vue';
import {firebase} from "../config/configApp";
// import Login from '../components/auth/loggin';

export default {
  components: { NotFound },

  methods: {
    click() {
      firebase.auth().signInAnonymously()
        .then(() => {
  
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
    }
  }

}
</script>

<style>

</style>