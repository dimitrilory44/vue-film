<template>
    <form class="col-12" style="margin: 0 auto" action="#" @submit.prevent="submit">
        <v-container class="form-group">
            <v-text-field class="input" label="Email" v-model="form.email" autofocus required placeholder="Entrer un email"></v-text-field>
        </v-container>
        <v-container class="form-group">
            <v-text-field class="input" label="Surnom" v-model="form.surnom" autofocus required placeholder="Entrer un surnom"></v-text-field>
        </v-container>
        <v-container class="form-group">            
            <v-text-field class="input" label="Password" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" v-model="form.password" @click:append="show = !show" autofocus required placeholder="Entrer un password"></v-text-field>
        </v-container>
        <v-alert type="error" v-if="error !== null" border="left" elevation="2" colored-border dismissible>{{error}}</v-alert>
        <!-- <v-container class="form-group">
            <v-btn type="submit" text color="primary" disabled>Envoyer</v-btn>
        </v-container> -->
    </form>
</template>

<script>
import {firebase} from "../../config/configApp";

export default {
    name: "register",

    data() {
        return {
            form: {
                email: "",
                surnom: "",
                password: ""
            },
            login: "",
            error: null,
            show: false
        }
    },

    methods: {
        submit() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then((result) => {
                    this.$router.replace({path : "/"});
                    console.log(this.login);
                    result.user.updateProfile({
                        displayName: this.form.surnom
                    })
                })
                
                .catch(err => {
                    this.error = err.message;
                });
        }
    }
}
</script>

<style>

</style>