<template>
    <v-container fluid>
        <v-card-title>Description du film
            <v-btn icon style="position:absolute; left: 86%" v-on:keyup.esc="update = false" @click="update = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container fluid>
            <v-img v-bind:src='Description.poster' class="image" height="370" width="340"></v-img>
            <h1>{{ Description.titre }}</h1>
            <a v-if="Description.genre_Id.length > 1">{{ Description.genre_Id[0]}}, {{ Description.genre_Id[1]}}, {{ Description.genre_Id[2]}}</a>
            <a v-else>{{ Description.genre_Id[0]}}</a>
            <br><br>
            <p class="titre"><strong> Date de Sortie : </strong>{{ Description.date_sortie }}</p>
            <p class="paragrapheD"><strong> Synopsis : </strong>{{ Description.descriptif }}</p>
            <v-container v-if="favs.Acteur.length != 0">
                <p class="paragraphe"><strong> Acteur principaux :</strong> {{ Description.acteur[0]}} , {{ Description.acteur[1]}} , {{ Description.acteur[2]}} , {{ Description.acteur[3]}} , {{ Description.acteur[4]}}</p>
                <p class="paragraphe"><strong> Direction technique :</strong> {{ Description.direction[0]}}, {{ Description.direction[1]}}, {{ Description.direction[2]}}, {{ Description.direction[3]}}, {{ Description.direction[4]}}</p>
            </v-container>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-dialog :retain-focus="false" v-model="edits" max-width="500" max-height="700"> 
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="ma-2" tile outlined color="success" v-on:click="details = false" @click="ModifFav">Valider</v-btn>
                <v-btn class="ma-2" tile outlined color="success" v-bind="attrs" v-on="on" v-on:click.once="MesGenres"><v-icon left>mdi-pencil</v-icon> Modifier</v-btn>
            </template>
            <v-card>
                <v-card-title>Edit films</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model='change' label="Nom Film"></v-text-field>
                                <v-select v-model="value" :items="Genre" label="Genre Film" chips multiple></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="edits = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text v-on:click="edits = false" v-on:keyup.enter="ajoutModif" @click="ajoutModif">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        </v-card-actions>
        <v-divider></v-divider>
    </v-container>
  </v-container>
</template>

<script>
export default {
    name: "description",

    props: {
        Description: {type: Object, required: true},
        favs: {type: Object, required: true},
        genre: {type: Array, required: true},
        change: {type: String, required: true},
    },

    data() {
        return {
            modif: [],
            modifNom: '',
            details: false,
            update: false,
            edits: false,
            value: [],
            Genre: []
        }
    },

    methods: {
        MesGenres() {
            for(var genre=0; genre < this.genre.length ; genre++) {
                this.Genre.push(this.genre[genre]['name']);
            }
            this.Genre.push("Biopic");
            this.Genre.splice(5, 1);
            this.Genre.sort();
        },

        ajoutModif() {
            this.Description.genre_Id.splice(0, 5);
            this.Description.titre = "";
            this.Description.titre = this.change;
            for(var i5 = 0; i5 < this.value.length; i5++) {
                this.Description.genre_Id.push(this.value[i5]);    
                this.modif = this.Description.genre_Id[0];
            }
            this.modifNom = this.change;
        },

        ModifFav() {
            for(var item = 0; item < this.favs.Id.length; item++) {
                if(this.Description.id == this.favs.Id[item]) {
                    var it = this.favs.Id.indexOf(this.favs.Id[item]);
                    this.favs.Genre_Id[it].splice(0, 3);
                    this.favs.Genre_Id[it].push(this.modif);
                    this.favs.Titre[it] = this.change;
                }
            }
            this.value.splice(0,3);
        },
    }
}
</script>
<style></style>