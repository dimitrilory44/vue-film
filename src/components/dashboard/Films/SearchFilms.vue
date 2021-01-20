<template>
    <v-container fluid>
        <v-card-title>Cherche un film
            <v-btn icon style="position:absolute; left: 86%" @click="search = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-alert v-if="alertFav == true" dismissible color="green" border="left" elevation="2" colored-border icon="mdi-bookmark">Le film <strong>{{successFav}}</strong> a été ajouté dans tes favoris</v-alert>
        <v-text-field class="input" v-model="nom" autofocus color="orange" label="Entrez film" required :append-outer-icon="nom ? 'mdi-send' : ''" v-on:keyup.enter="searchFilm"></v-text-field>
        <br>
        <v-row justify="center">
            <v-col lg="2" md="2" sm="2" xs="12" id="search" v-for="(info,index) in Infos" v-bind:key="info.id" v-bind:item="info" v-bind:index="index">
                <v-card class="white--text align-end choix" max-width="130" max-height="500">
                    <v-img tabindex="0" v-bind:src="'https://image.tmdb.org/t/p/original' + info.poster_path" style="cursor:pointer" height="180" width="350" v-on:keyup.enter="ajoutFilmFavoris(index)" @click ="ajoutFilmFavoris(index)"></v-img>
                    <v-card-text class="text--primary">                              
                        {{info.original_title}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {axios, moment, Base_URL, API_KEY} from '../../../config/configApp';
export default {
    name: "searchFilms",

    props: {
      Id: Array, Genre_Id: Array, Acteur: Array, Direction: Array, Titre: Array, Date_Sortie: Array, Date_Creation: Array, Poster: Array, Descriptif: Array
    },

    data() {
        return {
            nom: "",
            Infos: [],
            InfosCast: [],
            InfosDir: [],
            Id_Genre: '',
            alertFav: false,
            successFav: "",
        }
    },

    methods: {
      searchFilm() {
        axios
          .get(Base_URL + 'search/movie/?api_key='+ API_KEY + '&language=fr' + '&query=' + this.nom)
          .then(response => (this.Infos = response.data.results))
          .catch(error => {console.log(error)})
      },

      modifGenre() {
        for(let i2=0; i2 < this.Genre_Id.length; i2++) {
          this.Id_Genre = this.Genre_Id[i2];
        }

        for(let i3=0; i3 < this.Id_Genre.length; i3++) {
          if(this.Id_Genre[i3] == 27){this.Id_Genre[i3] = 'Horreur';} else if(this.Id_Genre[i3] == 28) {this.Id_Genre[i3] = 'Action';} else if(this.Id_Genre[i3] == 12) {this.Id_Genre[i3] = 'Aventure';} else if(this.Id_Genre[i3] == 16) {this.Id_Genre[i3] = 'Animation';} else if(this.Id_Genre[i3] == 35) {this.Id_Genre[i3] = 'Comedie';} else if(this.Id_Genre[i3] == 80) {this.Id_Genre[i3] = 'Crime';} else if(this.Id_Genre[i3] == 99) {this.Id_Genre[i3] = 'Biopic';} else if(this.Id_Genre[i3] == 18) {this.Id_Genre[i3] = 'Drame';} else if(this.Id_Genre[i3] == 10751) {this.Id_Genre[i3] = 'Famille';} else if(this.Id_Genre[i3] == 14) {this.Id_Genre[i3] = 'Fantastique';} else if(this.Id_Genre[i3] == 36) {this.Id_Genre[i3] = 'Histoire';} else if(this.Id_Genre[i3] == 10402) {this.Id_Genre[i3] = 'Musique';} else if(this.Id_Genre[i3] == 9648) {this.Id_Genre[i3] = 'Mystère';} else if(this.Id_Genre[i3] == 10749) {this.Id_Genre[i3] = 'Romance';} else if(this.Id_Genre[i3] == 878) {this.Id_Genre[i3] = 'Science-Fiction';} else if(this.Id_Genre[i3] == 10770) {this.Id_Genre[i3] = 'TV-Movie';} else if(this.Id_Genre[i3] == 53) {this.Id_Genre[i3] = 'Thriller';} else if(this.Id_Genre[i3] == 10752) {this.Id_Genre[i3] = 'Guerre';} else if(this.Id_Genre[i3] == 37) {this.Id_Genre[i3] = 'Western';} 
        }
      },

      ajoutFilmFavoris(item) {
        const Acteurs = axios
            .get(Base_URL + 'movie/' + this.Infos[item]['id'] + '/credits?api_key='+ API_KEY)
            .then(response => (this.InfosCast = response.data.cast))
            .catch(error => {console.log(error)})

        const Directions = axios
          .get(Base_URL + 'movie/' + this.Infos[item]['id'] + '/credits?api_key='+ API_KEY)
          .then(response => (this.InfosDir = response.data.crew))
          .catch(error => {console.log(error)})
        
        Promise.all([Acteurs, Directions]).then((castings) => {
          this.Id.push(this.Infos[item]['id']);
          this.Titre.push(this.Infos[item]['title']);
          this.Genre_Id.push(this.Infos[item]['genre_ids']);
          this.modifGenre();
          this.Date_Sortie.push(moment(Date.parse(this.Infos[item]['release_date'])).format('DD/MM/YYYY'));
          this.Date_Creation.push(moment(Date.now()).format('DD/MM/YYYY'));

          this.Acteur[this.Id.length - 1] = new Array();
          this.Direction[this.Id.length - 1] = new Array();
      
          castings[0].filter(acteur => this.Acteur[this.Id.length - 1].push(acteur.name));
          castings[1].filter(direction => this.Direction[this.Id.length - 1].push(direction.name));

            
          this.Poster.push('https://image.tmdb.org/t/p/original'+ this.Infos[item]['poster_path']);
          this.Descriptif.push(this.Infos[item]['overview']);

          this.alertFav = true;
          this.successFav = this.Infos[item]['title'];
        });
      }
    }
}
</script>
<style></style>