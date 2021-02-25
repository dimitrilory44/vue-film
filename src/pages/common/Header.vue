<template>
  <v-container fluid id="header">
    <v-card class="overflow-hidden" >
        <v-app-bar style="min-height: 0vh;" absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
          <router-link to='/' tag='span' style='cursor: pointer'>              
            <img src="../../assets/pellicule.png" style="cursor:pointer; margin-left: 3px" height="40" width="40"/>
          </router-link>
          <v-toolbar-title style="text-indent:1.1em; color:grey; font-size: 25px">Videothèque {{utilisateur.nom}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right offset-y v-if="logged && !isAnonymous">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-if="utilisateur.nom">mdi-cog</v-icon>
              </v-btn>
            </template>
            <v-card>
                <v-container fluid>
                    <v-card-title>Information site</v-card-title>
                    <v-divider></v-divider>
                    <v-container style="text-align:left; margin-left:5px; text-align: justify;">
                        <p><strong>API : </strong><a href="https://www.themoviedb.org/" target="_BLANK">The Movie Database</a></p> 
                        <p><strong>STOCKAGE : </strong><a href="https://firebase.google.com/" target="_BLANK">Firebase</a></p>
                        <p><strong>LIEN VERS : </strong><a :href="lien" target="_BLANK">Videothèque</a></p> 
                    </v-container>
                </v-container>
            </v-card>
          </v-menu>
          <log></log>
        </v-app-bar>
        <v-container style="height: 55px;"></v-container>
      </v-card>
      <v-card class="overflow-hidden">
        <v-app-bar absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
          <v-tabs fixed-tabs>
            <router-link to='/' tag='span' style='cursor: pointer; margin-top: 25px' v-if="!logged">
              <v-tab style="font-size: 22px; color: grey; cursor: pointer; width: 320px"><strong>Films</strong></v-tab>
            </router-link>
            <router-link to="/films" tag='span' style='cursor: pointer; margin-top: 25px' v-else>
              <v-tab style="font-size: 22px; color: grey; cursor: pointer; width: 320px"><strong>Films</strong></v-tab>
            </router-link>
            <router-link disabled to='/series' tag='span' style='cursor: pointer; margin-top: 10px"'>
              <v-tab disabled style="font-size: 22px; color: grey; margin-top: 25px; width: 320px"><strong>Series</strong></v-tab>
            </router-link>
          </v-tabs>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="600">
          <v-container style="height: 64px;"></v-container>
        </v-sheet>
      </v-card>
  </v-container>
</template>

<script>
import {API_KEY, LienAppli, firebase} from '../../config/configApp';
import Log from '../../components/Log';

export default {
  name: 'Header',

  components: {"Log": Log},

  data () {
    return {
      key: API_KEY,
      lien: LienAppli,
      utilisateur: {
          uid: "",
          nom: ""
      },
      logged: false,
      isAnonymous: false
    }
  },

   created() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user !== null) {
          this.utilisateur.nom = user.displayName;
          this.utilisateur.uid = user.uid;
          this.logged = true;
        } else {
          this.logged = false;
        }
        if(user.displayName === null) {
          this.isAnonymous = true;
        }
      })
  },
  
};

</script>

<style scoped>
  #app {
    text-align: center;
  }

  #header {
    padding-right:0;
    padding-left:0;
    padding-top:0;
  }

  a {
    text-decoration: none;
    color: black!important;
  }

  a:hover {
    color: #000080!important;
  }

</style>