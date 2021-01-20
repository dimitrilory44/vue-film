<template>
    <v-container v-if="log">
        Il n'y a pas de contenu encore créé revenir sur la <router-link to="/">dashboard</router-link>
    </v-container>
    <v-container v-else></v-container>
</template>

<script>
import {firebase} from './config/configApp';

export default {
    data() {
        return {
            log: false
        }
    },

    created() {
        firebase.auth().onAuthStateChanged((user) => {
            this.loggedIn = !!user;
            if(user) {
                this.log = true;
            } else {
                this.log = false;
            }
        })
    },
}
</script>

<style>

</style>