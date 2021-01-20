<template>
 <v-container fluid>
     <v-switch
      v-if="utilisateur.nom === 'Admin'"
      style="margin-top: -55px; width: 136px; color: grey; text-indent:0.5em"
      inset
      v-model="switch1"
      :label="`Dev mode`"
    ></v-switch>
    <v-container fluid v-if="switch1" style="margin-top: -20px; width: 100px; margin-bottom: 10px" class="pa-4 blue-grey lighten-5 text-no-wrap rounded-pill">
      <v-btn v-on:click="show" v-if="tested" icon>
        <v-icon>mdi-test-tube</v-icon>
      </v-btn>
      <v-btn v-on:click="hide" v-else icon>
        <v-icon>mdi-test-tube-off</v-icon>
      </v-btn>|
    </v-container>
 </v-container>
</template>

<script>

import {firebase} from '../../config/configApp';

export default {
    name: "devmode",

    props: {
        ListeFilms: Array,
        ListeFilmsTest: Array,
        tested: Boolean
    },

    data() {
        return {
            switch1: false,
            utilisateur: {
                uid: "",
                nom: ""
            },
        }
    },

    created() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user !== null) {
          this.utilisateur.nom = user.displayName;
          this.utilisateur.uid = user.uid;
        }
      });
    },

    methods: {
      hide() {
        this.$emit('hide', true);
        this.ListeFilms.length = 0;
      },

      show() {
        this.$emit('show', false);
        this.ListeFilms.length = 0;
        this.ListeFilmsTest.length = 0;
      }
    }
}
</script>
<style></style>