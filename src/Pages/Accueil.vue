<template>
  <v-container fluid>
    <h3 class="titrePAccueil">Films ajoutés dernièrement</h3>
    <v-row justify="center">
      <v-col lg="2" md="3" sm="4" xs="12" id="searchAccueil" v-for="film in Films" v-bind:key="film.id">
        <v-card class="white--text align-end poster" width="155" max-height="440">
          <v-dialog :retain-focus="false" max-width="1200">
            <template v-slot:activator="{ on, attrs }">
              <v-img class="myposter" v-bind:src="film.Poster" v-bind="attrs" v-on="on" style="cursor:pointer"></v-img>
              <v-card-text class="text--primary">                              
                {{ film.Titre }}
              </v-card-text>
            </template>
            <v-card>
              <v-card-title>Description du film</v-card-title>
              <v-divider></v-divider>
              <v-container>
                <v-img v-bind:src='film.Poster' class="imageAccueil" height="370" width="340"></v-img>
                <h1>{{ film.Titre }}</h1>
                {{ film.Genre[0]}}
                <br><br>
                <p class="titreAccueil"><strong> Date de Sortie : </strong>{{ film.Date_Sortie }}</p>
                <p class="paragrapheD"><strong> Synopsis : </strong>{{ film.Descriptif }}</p>
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
  import {maListe} from '../config/configApp';

  export default {
    name: 'Accueil',
    
    data () {
      return {
        Films: [],
        Accueil: false
      }
    },

    mounted() {
      console.log('Firebase chargée!');

      // maListeFilms.child('Id').orderByChild('Titre').on('child_added', snapshot => {
      //   this.Films.push(snapshot.val());
      // })

      maListe.child('Id').orderByChild('Titre').on('child_added', snapshot => {
        this.Films.push(snapshot.val());
      })

      console.log('ListeFilms chargée et trié!');
    },

  }
</script>

<style src="../assets/css/style.css"></style>