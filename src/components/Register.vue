<template>
    <v-dialog v-model="dialog" width="500" :retain-focus="false" v-if="loggedIn">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
                <router-link to="/" tag='span' v-if="!loggedIn"></router-link>
                <router-link to="/register" tag='span' v-else>
                    <v-icon>mdi-account-plus</v-icon>
                </router-link>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline grey lighten-2">
                Enregistrez-vous
                <v-btn icon style="position:absolute; left: 88%" v-on:keyup.esc="dialog = false" @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <register></register>
        </v-card>
    </v-dialog>
</template>

<script>
import {firebase} from "../config/configApp";
import Register from './form-auth/Form-Register';

export default {
    name: "Register",

    components: {"register" : Register},

    data() {
        return {
            loggedIn: false,
            dialog: false
        }
    },

    created() {
        firebase.auth().onAuthStateChanged((user) => {
            this.loggedIn = !!user;
            if(user) {
                this.loggedIn = false;
            } else {
                this.loggedIn = true;
            }
        })
    }
}
</script>

<style>

</style>