<template>
  <v-container fluid>
    <br>
    <v-dialog :retain-focus="false" content-class="dialog" v-model="search" max-width="1000">
      <template v-slot:activator="{ on, attrs }">
        <h3 class="titreP">Ajouter
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon v-if="Favs.Id.length != 0" v-on:keyup.enter="addFilmsFirebase" @click="addFilmsFirebase">
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          </v-btn>
        </h3>
      </template>
      <v-card>
        <v-container fluid>
          <v-card-title>Cherche un film
          <v-btn icon class="btn_close" @click="search = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <!-- <br> -->
          <v-text-field class="input" v-model="nom" autofocus color="orange" label="Entrez film" required :append-outer-icon="nom ? 'mdi-send' : ''" v-on:keyup.enter="searchFilm"></v-text-field>
          <br>
          <v-row justify="center">
            <v-col cols="3" id="search" v-for="(info,index) in Infos" v-bind:key="info.id" v-bind:item="info" v-bind:index="index">
              <v-card class="white--text align-end" max-width="500" max-height="500">
                <v-img tabindex="0" v-bind:src="'https://image.tmdb.org/t/p/original' + info.poster_path" style="cursor:pointer" height="300" width="350" v-on:keyup.enter="ajoutFilmFavoris(index)" @click ="ajoutFilmFavoris(index)"></v-img>
                  <v-card-text class="text--primary">                              
                    <h6>{{info.original_title}}</h6>
                  </v-card-text>
              </v-card>
            </v-col>
          </v-row>          
        </v-container>
      </v-card>
    </v-dialog>
    <br>
    <v-row justify="center">
      <v-dialog :retain-focus="false" v-model="details" max-width="1200" max-height="450" v-if="Favs.Id.length != 0">
        <template v-slot:activator="{ on, attrs }">
          <br>
          <table class="table table-hover" style="width:85.5%; margin-top: 10px; margin-left:14px">
            <thead>
              <tr> 
                <th scope="col">#</th>
                <th scope="col">Titre</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="(fav, index) in Favs.Id" v-bind:key="fav" v-bind:item="fav" v-bind:index="index">
              <tr>
                <th scope="row" tabindex="0">{{ index + 1 }}</th>
                <td v-bind="attrs" v-on="on" tabindex="0" v-on:keyup.enter="DetailFilm(index)" @click="DetailFilm(index)">{{ Favs.Titre[index] }}</td>
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
          <v-card-title>Description du film
            <v-btn icon style="position:absolute; left: 95%" v-on:keyup.esc="details = false" @click="details = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <br>
          <v-container>
            <v-img v-bind:src='Description.poster' class="image" height="350" width="240"></v-img>
            <h1>{{ Description.titre }}</h1>
            {{ Description.genre_Id[0]}}, {{ Description.genre_Id[1]}}, {{ Description.genre_Id[2]}}
            <br><br>
            <p class="titre"><strong> Date de Sortie : </strong>{{ Description.date }}</p>
            <p class="paragrapheD"><strong> Synopsis : </strong>{{ Description.descriptif }}</p>
            <v-container v-if="Favs.Acteur.length != 0">
              <p class="paragraphe"><strong> Acteur principaux :</strong> {{ Description.acteur[0]}} , {{ Description.acteur[1]}} , {{ Description.acteur[2]}} , {{ Description.acteur[3]}} , {{ Description.acteur[4]}}</p>
              <p class="paragraphe"><strong> Direction technique :</strong> {{ Description.direction[0]}}, {{ Description.direction[1]}}, {{ Description.direction[2]}}, {{ Description.direction[3]}}, {{ Description.direction[4]}}</p>
            </v-container>
            <v-card-actions>
            <v-spacer></v-spacer>
              <v-dialog :retain-focus="false" v-model="edits" max-width="500" max-height="500"> 
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="ma-2" tile outlined color="success" v-on:click="details = false" @click="ModifFav">Valider</v-btn>
                  <v-btn class="ma-2" tile outlined color="success" v-bind="attrs" v-on="on" @click="MesGenres"><v-icon left>mdi-pencil</v-icon> Modifier</v-btn>
                </template>
                <v-card>
                  <v-card-title>Edit films</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field v-model='changeNom' label="Nom Film"></v-text-field>
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
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-col cols="2" id="search" v-for="film in listeFilms" v-bind:key="film.id">
        <v-card class="white--text align-end" max-width="300" max-height="500">
          <v-dialog :retain-focus="false" max-width="1200" max-height="1200">
            <template v-slot:activator="{ on, attrs }">
              <v-img v-bind:src="film.Poster" v-bind="attrs" v-on="on" style="cursor:pointer" height="350"></v-img>
              <v-card-text class="text--primary">                              
                <h6>{{ film.Titre }}</h6>
              </v-card-text>
            </template>
            <v-card>
              <v-card-title>Description du film</v-card-title>
              <v-divider></v-divider>
              <br>
              <v-container>
                <v-img v-bind:src='film.Poster' class="image" height="350" width="240"></v-img>
                <h1>{{ film.Titre }}</h1>
                {{ film.Genre[0]}}
                <br><br>
                <p class="titre"><strong> Date de Sortie : </strong>{{ film.Date }}</p>
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
  import axios from 'axios'
  import firebase from 'firebase';
  import {Base_URL, API_KEY, db} from '../config/configApp';
  
  let favoris = db.ref('ListeFilms');

  export default {
    name : 'app2', 
    
    firebase: {
      ListeFilms : favoris,
    },
    
    data () {
      return {
        nom: '',
        changeNom: '',
        modifNom: '',
        value: [],
        modif: [],
        search: false,
        edits: false,
        details: false,
        Infos: [],
        InfosGenre: [],
        InfosCast: [],
        InfosDir: [],
        Id_Genre: '',
        Genre: [],
        Favs: {
          Id: [],
          Genre_Id: [],
          Acteur: [],
          Direction: [],
          Titre: [],
          Date: [],
          Poster: [],
          Descriptif: []
        },
        Description: {
          id: '',
          genre_Id: [],
          titre: '',
          date: '',
          poster: '',
          descriptif: '',
          acteur: [],
          direction: []
        },
        lstFilms: [],
        listeFilms: [],
      }
    },

    created() {
      // J'enregistre la liste de genre dans un tableau de façon permanente pour l'application
      axios
          .get(Base_URL + 'genre/movie/list?api_key='+ API_KEY + '&language=fr')
          .then(response => (this.InfosGenre = response.data.genres))
          .catch(error => {console.log(error)})
    },

    mounted() {
      // Test sauvegarde des données en localStorage

      // console.log('App mounted!');
      // if (localStorage.getItem('lstFilms')) this.lstFilms = JSON.parse(localStorage.getItem('lstFilms'));

      console.log('Firebase chargée!');
      firebase.database().ref('/ListeFilms').once('value', snapshot => {
        this.listeFilms = snapshot.val();
      })
      console.log('ListeFilms chargée!');
    },

    watch: {
      lstFilms: {
        handler() {
          console.log('lstFilms changed!');
          localStorage.setItem('lstFilms', JSON.stringify(this.lstFilms));
        },
        deep: true,
      },
    },
  
    methods: {
      searchFilm() {
        axios
          .get(Base_URL + 'search/movie/?api_key='+ API_KEY + '&language=fr' + '&query=' + this.nom)
          .then(response => (this.Infos = response.data.results))
          .catch(error => {console.log(error)})
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
          this.Favs.Id.push(this.Infos[item]['id']);
          this.Favs.Titre.push(this.Infos[item]['title']);
          this.Favs.Genre_Id.push(this.Infos[item]['genre_ids']);
          this.modifGenre();
          this.Favs.Date.push(this.Infos[item]['release_date']);

          this.Favs.Acteur[this.Favs.Id.length - 1] = new Array();
          this.Favs.Direction[this.Favs.Id.length - 1] = new Array();
      
          castings[0].filter(acteur => this.Favs.Acteur[this.Favs.Id.length - 1].push(acteur.name));
          castings[1].filter(direction => this.Favs.Direction[this.Favs.Id.length - 1].push(direction.name));  
            
          this.Favs.Poster.push('https://image.tmdb.org/t/p/original'+ this.Infos[item]['poster_path']);
          this.Favs.Descriptif.push(this.Infos[item]['overview']);
        });
      },

      modifGenre() {
        for(let i2=0; i2 < this.Favs.Genre_Id.length; i2++) {
          this.Id_Genre = this.Favs.Genre_Id[i2];
        }

        for(let i3=0; i3 < this.Id_Genre.length; i3++) {
          if(this.Id_Genre[i3] == 27){this.Id_Genre[i3] = 'Horreur';} else if(this.Id_Genre[i3] == 28) {this.Id_Genre[i3] = 'Action';} else if(this.Id_Genre[i3] == 12) {this.Id_Genre[i3] = 'Aventure';} else if(this.Id_Genre[i3] == 16) {this.Id_Genre[i3] = 'Animation';} else if(this.Id_Genre[i3] == 35) {this.Id_Genre[i3] = 'Comedie';} else if(this.Id_Genre[i3] == 80) {this.Id_Genre[i3] = 'Crime';} else if(this.Id_Genre[i3] == 99) {this.Id_Genre[i3] = 'Documentaire';} else if(this.Id_Genre[i3] == 18) {this.Id_Genre[i3] = 'Drame';} else if(this.Id_Genre[i3] == 10751) {this.Id_Genre[i3] = 'Famille';} else if(this.Id_Genre[i3] == 14) {this.Id_Genre[i3] = 'Fantastique';} else if(this.Id_Genre[i3] == 36) {this.Id_Genre[i3] = 'Histoire';} else if(this.Id_Genre[i3] == 10402) {this.Id_Genre[i3] = 'Musique';} else if(this.Id_Genre[i3] == 9648) {this.Id_Genre[i3] = 'Mystère';} else if(this.Id_Genre[i3] == 10749) {this.Id_Genre[i3] = 'Romance';} else if(this.Id_Genre[i3] == 878) {this.Id_Genre[i3] = 'Science-Fiction';} else if(this.Id_Genre[i3] == 10770) {this.Id_Genre[i3] = 'TV-Movie';} else if(this.Id_Genre[i3] == 53) {this.Id_Genre[i3] = 'Thriller';} else if(this.Id_Genre[i3] == 10752) {this.Id_Genre[i3] = 'Guerre';} else if(this.Id_Genre[i3] == 37) {this.Id_Genre[i3] = 'Western';} 
        }
      },

      supprimerFilmFavoris(item) {
        this.Favs.Id.splice(item, 1);
        this.Favs.Titre.splice(item, 1);
        this.Favs.Genre_Id.splice(item, 1);
        this.Favs.Acteur.splice(item, 1);
        this.Favs.Direction.splice(item, 1);
        this.Favs.Poster.splice(item, 1);
        this.Favs.Date.splice(item, 1);
        this.Favs.Descriptif.splice(item, 1);
      },

      DetailFilm(item) {
        this.Description.id = this.Favs.Id[item];
        this.changeNom = this.Description.titre = this.Favs.Titre[item];
        this.Description.date = this.Favs.Date[item];
        this.Description.poster = this.Favs.Poster[item];
        this.Description.descriptif = this.Favs.Descriptif[item];
        for(var act = 0; act < 5; act++) {
          this.Description.acteur[act] = this.Favs['Acteur'][item][act];
        }
        for(var dir = 0; dir < 5; dir++) {
          this.Description.direction[dir] = this.Favs['Direction'][item][dir];
        }
        for(var gen = 0; gen < 3; gen++) {
          this.Description.genre_Id = this.Favs['Genre_Id'][item];
        }
        this.details = true;
      },

      MesGenres() {
        for(var genre=0; genre < this.InfosGenre.length ; genre++) {
          this.Genre.push(this.InfosGenre[genre]['name']);
        }
      },

      ajoutModif() {
        this.Description.genre_Id.splice(0, 3);
        this.Description.titre = "";
        this.Description.titre = this.changeNom;
        for(var i5 = 0; i5 < this.value.length; i5++) {
          this.Description.genre_Id.push(this.value[i5]);    
          this.modif = this.Description.genre_Id[0];
        }
        this.modifNom = this.changeNom;

      },

      ModifFav() {
        for(var item = 0; item < this.Favs.Id.length; item++) {
          if(this.Description.id == this.Favs.Id[item]) {
            var it = this.Favs.Id.indexOf(this.Favs.Id[item]);
            this.Favs.Genre_Id[it].splice(0, 3);
            this.Favs.Genre_Id[it].push(this.modif);
            this.Favs.Titre[it] = this.changeNom;
          }
        }
          this.value.splice(0,3);
      },

      addFilmsFirebase() {
        for (var index = 0; index < this.Favs.Id.length; index++) {
          favoris.child(this.Favs.Id[index]).set({
            Titre : this.Favs.Titre[index],
            Date : this.Favs.Date[index],
            Genre : this.Favs.Genre_Id[index],
            Poster : this.Favs.Poster[index], 
            Acteur : this.Favs.Acteur[index],
            Direction : this.Favs.Direction[index],
            Descriptif : this.Favs.Descriptif[index]
          }); 
        }
        document.location.reload(true);
      }
    }
  }
</script>

<style scoped>
  .btn_close {
    margin-left:25px;
    position:absolute;
    left: 91%;
  }

  .input {
    margin-left: 20px;
    margin-right: 20px;
  }

  #search {
    margin-left: 14px;
  }

  .titreP {
    text-align: left;
    margin-left: 7%;
    margin-bottom: -20px;
    color: grey;
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
    max-height: 80px;      /* fallback */
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  .image {
    float: left;
    margin-right: 30px;
  }

</style>