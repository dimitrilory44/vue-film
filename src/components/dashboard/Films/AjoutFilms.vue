<template>
    <v-container fluid style="margin-bottom: -50px">
        <!-- Affiche une alerte si l'utilisateur est anonyme -->
        <v-alert dense type="info" style="margin: -80px auto 40px -23px" v-if="isAnonymous">{{Anonymous}}</v-alert>

        <!-- Boîte de dialogue en plein écran pour la recherche de films sur les petits écrans -->
        <v-dialog fullscreen :retain-focus="false" content-class="dialog" v-model="search" v-if="largeur < 600">
            <template v-slot:activator="{ on, attrs }">
                <h4 class="titreP">Ajouter
                  <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </h4>
            </template>
            <v-card>
                <!-- Composant de recherche de films avec transmission des props -->
                <search-films v-bind:Id="Favs.Id" v-bind:Genre_Id="Favs.Genre_Id" v-bind:Acteur="Favs.Acteur" v-bind:Direction="Favs.Direction" v-bind:Titre="Favs.Titre" v-bind:Date_Sortie="Favs.Date_Sortie" v-bind:Date_Creation="Favs.Date_Creation" v-bind:Poster="Favs.Poster" v-bind:Descriptif="Favs.Descriptif" v-bind:search="search" v-on:close="updateSearch($event)"
                ></search-films>
            </v-card>
        </v-dialog>

        <!-- Boîte de dialogue pour les écrans plus larges -->
        <v-dialog :retain-focus="false" content-class="dialog" v-model="search" max-width="1000" v-else>
            <template v-slot:activator="{ on, attrs }">
                <h4 class="titreP">Ajouter
                  <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </h4>
            </template>
            <v-card>
                <search-films v-bind:Id="Favs.Id" v-bind:Genre_Id="Favs.Genre_Id" v-bind:Acteur="Favs.Acteur" v-bind:Direction="Favs.Direction" v-bind:Titre="Favs.Titre" v-bind:Date_Sortie="Favs.Date_Sortie" v-bind:Date_Creation="Favs.Date_Creation" v-bind:Poster="Favs.Poster" v-bind:Descriptif="Favs.Descriptif" v-bind:search="search" v-on:close="updateSearch($event)"
                ></search-films>
            </v-card>
        </v-dialog>
        <br>
        
        <!-- Affichage des favoris selon la taille de l'écran -->
        <favoris v-bind:favs="Favs" v-bind:genre="Genre" v-if="largeur > 600"></favoris>
        <favoris-mobile v-bind:favs="Favs" v-bind:genre="Genre" v-if="largeur < 600"></favoris-mobile>
    </v-container>
</template>

<script>
import {axios, Base_URL, API_KEY, firebase} from '../../../config/configApp';
import FavorisMobile from '../../mobile/dashboard/Films/Favoris-mobile.vue';
import Favoris from './Favoris.vue';
import SearchFilms from './SearchFilms.vue';

export default {
    name: "ajoutFilms",

    components: { 
        "searchFilms" : SearchFilms, 
        "favoris" : Favoris, 
        FavorisMobile
    },

    props: {
      Favs: {
        type: Object,
        required: true
      }
    },

    data() {
        return {
            search: false, // Contrôle l'affichage du dialogue de recherche
            Genre: [], // Liste des genres de films
            largeur: window.innerWidth, // Stocke la largeur de l'écran pour l'affichage adaptatif
            Anonymous: "", // Message d'alerte pour les utilisateurs anonymes
            isAnonymous: false // Indicateur si l'utilisateur est anonyme
        }
    },

    methods: {
        // Met à jour l'état de la boîte de dialogue de recherche
        updateSearch (updated) {this.search = updated;},
    },

    created() {
      // Récupération de la liste des genres depuis l'API
      axios
          .get(Base_URL + 'genre/movie/list?api_key='+ API_KEY + '&language=fr')
          .then(response => (this.Genre = response.data.genres))
          .catch(error => {console.log(error)})
      
      // Vérifie si l'utilisateur est anonyme et met à jour les variables en conséquence
      firebase.auth().onAuthStateChanged((user) => {
        if(user.displayName === null) {
            this.Anonymous = "Vous êtes connecté pour tester l'application, vous avez accès au minimum"
            this.isAnonymous = true;
        }
      });
    },

}
</script>

<style>
/* Ajoutez ici les styles spécifiques si nécessaire */
</style>