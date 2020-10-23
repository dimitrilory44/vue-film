<template>
  <v-app>  
    <top></top>
    <v-main id="#app">
      <!-- <v-row>
        <v-col cols="2" style="border-right:2px dashed grey;">
          <Filtres/>
        </v-col>
        <v-col cols="10"> -->
        <br>
        <router-view></router-view>
        <!-- </v-col>
      </v-row> -->
    </v-main>
  </v-app>
</template>

<script>
// import Filtres from './components/Filtres';
import Top from './components/Header';

export default {
  name: 'App',

  components: {
    // Filtres,
    Top
  },
};
</script>

<style scoped>
  #app {
    text-align: center;
  }

</style>