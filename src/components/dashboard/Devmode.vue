<template>
  <v-container fluid>
    <!-- Affichage du switch pour activer/désactiver le mode développeur uniquement si l'utilisateur est un "Admin" -->
    <v-switch
      v-if="utilisateur.nom === 'Admin'" 
      style="margin-top: -55px; width: 136px; color: grey; text-indent:0.5em"
      inset
      v-model="switch1" 
      :label="`Dev mode`" 
    ></v-switch>

    <!-- Si 'switch1' est vrai (mode développeur activé), afficher la section ci-dessous -->
    <v-container fluid v-if="switch1" style="margin-top: -20px; width: 100px; margin-bottom: 10px" class="pa-4 blue-grey lighten-5 text-no-wrap rounded-pill">
      <!-- Afficher le bouton 'Test' si 'tested' est vrai, sinon afficher le bouton 'Test Off' -->
      <v-btn v-on:click="show" v-if="tested" icon>
        <v-icon>mdi-test-tube</v-icon>
      </v-btn>
      <v-btn v-on:click="hide" v-else icon>
        <v-icon>mdi-test-tube-off</v-icon>
      </v-btn>|
    </v-container>
  </v-container>
</template>

<script>
  // Importation de la configuration Firebase
  import {firebase} from '../../config/configApp';

  export default {
    name: "devmode",  // Nom du composant

    props: {
      ListeFilms: Array,  // Liste des films à afficher
      ListeFilmsTest: Array,  // Liste des films de test
      tested: Boolean  // État indiquant si le mode de test est activé
    },

    data() {
      return {
        switch1: false,  // Valeur du switch pour activer/désactiver le mode développeur
        utilisateur: {
          uid: "",  // ID utilisateur
          nom: ""   // Nom de l'utilisateur
        },
      }
    },

    created() {
      // Vérification de l'état d'authentification de l'utilisateur lors de la création du composant
      firebase.auth().onAuthStateChanged((user) => {
        if(user !== null) {  // Si un utilisateur est connecté
          this.utilisateur.nom = user.displayName;  // Stocker le nom de l'utilisateur
          this.utilisateur.uid = user.uid;  // Stocker l'ID de l'utilisateur
        }
      });
    },

    methods: {
      // Méthode pour cacher les films de test
      hide() {
        this.$emit('hide', true);  // Émettre un événement 'hide' pour notifier les parents
        this.ListeFilms.length = 0;  // Réinitialiser la liste des films
      },

      // Méthode pour afficher les films de test
      show() {
        this.$emit('show', false);  // Émettre un événement 'show' pour notifier les parents
        this.ListeFilms.length = 0;  // Réinitialiser la liste des films
        this.ListeFilmsTest.length = 0;  // Réinitialiser la liste des films de test
      }
    }
  }
</script>

<style>
  /* Pas de styles définis dans ce composant */
</style>