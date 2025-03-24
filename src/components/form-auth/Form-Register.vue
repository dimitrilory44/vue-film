<template>
    <!-- Formulaire d'inscription -->
    <form class="col-12" style="margin: 0 auto" action="#" @submit.prevent="submit">
        
        <!-- Champ pour saisir l'email -->
        <v-container class="form-group">
            <v-text-field class="input" label="Email" v-model="form.email" autofocus required placeholder="Entrer un email"></v-text-field>
        </v-container>
        
        <!-- Champ pour saisir le nom -->
        <v-container class="form-group">
            <v-text-field class="input" label="Nom" v-model="form.nom" autofocus required placeholder="Entrer un nom"></v-text-field>
        </v-container>
        
        <!-- Champ pour saisir le mot de passe -->
        <v-container class="form-group">            
            <v-text-field class="input" label="Password" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" v-model="form.password" @click:append="show = !show" autofocus required placeholder="Entrer un password"></v-text-field>
        </v-container>
        
        <!-- Alerte d'erreur si un problème survient -->
        <v-alert type="error" v-if="error !== null" border="left" elevation="2" colored-border dismissible>{{error}}</v-alert>
        
        <!-- <v-container class="form-group">
            <v-btn type="submit" text color="primary" disabled>Envoyer</v-btn>
        </v-container> -->
    </form>
</template>

<script>
// Importation de Firebase pour la gestion de l'authentification
import {firebase} from "../../config/configApp";

export default {
    name: "register",  // Nom du composant

    data() {
        return {
            // Objet pour stocker les informations du formulaire
            form: {
                email: "",  // Email de l'utilisateur
                nom: "",  // Nom de l'utilisateur
                password: ""  // Mot de passe de l'utilisateur
            },
            login: "",  // Cette variable semble non utilisée dans le code
            error: null,  // Variable pour stocker les erreurs éventuelles
            show: false  // Contrôle l'affichage du mot de passe en texte clair ou masqué
        }
    },

    methods: {
        // Méthode qui gère l'inscription de l'utilisateur
        submit() {
            // Création d'un nouvel utilisateur avec l'email et le mot de passe
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then((result) => {
                    // Redirige l'utilisateur vers la page d'accueil après une inscription réussie
                    this.$router.replace({path : "/"});
                    
                    // Mise à jour du profil de l'utilisateur pour définir son nom
                    result.user.updateProfile({
                        displayName: this.form.nom
                    })
                })
                .catch(err => {
                    // En cas d'erreur, l'erreur est stockée dans la variable `error`
                    this.error = err.message;
                });
        }
    }
}
</script>

<style>
/* Style personnalisé peut être ajouté ici */
</style>