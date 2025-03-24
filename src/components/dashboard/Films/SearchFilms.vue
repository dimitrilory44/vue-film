<template>
  <v-container fluid>
      <!-- Barre de recherche de film -->
      <v-card-title>Cherche un film
          <v-btn icon class="closeSearch" style="position:absolute;" @click="closeSearch">
              <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <!-- Message d'alerte après l'ajout d'un film en favoris -->
      <v-alert v-if="alertFav" dismissible color="green" border="left" elevation="2" colored-border icon="mdi-bookmark">
          Le film <strong>{{ successFav }}</strong> a été ajouté dans tes favoris
      </v-alert>

      <!-- Champ de saisie pour entrer le nom du film -->
      <v-text-field class="input" v-model="nom" autofocus color="orange" label="Entrez film" required 
                    :append-outer-icon="nom ? 'mdi-send' : ''" v-on:keyup.enter="searchFilm" 
                    v-if="isAnonymous != null">
      </v-text-field>

      <br>

      <!-- Affichage des résultats de recherche -->
      <v-row justify="center" v-if="isAnonymous != null">
          <v-col lg="2" md="2" sm="2" xs="12" id="search" v-for="(info, index) in Infos" v-bind:key="info.id" v-bind:item="info" v-bind:index="index">
              <v-card class="white--text align-end choix" max-width="130" max-height="500">
                  <!-- Affiche du film avec action d'ajout en favoris -->
                  <v-img tabindex="0" v-bind:src="'https://image.tmdb.org/t/p/original' + info.poster_path" 
                         style="cursor:pointer" height="180" width="350" 
                         v-on:keyup.enter="ajoutFilmFavoris(index)" 
                         @click="ajoutFilmFavoris(index)">
                  </v-img>
                  <v-card-text class="text--primary">                              
                      {{ info.original_title }}
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>

      <!-- Affichage d'un tutoriel si l'utilisateur est anonyme -->
      <tuto-anonyme v-else></tuto-anonyme>
  </v-container>
</template>

<script>
import { axios, moment, Base_URL, API_KEY, firebase } from '../../../config/configApp';
import TutoAnonyme from './TutoAnonyme.vue';

export default {
  components: { TutoAnonyme },
  name: "searchFilms",

  props: {
      Id: Array, Genre_Id: Array, Acteur: Array, Direction: Array, 
      Titre: Array, Date_Sortie: Array, Date_Creation: Array, 
      Poster: Array, Descriptif: Array, search: Boolean
  },

  data() {
      return {
          nom: "", // Nom du film recherché
          Infos: [], // Résultats de la recherche
          InfosCast: [], // Infos des acteurs du film sélectionné
          InfosDir: [], // Infos des réalisateurs du film sélectionné
          Id_Genre: '', // Genre du film
          alertFav: false, // Affichage de l'alerte d'ajout en favoris
          successFav: "", // Nom du film ajouté en favoris
          isAnonymous: "" // Vérification de l'utilisateur
      };
  },

  mounted() {
      // Vérification de l'état de connexion de l'utilisateur
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.isAnonymous = user.displayName;
          }
      });
  },

  methods: {
      // Ferme la barre de recherche
      closeSearch() {
          this.$emit('close', false);
      },

      // Recherche un film via l'API TMDb
      searchFilm() {
          axios.get(`${Base_URL}search/movie/?api_key=${API_KEY}&language=fr&query=${this.nom}`)
              .then(response => (this.Infos = response.data.results))
              .catch(error => { console.log(error) });
      },

      // Conversion des ID de genres en noms lisibles
      modifGenre() {
          for (let i2 = 0; i2 < this.Genre_Id.length; i2++) {
              this.Id_Genre = this.Genre_Id[i2];
          }

          for (let i3 = 0; i3 < this.Id_Genre.length; i3++) {
              const genres = {
                  27: 'Horreur', 28: 'Action', 12: 'Aventure', 16: 'Animation',
                  35: 'Comédie', 80: 'Crime', 99: 'Biopic', 18: 'Drame',
                  10751: 'Famille', 14: 'Fantastique', 36: 'Histoire', 
                  10402: 'Musique', 9648: 'Mystère', 10749: 'Romance', 
                  878: 'Science-Fiction', 10770: 'TV-Movie', 53: 'Thriller', 
                  10752: 'Guerre', 37: 'Western'
              };
              if (genres[this.Id_Genre[i3]]) {
                  this.Id_Genre[i3] = genres[this.Id_Genre[i3]];
              }
          }
      },

      // Ajoute un film aux favoris
      ajoutFilmFavoris(item) {
          const Acteurs = axios.get(`${Base_URL}movie/${this.Infos[item]['id']}/credits?api_key=${API_KEY}`)
              .then(response => (this.InfosCast = response.data.cast))
              .catch(error => { console.log(error) });

          const Directions = axios.get(`${Base_URL}movie/${this.Infos[item]['id']}/credits?api_key=${API_KEY}`)
              .then(response => (this.InfosDir = response.data.crew))
              .catch(error => { console.log(error) });

          Promise.all([Acteurs, Directions]).then((castings) => {
              this.Id.push(this.Infos[item]['id']);
              this.Titre.push(this.Infos[item]['title']);
              this.Genre_Id.push(this.Infos[item]['genre_ids']);
              this.modifGenre();
              this.Date_Sortie.push(moment(Date.parse(this.Infos[item]['release_date'])).format('DD/MM/YYYY'));
              this.Date_Creation.push(moment(Date.now()).format('DD/MM/YYYY'));

              // Stockage des acteurs et réalisateurs
              this.Acteur[this.Id.length - 1] = new Array();
              this.Direction[this.Id.length - 1] = new Array();
              castings[0].forEach(acteur => this.Acteur[this.Id.length - 1].push(acteur.name));
              castings[1].forEach(direction => this.Direction[this.Id.length - 1].push(direction.name));

              this.Poster.push(`https://image.tmdb.org/t/p/original${this.Infos[item]['poster_path']}`);
              this.Descriptif.push(this.Infos[item]['overview']);

              // Affichage du message de succès
              this.alertFav = true;
              this.successFav = this.Infos[item]['title'];
          });
      }
  }
}
</script>