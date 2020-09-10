<template>
  <v-app>
      <v-card class="overflow-hidden">
        <v-app-bar absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
          <router-link to='/' tag='span' style='cursor: pointer'>              
            <img src="./assets/pellicule.png" style="cursor:pointer; margin-left: 28px" height="40" width="40"/>
          </router-link>
          <v-toolbar-title style="text-indent:1.1em; color:grey; font-size: 25px">Videothèque</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-container style="height: 50px;"></v-container>
      </v-card>
      <v-card class="overflow-hidden">
        <v-app-bar absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
          <v-tabs fixed-tabs>
            <router-link to='/film' tag='span' style='cursor: pointer; margin-top: 33px'>
              <v-tab style="font-size: 22px; color: grey; cursor: pointer; width: 320px"><strong>Films</strong></v-tab>
            </router-link>
            <router-link to='/series' tag='span' style='cursor: pointer; margin-top: 10px"'>
              <v-tab style="font-size: 22px; color: grey; margin-top: 33px; width: 320px"><strong>Series</strong></v-tab>
            </router-link>
          </v-tabs>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="600">
          <v-container style="height: 64px;"></v-container>
        </v-sheet>
      </v-card>
    <v-main id="#app">
      <!-- <v-row> -->
        <!-- <v-col cols="2" style="border-right:2px dashed grey;">
          <Filtres/>
        </v-col>
        <v-col cols="10"> -->
          <router-view></router-view>
        <!-- </v-col>
      </v-row> -->
    </v-main>
  </v-app>
</template>

<script>
// import Filtres from './components/Filtres';

export default {
  name: 'App',

  // components: {
  //   Filtres
  // },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
  #app {
    text-align: center;
  }

</style>