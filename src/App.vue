<template>
  <v-app>  
    <top></top>
    <v-main id="#app">
        <br>
        <dashboard v-if="isLogged == true"></dashboard>
        <home v-else></home>
        <br>
    </v-main>
    <bottom></bottom> 
  </v-app>
</template>

<script>
// import Filtres from './components/Filtres';
import Top from './pages/common/Header';
import Bottom from './pages/common/Footer';
import Home from './pages/Home.vue';
import Dashboard from './pages/Dashboard';
import {firebase} from './config/configApp';

export default {
  name: 'App',

  data() {
    return {
      isLogged: false,
    }
  },

  components: {
    Top,
    Home,
    Dashboard,
    Bottom
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
        this.isLogged = !!user;
        if(user) {
            this.isLogged = true;
        } else {
            this.isLogged = false;
        }
    })
  },

};
</script>

<style scoped>
  
  #app {
    text-align: center;
  }

</style>