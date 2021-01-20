<template>
    <v-row justify="center">
        <v-col lg="2" md="3" sm="3" xs="12" v-for="(film, index) in FilmsTest" v-bind:key="film.id" v-bind:index="index">
            <v-card class="white--text align-end mycard" max-height="500">
                <v-dialog :retain-focus="false" max-width="1200" max-height="1200">
                    <template v-slot:activator="{ on, attrs }">
                    <v-img class="myimg" v-bind:src="film.Poster" v-bind="attrs" v-on="on" style="cursor:pointer"></v-img>
                    <v-card-text class="text--primary">                              
                        {{ film.Titre }}
                    </v-card-text>
                    </template>
                    <v-card>
                    <v-card-title>Description du film</v-card-title>
                    <v-divider></v-divider>
                    <v-container>
                        <v-img v-bind:src='film.Poster' class="image" height="370" width="340"></v-img>
                        <h1>{{ film.Titre }}</h1>
                        {{ film.Genre[0]}}
                        <br><br>
                        <p class="titre"><strong> Date de Sortie : </strong>{{ film.Date_Sortie }}</p>
                        <p class="paragrapheD"><strong> Synopsis : </strong>{{ film.Descriptif }}</p>
                        <v-container v-if="film.Acteur.length != 0">
                        <p class="paragraphe"><strong> Acteur principaux :</strong> {{ film.Acteur[0]}}, {{ film.Acteur[1]}}, {{ film.Acteur[2]}}, {{ film.Acteur[3]}}, {{ film.Acteur[4]}}</p>
                        <p class="paragraphe"><strong> Direction technique :</strong> {{ film.Direction[0]}}, {{ film.Direction[1]}}, {{ film.Direction[2]}}, {{ film.Direction[3]}}, {{ film.Direction[4]}}</p>
                        </v-container>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text v-on:click="edits = false" v-on:keyup.enter="ajoutModif" @click="modifierBdd(index)">Modifier</v-btn>
                        </v-card-actions>
                    <br><br>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {maListeTest} from '../../../config/configApp';

export default {

    props: {
        FilmsTest: {
            type: Array,
            required: true
        }
    },

    mounted() {
      // console.log('Firebase chargée!');

     maListeTest.child('Id').orderByChild('Titre').on('child_added', snapshot => {
        this.FilmsTest.push(snapshot.val());
     });

      // console.log('ListeFilms chargée et trié!');

    },
}
</script>

<style>

</style>