<template>
  <v-container fluid>
    <br>
    <h2 class="titreP">Films ajoutés dernièrement</h2>
    <v-row justify="center">
      <v-col cols="2" id="search" v-for="film in Films" v-bind:key="film.id">
        <v-card class="white--text align-end" max-width="700" max-height="440">
          <v-dialog :retain-focus="false" max-width="1200">
            <template v-slot:activator="{ on, attrs }">
              <v-img v-bind:src="film.Poster" v-bind="attrs" v-on="on" style="cursor:pointer" height="350"></v-img>
              <v-card-text class="text--primary">                              
                <h3>{{ film.Titre }}</h3>
              </v-card-text>
            </template>
            <v-card>
              <v-card-title>Description du film</v-card-title>
              <v-divider></v-divider>
              <br>
              <v-container>
                <v-img v-bind:src='film.Poster' class="image" height="380" width="240"></v-img>
                <h1>{{ film.Titre }}</h1>
                {{ film.Genre[0]}}
                <br><br>
                <p class="titre"><strong> Date de Sortie : </strong>{{ film.Date }}</p>
                <p class="titre"><strong> Synopsis :</strong></p>
                <p class="paragrapheD"> {{ film.Descriptif }}</p>
                <v-container v-if="film.Acteur.length != 0">
                  <p class="paragraphe"><strong> Acteur principaux :</strong> {{ film.Acteur[0]}}, {{ film.Acteur[1]}}, {{ film.Acteur[2]}}, {{ film.Acteur[3]}}, {{ film.Acteur[4]}}</p>
                  <p class="paragraphe"><strong> Direction technique :</strong> {{ film.Direction[0]}}, {{ film.Direction[1]}}, {{ film.Direction[2]}}, {{ film.Direction[3]}}, {{ film.Direction[4]}}</p>
                </v-container>
              </v-container>
              <br><br>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import firebase from 'firebase';

  export default {
    data () {
      return {
        Films: [],
        Accueil: false
      }
    },

    mounted() {
      // console.log('App mounted!');
      // if (localStorage.getItem('lstFilms')) this.Films = JSON.parse(localStorage.getItem('lstFilms'));

      console.log('Firebase chargée!');
      firebase.database().ref('/ListeFilms').once('value', snapshot => {
        this.Films = snapshot.val();
      })
      console.log('ListeFilms chargée!');
    },

  }
</script>

<style scoped>
  .v-card__text {
    height: 85px!important;
  }

  .titre {
    text-align: left;
    margin-left: 7%;
  }

  .titreP {
    text-align: left;
    margin-left: 7%;
    color: grey;
  }

  #search {
    margin-left: 1%;
    /* margin-right: 10px; */
  }

  .titre {
    text-align: left;
  }

  .paragraphe {
    text-align: justify;
  }

  .paragraphe_b {
    text-align: justify;
    text-overflow: ellipsis;
  }

  .paragrapheD {
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    max-height: 70px;      /* fallback */
   -webkit-line-clamp: 3; /* number of lines to show */
   -webkit-box-orient: vertical;
  }

  .image {
    float: left;
    height: 500px;
    margin-right: 30px
  }
</style>