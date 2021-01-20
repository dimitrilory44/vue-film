<template>
    <v-container fluid style="margin-top: -20px">
        <v-dialog :retain-focus="false" v-model="update" max-width="1200" max-height="450" v-if="favs.Id.length != 0">
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
                    <tbody v-for="(fav, index) in favs.Id" v-bind:key="fav" v-bind:item="fav" v-bind:index="index">
                        <tr>
                            <th scope="row" tabindex="0">{{ index + 1 }}</th>
                            <td v-bind="attrs" v-on="on" tabindex="0" v-on:keyup.enter="DetailFilm(index)" @click="DetailFilm(index)">{{ favs.Titre[index] }}</td>
                            <td scope="row" tabindex="0" v-if="favs.Genre_Id.length > 1">{{ favs.Genre_Id[index][0] }}, {{ favs.Genre_Id[index][1] }}, {{ favs.Genre_Id[index][2] }}</td>
                            <td scope="row" tabindex="0" v-else>{{ favs.Genre_Id[index][0] }}</td>
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
                <update-favoris v-bind:favs="favs" v-bind:Description="Description" v-bind:genre="genre" v-bind:change="changeNom"></update-favoris>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import UpdateFavoris from './UpdateFavoris.vue';
export default {
  components: { UpdateFavoris },
    name: "favoris",

    props: {
        favs: {type: Object, required: true},
        genre: {type: Array, required: true},
    },

    data() {
        return {
            update: false,
            changeNom: "",
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

        DetailFilm(item) {
            this.Description.id = this.favs.Id[item];
            this.changeNom = this.Description.titre = this.favs.Titre[item];
            this.Description.date_sortie = this.favs.Date_Sortie[item];
            this.Description.poster = this.favs.Poster[item];
            this.Description.descriptif = this.favs.Descriptif[item];
            for(var act = 0; act < 5; act++) {
                this.Description.acteur[act] = this.favs.Acteur[item][act];
            }
            for(var dir = 0; dir < 5; dir++) {
                this.Description.direction[dir] = this.favs.Direction[item][dir];
            }
            for(var gen = 0; gen < 3; gen++) {
                this.Description.genre_Id = this.favs.Genre_Id[item];
            }
            this.update = true;
        },
    }
}
</script>
<style></style>