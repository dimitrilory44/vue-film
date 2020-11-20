import {axios, moment, Base_URL, API_KEY, maListe} from '../../config/configApp';
  
export default {
    name : 'Films', 
    
    firebase: {
      ListeFilms: maListeTest
      // ListeFilms: maListeFilms
    },

    computed: {
      width () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 155
          case 'lg': return 200
        }
      },

      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'lg': return 270
        }
      },
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
          Date_Sortie: [],
          Date_Creation: [],
          Poster: [],
          Descriptif: []
        },
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
        // lstFilms: [],
        ListeFilms: [],
        bdd: true,
        erreur: "",
        success: "",
        successFav: "",
        alert: false,
        alertFav: false
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
      console.log('Firebase chargée !');
      
      // maListeFilms.child('Id').orderByChild('Titre').on('child_added', snapshot => {
      //   this.ListeFilms.push(snapshot.val());
      // })

      maListe.child('Id').orderByChild('Titre').on('child_added', snapshot => {
        this.ListeFilms.push(snapshot.val());
      })

      console.log('ListeFilms rangée !');
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
          this.Favs.Date_Sortie.push(moment(Date.parse(this.Infos[item]['release_date'])).format('DD/MM/YYYY'));
          this.Favs.Date_Creation.push(moment(Date.now()).format('DD/MM/YYYY'));

          this.Favs.Acteur[this.Favs.Id.length - 1] = new Array();
          this.Favs.Direction[this.Favs.Id.length - 1] = new Array();
      
          castings[0].filter(acteur => this.Favs.Acteur[this.Favs.Id.length - 1].push(acteur.name));
          castings[1].filter(direction => this.Favs.Direction[this.Favs.Id.length - 1].push(direction.name));  
            
          this.Favs.Poster.push('https://image.tmdb.org/t/p/original'+ this.Infos[item]['poster_path']);
          this.Favs.Descriptif.push(this.Infos[item]['overview']);

          this.alertFav = true;
          this.successFav = this.Infos[item]['title'];
        });
        
      },

      modifGenre() {
        for(let i2=0; i2 < this.Favs.Genre_Id.length; i2++) {
          this.Id_Genre = this.Favs.Genre_Id[i2];
        }

        for(let i3=0; i3 < this.Id_Genre.length; i3++) {
          if(this.Id_Genre[i3] == 27){this.Id_Genre[i3] = 'Horreur';} else if(this.Id_Genre[i3] == 28) {this.Id_Genre[i3] = 'Action';} else if(this.Id_Genre[i3] == 12) {this.Id_Genre[i3] = 'Aventure';} else if(this.Id_Genre[i3] == 16) {this.Id_Genre[i3] = 'Animation';} else if(this.Id_Genre[i3] == 35) {this.Id_Genre[i3] = 'Comedie';} else if(this.Id_Genre[i3] == 80) {this.Id_Genre[i3] = 'Crime';} else if(this.Id_Genre[i3] == 99) {this.Id_Genre[i3] = 'Biopic';} else if(this.Id_Genre[i3] == 18) {this.Id_Genre[i3] = 'Drame';} else if(this.Id_Genre[i3] == 10751) {this.Id_Genre[i3] = 'Famille';} else if(this.Id_Genre[i3] == 14) {this.Id_Genre[i3] = 'Fantastique';} else if(this.Id_Genre[i3] == 36) {this.Id_Genre[i3] = 'Histoire';} else if(this.Id_Genre[i3] == 10402) {this.Id_Genre[i3] = 'Musique';} else if(this.Id_Genre[i3] == 9648) {this.Id_Genre[i3] = 'Mystère';} else if(this.Id_Genre[i3] == 10749) {this.Id_Genre[i3] = 'Romance';} else if(this.Id_Genre[i3] == 878) {this.Id_Genre[i3] = 'Science-Fiction';} else if(this.Id_Genre[i3] == 10770) {this.Id_Genre[i3] = 'TV-Movie';} else if(this.Id_Genre[i3] == 53) {this.Id_Genre[i3] = 'Thriller';} else if(this.Id_Genre[i3] == 10752) {this.Id_Genre[i3] = 'Guerre';} else if(this.Id_Genre[i3] == 37) {this.Id_Genre[i3] = 'Western';} 
        }
      },

      supprimerFilmFavoris(item) {
        this.Favs.Id.splice(item, 1);
        this.Favs.Titre.splice(item, 1);
        this.Favs.Genre_Id.splice(item, 1);
        this.Favs.Acteur.splice(item, 1);
        this.Favs.Direction.splice(item, 1);
        this.Favs.Poster.splice(item, 1);
        this.Favs.Date_Sortie.splice(item, 1);
        this.Favs.Descriptif.splice(item, 1);
      },

      DetailFilm(item) {
        this.Description.id = this.Favs.Id[item];
        this.changeNom = this.Description.titre = this.Favs.Titre[item];
        this.Description.date_sortie = this.Favs.Date_Sortie[item];
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
          this.Genre.push("Biopic");
          this.Genre.splice(5, 1);
          this.Genre.sort();
      },

      ajoutModif() {
        this.Description.genre_Id.splice(0, 5);
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
        // for (var item = 0; item < this.Favs.Id.length; item++) {
        //   while(this.Favs.Titre[item].length == 0 || this.Favs.Date_Sortie[item].length == 0 || this.Favs.Poster[item].length == 0 || this.Favs.Genre_Id[item].length == 0 || this.Favs.Acteur[item].length == 0 || this.Favs.Direction[item].length == 0 || this.Favs.Descriptif[item].length == 0) {
        //     this.erreur = 'Un problème dans ta saisie ! En cause : un titre vide, une date de sortie manquant, pas de genre, un casting manquant, pas de synopsis ou sinon pas de poster mais dans ce cas là change de lunettes !';
        //     item++;
        //     return this.bdd = false;
        //   }
        //   maListeFilms.child('Id').child(this.Favs.Id[item]).set({
        //     Titre : this.Favs.Titre[item],
        //     Date_Sortie : this.Favs.Date_Sortie[item],
        //     Date_Creation : this.Favs.Date_Creation[item],
        //     Genre : this.Favs.Genre_Id[item],
        //     Poster : this.Favs.Poster[item], 
        //     Acteur : this.Favs.Acteur[item],
        //     Direction : this.Favs.Direction[item],
        //     Descriptif : this.Favs.Descriptif[item]
        //   }); 
        // }
        for (var item = 0; item < this.Favs.Id.length; item++) {
          while(this.Favs.Titre[item].length == 0 || this.Favs.Date_Sortie[item].length == 0 || this.Favs.Poster[item].length == 0 || this.Favs.Genre_Id[item].length == 0 || this.Favs.Acteur[item].length == 0 || this.Favs.Direction[item].length == 0 || this.Favs.Descriptif[item].length == 0) {
            this.erreur = 'Un problème dans ta saisie ! En cause : un titre vide, une date de sortie manquant, pas de genre, un casting manquant, pas de synopsis ou sinon pas de poster mais dans ce cas là change de lunettes !';
            item++;
            return this.bdd = false;
          }
          maListe.child('Id').child(this.Favs.Id[item]).set({
            Titre : this.Favs.Titre[item],
            Date_Sortie : this.Favs.Date_Sortie[item],
            Date_Creation : this.Favs.Date_Creation[item],
            Genre : this.Favs.Genre_Id[item],
            Poster : this.Favs.Poster[item], 
            Acteur : this.Favs.Acteur[item],
            Direction : this.Favs.Direction[item],
            Descriptif : this.Favs.Descriptif[item]
          }); 
        }
        document.location.reload(this.bdd);
        this.success = 'Bravo tes films ont été ajoutés avec succès à la base de données !';
        this.alert = true; 
      }
    }
}