<template>
    <v-container fluid style="margin-top: -20px">
        <!-- Boîte de dialogue pour afficher et modifier les films favoris -->
        <v-dialog :retain-focus="false" v-model="description" width="1200" max-height="450" v-if="favs.Id.length != 0">
            <template v-slot:activator="{ on, attrs }">
                <br>
                <table class="table table-hover" style="width: 100%; margin-bottom: 30px">
                    <thead>
                        <tr> 
                            <th scope="col">#</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <!-- Boucle sur les films favoris pour les afficher dans la table -->
                    <tbody v-for="(fav, index) in favs.Id" v-bind:key="fav" v-bind:item="fav" v-bind:index="index">
                        <tr>
                            <!-- Numéro de la ligne selon l'index de la tab -->
                            <th scope="row" tabindex="0">{{ index + 1 }}</th>
                            <!-- Titre du film cliquable pour afficher les détails -->
                            <td v-bind="attrs" v-on="on" tabindex="0" v-on:keyup.enter="DetailFilm(index)" @click="DetailFilm(index)">{{ favs.Titre[index] }}</td>
                            <!-- Affichage des genres associés au film -->
                            <td scope="row" tabindex="0" v-if="favs.Genre_Id.length > 1">{{ favs.Genre_Id[index][0] }}, {{ favs.Genre_Id[index][1] }}, {{ favs.Genre_Id[index][2] }}</td>
                            <td scope="row" tabindex="0" v-else>{{ favs.Genre_Id[index][0] }}</td>
                            <!-- Bouton pour supprimer le film des favoris -->
                            <th scope="row">
                                <v-btn icon tabindex="0" v-on:keyup.enter="supprimerFilmFavoris(index)" @click="supprimerFilmFavoris(index)">
                                    <v-icon>mdi-archive</v-icon>
                                </v-btn>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </template>
            <v-card>
                <!-- Composant pour modifier les détails d'un film favori -->
                <update-favoris v-bind:favs="favs" v-bind:Description="Description" v-bind:genre="genre" v-bind:change="changeNom" v-bind:update="description" v-on:close="updateModal($event)"></update-favoris>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import UpdateFavoris from './UpdateFavoris.vue';

export default {
    name: "favoris",

    components: { UpdateFavoris },
    
    props: {
        favs: {type: Object, required: true}, // Liste des films favoris
        genre: {type: Array, required: true}, // Liste des genres de films
    },

    data() {
        return {
            description: false, // Contrôle l'affichage de la boîte de dialogue des détails du film
            changeNom: "", // Nom du film en cours de modification
            Description: { // Objet contenant les détails du film sélectionné
                id: '',
                genre_Id: [],
                titre: '',
                date_sortie: '',
                poster: '',
                descriptif: '',
                acteur: [],
                direction: []
            },
        }
    },
    
    methods: {
        // Met à jour l'état de la boîte de dialogue
        updateModal(updated) {this.description = updated;},

        // Supprime un film des favoris
        supprimerFilmFavoris(item) {
            this.favs.Id.splice(item, 1);
            this.favs.Titre.splice(item, 1);
            this.favs.Genre_Id.splice(item, 1);
            this.favs.Acteur.splice(item, 1);
            this.favs.Direction.splice(item, 1);
            this.favs.Poster.splice(item, 1);
            this.favs.Date_Sortie.splice(item, 1);
            this.favs.Descriptif.splice(item, 1);
        },

        // Affiche les détails d'un film sélectionné
        DetailFilm(item) {
            this.Description.id = this.favs.Id[item];
            this.changeNom = this.Description.titre = this.favs.Titre[item];
            this.Description.date_sortie = this.favs.Date_Sortie[item];
            this.Description.poster = this.favs.Poster[item];
            this.Description.descriptif = this.favs.Descriptif[item];
            
            // Récupération des 5 premiers acteurs
            for(var act = 0; act < 5; act++) {
                this.Description.acteur[act] = this.favs.Acteur[item][act];
            }

            // Récupération des 5 premiers réalisateurs
            for(var dir = 0; dir < 5; dir++) {
                this.Description.direction[dir] = this.favs.Direction[item][dir];
            }

            // Récupération des 3 premiers genres
            for(var gen = 0; gen < 3; gen++) {
                this.Description.genre_Id = this.favs.Genre_Id[item];
            }
            this.description = true; // Ouvre la boîte de dialogue
        },
    }
}
</script>
<style>
/* Ajoutez ici les styles spécifiques si nécessaire */
</style>