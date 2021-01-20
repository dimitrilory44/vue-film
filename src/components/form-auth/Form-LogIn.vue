<template>
    <form class="col-lg-12 col-xs-10" style="margin: 0 auto" action="#" @submit.prevent="loggin">
        <v-container class="form-group">
            <v-text-field class="input" label="login" v-model="email" autofocus required placeholder="Entrer votre email"></v-text-field>
        </v-container>
        <v-container class="form-group">
            <v-text-field class="input" label="Password" v-model="password" autofocus required :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' :      'mdi-eye-off'" @click:append="show = !show" placeholder="Entrer votre password"></v-text-field>
        </v-container>
        <v-alert type="error" v-if="error !== null" border="left" elevation="2" colored-border dismissible>{{error}}</v-alert>
        <v-container class="form-group">
            <v-btn type="submit" text color="primary">Se connecter</v-btn>
        </v-container>
    </form>
</template>

<script>
import {firebase} from "../../config/configApp";

export default {
    name: "login",

    data() {
        return {
            email: "",
            password: "",
            error: null,
            login: "",
            show: false
        }
    },

    methods: {
        loggin() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$router.replace({path: "/"});
                // alert('Bienvenue');
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