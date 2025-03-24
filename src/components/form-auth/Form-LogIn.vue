<template>
    <!-- Formulaire de connexion -->
    <form class="col-lg-12 col-xs-10" style="margin: 0 auto" action="#" @submit.prevent="loggin">
        
        <!-- Champ pour saisir l'email -->
        <v-container class="form-group">
            <v-text-field class="input" label="login" v-model="email" autofocus required placeholder="Entrer votre email"></v-text-field>
        </v-container>
        
        <!-- Champ pour saisir le mot de passe -->
        <v-container class="form-group">
            <v-text-field class="input" label="Password" v-model="password" autofocus required :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" placeholder="Entrer votre password"></v-text-field>
        </v-container>
        
        <!-- Affichage de l'erreur s'il y en a une -->
        <v-alert type="error" v-if="error !== null" border="left" elevation="2" colored-border dismissible>{{error}}</v-alert>
        
        <!-- Bouton pour soumettre le formulaire -->
        <v-container class="form-group">
            <v-btn type="submit" text color="primary">Se connecter</v-btn>
        </v-container>
    </form>
</template>

<script>
// Importation de Firebase pour la gestion de l'authentification
import {firebase} from "../../config/configApp";

export default {
    name: "login",  // Nom du composant

    data() {
        return {
            email: "",  // Variable pour stocker l'email
            password: "",  // Variable pour stocker le mot de passe
            error: null,  // Variable pour stocker les erreurs éventuelles
            login: "",  // Peut être utilisé pour autre chose, mais ici pas utilisé dans ce code
            show: false  // Contrôle l'affichage du mot de passe en texte clair ou masqué
        }
    },

    methods: {
        // Méthode qui gère la soumission du formulaire
        loggin() {
            // Tentative de connexion avec l'email et le mot de passe
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                // Redirige l'utilisateur vers la page d'accueil après une connexion réussie
                this.$router.replace({path: "/"});
                // alert('Bienvenue');
            })
            .catch((error) => {
                // Si une erreur se produit, elle est affichée dans la variable `error`
                this.error = error.message;
            });            
        }
    }
}
</script>

<style>
/* Style personnalisé peut être ajouté ici */
</style>
