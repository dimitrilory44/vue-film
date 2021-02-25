<template>
    <v-dialog v-model="dialog" width="500" :retain-focus="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" v-if="loggedIn">
                <router-link to="/connexion" tag='span'>
                    <v-icon>mdi-account-key</v-icon>
                </router-link>
            </v-btn>
            <v-btn icon v-on:click.once="loggout" v-else>
                <v-icon>mdi-account-remove</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline grey lighten-2">
                Connectez-vous
                <v-btn icon style="position:absolute; left: 88%" v-on:keyup.esc="dialog = false" @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <login></login>
        </v-card>
    </v-dialog>
</template>

<script>
import {firebase} from "../config/configApp";
import Login from './form-auth/Form-LogIn';

export default {
    name: "Log",

    components: {"login" : Login},

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
    },

    // mounted() {
    //     setTimeout(()=> {
    //         this.dialog = false;
    //     }, 5000)
    // },

    methods: {
        loggout() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.push({path: "/"});
                document.location.reload(true);
            })
            .catch((error) => {
                this.error = error.message;
            });
        }
    }
}
</script>

<style>

</style>