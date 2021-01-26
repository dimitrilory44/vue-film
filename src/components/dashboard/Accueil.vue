<template>
  <v-container fluid>
    <devmode :ListeFilms="Films" :ListeFilmsTest="FilmsTest" v-bind:tested="test" v-on:show="updateTest($event)" v-on:hide="updateTestHide($event)"></devmode>
    <v-alert dense type="info" style="margin-top: -60px" v-if="isAnonymous">{{Anonymous}}</v-alert>
    <h4 class="titrePAccueil" v-if="logged">Films ajoutés dernièrement</h4>
    <not-found v-else></not-found>
    <liste-test v-bind:FilmsTest="FilmsTest" v-if="test === true"></liste-test>
    <liste-films v-bind:ListeFilms="ListeFilms" v-else></liste-films>
  </v-container>
</template>

<script>
  import {firebase} from '../../config/configApp';
  import NotFound from '../../NotFound';
  import Devmode from './Devmode.vue';
  import ListeFilms from './Films/ListeFilms.vue';
  import ListeTest from './Films/ListeTest.vue';

  export default {
    name: 'Accueil',
    
    components: { 
      NotFound, 
      "devmode": Devmode, 
      ListeTest, 
      ListeFilms 
    },

    data () {
      return {
        Films: [],
        logged: false,
        test: false,
        verify: false,
        ListeFilms: [],
        FilmsTest: [],
        Anonymous: "",
        isAnonymous: false
      }
    },

    created() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user !== null) {
          this.logged = true;
        } else {
          this.logged = false;
        }
        if(user.displayName === null) {
          this.Anonymous = "Vous êtes connecté pour tester l'application, vous avez accès au minimum"
          this.isAnonymous = true;
        }
      });

      // Verifie email mais à retravailler

      // firebase.auth().currentUser.sendEmailVerification().then(() => {
      //   this.verify = true;
      //   console.log(this.verify);
      // }).catch(function(error) {
      //   console.log(error);
      // });
    },

    methods: {
      updateTest (updatedTest) {this.test = updatedTest;},
      updateTestHide(updateTestHide) {this.test = updateTestHide;}
    }
  }
</script>

<style src="../../assets/css/style.css"></style>