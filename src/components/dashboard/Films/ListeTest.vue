<template>
    <!-- <v-container> -->
            <!-- Affichage des films sous forme de cartes --> 
            <v-row justify="center">
                <v-col lg="2" md="3" sm="3" xs="12" v-for="(film, index) in FilmsTest" v-bind:key="film.id" v-bind:index="index">
                    <v-card class="white--text align-end mycard" max-height="500">
                        <!-- Boîte de dialogue affichant les détails du film -->
                        <v-dialog :retain-focus="false" max-width="1200" max-height="1200">
                            <template v-slot:activator="{ on, attrs }">
                                <!-- Affiche du film -->
                                <v-img class="myimg" v-bind:src="film.Poster" v-bind="attrs" v-on="on" style="cursor:pointer"></v-img>
                                <!-- Titre du film -->
                                <v-card-text class="text--primary">                              
                                    {{ film.Titre }}
                                    <!-- A revoir -->
                                    <!-- <router-link :to="{ name: 'film', query: { Id: FilmsTestId[index].Id }}">Film</router-link> -->
                                </v-card-text>
                            </template>
                            <v-card>
                                <v-card-title>Description du film</v-card-title>
                                <v-divider></v-divider>
                                <v-container>
                                    <!-- Affichage de l'affiche du film en grand format -->
                                    <v-img v-bind:src='film.Poster' class="image" height="370" width="340"></v-img>
                                    <h1>{{ film.Titre }}</h1>
                                    <!-- Genre du film -->
                                    {{ film.Genre[0]}}
                                    <br><br>
                                    <!-- Date de sortie du film -->
                                    <p class="titre"><strong> Date de Sortie : </strong>{{ film.Date_Sortie }}</p>
                                    <!-- Synopsis du film -->
                                    <p class="paragrapheD"><strong> Synopsis : </strong>{{ film.Descriptif }}</p>
                                    <!-- Liste des acteurs et de la direction technique si disponible -->
                                    <v-container v-if="film.Acteur.length != 0">
                                    <p class="paragraphe"><strong> Acteur principaux :</strong> {{ film.Acteur[0]}}, {{ film.Acteur[1]}}, {{ film.Acteur[2]}}, {{ film.Acteur[3]}}, {{ film.Acteur[4]}}</p>
                                    <p class="paragraphe"><strong> Direction technique :</strong> {{ film.Direction[0]}}, {{ film.Direction[1]}}, {{ film.Direction[2]}}, {{ film.Direction[3]}}, {{ film.Direction[4]}}</p>
                                    </v-container>
                                </v-container>
                                <!-- Bouton pour modifier le film dans la base de données -->
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
        <!-- </v-container> -->
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

    data() {
        return {
            FilmsTestId: [], // Stocke les identifiants des films
            FilmRechercher: [], // Tableau pour la recherche de films
            nb: 431
        }
    },

    mounted() {
        // console.log('Firebase chargée!');

        // Chargement des films depuis Firebase et tri par titre
        maListeTest.child('Id').orderByChild('Titre').on('child_added', snapshot => {
            this.FilmsTest.push(snapshot.val());
        });

        // Chargement des identifiants des films depuis Firebase
        maListeTest.child('Id').on('child_added', snapshot => {
            this.FilmsTestId.push(snapshot.val());
        });

        // console.log('ListeFilms chargée et trié!');
    },
}
</script>

<style>
/* Ajoutez ici les styles spécifiques si nécessaire */
</style>