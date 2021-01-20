<template>
    <v-container fluid style="margin-bottom: -50px">
        <v-dialog :retain-focus="false" content-class="dialog" v-model="search" max-width="1000">
            <template v-slot:activator="{ on, attrs }">
                <h4 class="titreP">Ajouter
                  <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </h4>
            </template>
            <v-card>
                <search-films v-bind:Id="Favs.Id" v-bind:Genre_Id="Favs.Genre_Id" v-bind:Acteur="Favs.Acteur" v-bind:Direction="Favs.Direction" v-bind:Titre="Favs.Titre" v-bind:Date_Sortie="Favs.Date_Sortie" v-bind:Date_Creation="Favs.Date_Creation" v-bind:Poster="Favs.Poster" v-bind:Descriptif="Favs.Descriptif"
                ></search-films>
            </v-card>
        </v-dialog>
        <br>
        <favoris v-bind:favs="Favs" v-bind:genre="Genre"></favoris>
    </v-container>
</template>

<script>
import {axios, Base_URL, API_KEY} from '../../../config/configApp';
import Favoris from './Favoris.vue';
import SearchFilms from './SearchFilms.vue';

export default {
    name: "ajoutFilms",

    components: { "searchFilms" : SearchFilms, "favoris" : Favoris},

    props: {
      Favs: {
        type: Object,
        required: true
      }
    },

    data() {
        return {
            search: false,
            Genre: [],
        }
    },

    created() {
      // J'enregistre la liste de genre dans un tableau de façon permanente pour l'application
      axios
          .get(Base_URL + 'genre/movie/list?api_key='+ API_KEY + '&language=fr')
          .then(response => (this.Genre = response.data.genres))
          .catch(error => {console.log(error)})
    },

}
</script>

<style></style>