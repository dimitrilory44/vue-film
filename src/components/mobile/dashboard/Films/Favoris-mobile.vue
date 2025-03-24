<template>
    <v-container fluid style="margin-top: -20px">
        <!-- Dialog fullscreen avec une condition pour l'affichage -->
        <v-dialog fullscreen :retain-focus="false" v-model="description" max-height="450" v-if="favs.Id.length != 0">
            <template v-slot:activator="{ on, attrs }">
                <br>
                <!-- Table pour afficher les films favoris -->
                <table class="table table-hover" style="width: 100%; margin-bottom: 30px">
                    <thead>
                        <tr> 
                            <th scope="col">#</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody v-for="(fav, index) in favs.Id" v-bind:key="fav" v-bind:item="fav" v-bind:index="index">
                        <tr>
                            <th scope="row" tabindex="0">{{ index + 1 }}</th>
                            <td v-bind="attrs" v-on="on" tabindex="0" v-on:keyup.enter="DetailFilm(index)" @click="DetailFilm(index)">
                                {{ favs.Titre[index] }}
                            </td>
                            <td scope="row" tabindex="0" v-if="favs.Genre_Id.length > 1">
                                {{ favs.Genre_Id[index][0] }}, {{ favs.Genre_Id[index][1] }}, {{ favs.Genre_Id[index][2] }}
                            </td>
                            <td scope="row" tabindex="0" v-else>
                                {{ favs.Genre_Id[index][0] }}
                            </td>
                            <th scope="row">
                                <!-- Bouton pour supprimer un film des favoris -->
                                <v-btn icon tabindex="0" v-on:keyup.enter="supprimerFilmFavoris(index)" @click="supprimerFilmFavoris(index)">
                                    <v-icon>mdi-archive</v-icon>
                                </v-btn>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </template>

            <!-- Carte avec un composant de mise à jour des favoris -->
            <v-card>
                <update-favoris
                    v-bind:favs="favs"
                    v-bind:Description="Description"
                    v-bind:genre="genre"
                    v-bind:change="changeNom"
                    v-bind:update="description"
                    v-on:close="updateModal($event)"
                ></update-favoris>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
// Importation du composant de mise à jour des favoris
import UpdateFavoris from '../../../dashboard/Films/UpdateFavoris';

export default {
    name: "favoris",

    components: { UpdateFavoris },
    
    props: {
        // Les films favoris et les genres sont passés en tant que props
        favs: { type: Object, required: true },
        genre: { type: Array, required: true },
    },

    data() {
        return {
            description: false, // Contrôle l'affichage de la fenêtre de description du film
            changeNom: "", // Contient le titre du film sélectionné
            Description: {
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
        // Méthode pour fermer la fenêtre modale
        updateModal(updated) {
            this.description = updated;
        },

        // Méthode pour supprimer un film des favoris
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

        // Méthode pour afficher les détails du film sélectionné
        DetailFilm(item) {
            this.Description.id = this.favs.Id[item];
            this.changeNom = this.Description.titre = this.favs.Titre[item];
            this.Description.date_sortie = this.favs.Date_Sortie[item];
            this.Description.poster = this.favs.Poster[item];
            this.Description.descriptif = this.favs.Descriptif[item];

            // Affectation des acteurs et directions du film à la description
            for (var act = 0; act < 5; act++) {
                this.Description.acteur[act] = this.favs.Acteur[item][act];
            }

            for (var dir = 0; dir < 5; dir++) {
                this.Description.direction[dir] = this.favs.Direction[item][dir];
            }

            // Affectation des genres du film
            for (var gen = 0; gen < 3; gen++) {
                this.Description.genre_Id = this.favs.Genre_Id[item];
            }

            // Ouverture de la fenêtre modale de description du film
            this.description = true;
        },
    }
}
</script>

<style>
/* Pas de style spécifique défini pour ce composant */
</style>
