<template>
  <v-container fluid>
    <v-alert v-if="erreur.length == 0 && alert == true" type="success">{{success}}</v-alert>
    <v-alert v-else-if="erreur.length != 0 && alert == false" type="error">{{erreur}}</v-alert>
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
          <v-alert v-if="alertFav == true" dismissible color="green" border="left" elevation="2" colored-border icon="mdi-bookmark">Le film <strong>{{successFav}}</strong> a été ajouté dans tes favoris</v-alert>
          <v-text-field class="input" v-model="nom" autofocus color="orange" label="Entrez film" required :append-outer-icon="nom ? 'mdi-send' : ''" v-on:keyup.enter="searchFilm"></v-text-field>
          <br>
          <v-row justify="center">
            <v-col lg="2" md="4" sm="4" xs="12" id="search" v-for="(info,index) in Infos" v-bind:key="info.id" v-bind:item="info" v-bind:index="index">
              <v-card class="white--text align-end choix" max-width="130" max-height="500">
                <v-img tabindex="0" v-bind:src="'https://image.tmdb.org/t/p/original' + info.poster_path" style="cursor:pointer" height="180" width="350" v-on:keyup.enter="ajoutFilmFavoris(index)" @click ="ajoutFilmFavoris(index)"></v-img>
                  <v-card-text class="text--primary">                              
                    {{info.original_title}}
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
                <th scope="col">Genre</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="(fav, index) in Favs.Id" v-bind:key="fav" v-bind:item="fav" v-bind:index="index">
              <tr>
                <th scope="row" tabindex="0">{{ index + 1 }}</th>
                <td v-bind="attrs" v-on="on" tabindex="0" v-on:keyup.enter="DetailFilm(index)" @click="DetailFilm(index)">{{ Favs.Titre[index] }}</td>
                <td scope="row" tabindex="0" v-if="Favs.Genre_Id[index].length > 1">{{ Favs.Genre_Id[index][0] }}, {{ Favs.Genre_Id[index][1] }}, {{ Favs.Genre_Id[index][2] }}</td>
                <td scope="row" tabindex="0" v-else>{{ Favs.Genre_Id[index][0] }}</td>
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
            <v-btn icon style="position:absolute; left: 88%" v-on:keyup.esc="details = false" @click="details = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-container>
            <v-img v-bind:src='Description.poster' class="image" height="370" width="340"></v-img>
            <h1>{{ Description.titre }}</h1>
            <a v-if="Description.genre_Id.length > 1">{{ Description.genre_Id[0]}}, {{ Description.genre_Id[1]}}, {{ Description.genre_Id[2]}}</a>
            <a v-else>{{ Description.genre_Id[0]}}</a>
            <br><br>
            <p class="titre"><strong> Date de Sortie : </strong>{{ Description.date_sortie }}</p>
            <p class="paragrapheD"><strong> Synopsis : </strong>{{ Description.descriptif }}</p>
            <v-container v-if="Favs.Acteur.length != 0">
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
      <v-col lg="2" md="3" sm="4" xs="12" id="search" v-for="(film, index) in ListeFilms" v-bind:key="film.id" v-bind:index="index">
        <v-card class="white--text align-end" :width="width" max-height="500">
          <v-dialog :retain-focus="false" max-width="1200" max-height="1200">
            <template v-slot:activator="{ on, attrs }">
              <v-img v-bind:src="film.Poster" v-bind="attrs" v-on="on" style="cursor:pointer" :height="height"></v-img>
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
  </v-container>
</template>

<script src="./js/Films.js"></script>
<style src="../assets/css/style.css"></style>