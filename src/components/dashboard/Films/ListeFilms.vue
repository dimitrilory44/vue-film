<template>
  <!-- Conteneur principal pour afficher les films sous forme de cartes -->
  <v-row justify="center">
      <v-col lg="2" md="3" sm="3" xs="12" v-for="(film, index) in ListeFilms" v-bind:key="film.id" v-bind:index="index">
        <v-card class="white--text align-end mycard" max-height="500">
          <!-- Boîte de dialogue pour afficher les détails du film -->
          <v-dialog :retain-focus="false" max-width="1200" max-height="1200">
            <template v-slot:activator="{ on, attrs }">
              <!-- Affichage de l'affiche du film -->
              <v-img class="myimg" v-bind:src="film.Poster" v-bind="attrs" v-on="on" style="cursor:pointer"></v-img>
              <!-- Affichage du titre du film -->
              <v-card-text class="text--primary">                              
                {{ film.Titre }}
              </v-card-text>
            </template>
            <v-card>
              <v-card-title></v-card-title>
              <v-divider></v-divider>
              <v-container>
                <!-- Affiche du film en grand format -->
                <v-img v-bind:src='film.Poster' class="image" height="370" width="340"></v-img>
                <h1>{{ film.Titre }}</h1>
                <!-- Genre du film -->
                {{ film.Genre[0]}}
                <br><br>
                <!-- Date de sortie du film -->
                <p class="titre"><strong> Date de Sortie : </strong>{{ film.Date_Sortie }}</p>
                <!-- Synopsis du film -->
                <p class="paragrapheD"><strong> Synopsis : </strong>{{ film.Descriptif }}</p>
                
                <!-- Affichage des acteurs et de la direction technique si disponible -->
                <v-container v-if="film.Acteur.length != 0">
                  <p class="paragraphe"><strong> Acteur principaux :</strong> {{ film.Acteur[0]}}, {{ film.Acteur[1]}}, {{ film.Acteur[2]}}, {{ film.Acteur[3]}}, {{ film.Acteur[4]}}</p>
                  <p class="paragraphe"><strong> Direction technique :</strong> {{ film.Direction[0]}}, {{ film.Direction[1]}}, {{ film.Direction[2]}}, {{ film.Direction[3]}}, {{ film.Direction[4]}}</p>
                </v-container>
              </v-container>
              <br>
              <v-card-title></v-card-title>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import {maListeFilms} from '../../../config/configApp';

export default {
    props: {
        ListeFilms: {
            type: Array,
            required: true
        }
    },

    mounted() {
      // console.log('Firebase chargée!');
      // Chargement des films depuis Firebase et tri par titre
      maListeFilms.child('Id').orderByChild('Titre').on('child_added', snapshot => {
        this.ListeFilms.push(snapshot.val());
      });

      // console.log('ListeFilms chargée et trié!');

    },
}
</script>
<style>
/* Ajoutez ici les styles spécifiques si nécessaire */
</style>