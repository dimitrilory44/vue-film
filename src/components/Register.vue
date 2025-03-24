<template>
    <!-- Dialog pour l'inscription, visible uniquement si l'utilisateur est connecté -->
    <v-dialog v-model="dialog" width="500" :retain-focus="false" v-if="loggedIn">
        <template v-slot:activator="{ on, attrs }">
            <!-- Bouton qui déclenche le dialogue, avec une icône de connexion -->
            <v-btn v-bind="attrs" v-on="on" icon>
                <!-- Si l'utilisateur n'est pas connecté, il est redirigé vers la page d'accueil -->
                <router-link to="/" tag='span' v-if="!loggedIn"></router-link>
                <!-- Si l'utilisateur est connecté, il est redirigé vers la page d'enregistrement -->
                <router-link to="/register" tag='span' v-else>
                    <v-icon>mdi-account-plus</v-icon>
                </router-link>
            </v-btn>
        </template>

        <!-- Carte contenant le formulaire d'enregistrement -->
        <v-card>
            <v-card-title class="headline grey lighten-2">
                Enregistrez-vous
                <!-- Bouton pour fermer le dialogue -->
                <v-btn icon style="position:absolute; left: 88%" v-on:keyup.esc="dialog = false" @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <!-- Composant de formulaire d'enregistrement -->
            <register></register>
        </v-card>
    </v-dialog>
</template>

<script>
// Importation des dépendances nécessaires
import { firebase } from "../config/configApp";
import Register from './form-auth/Form-Register';

export default {
    name: "Register",

    // Déclaration du composant 'register' à utiliser dans le template
    components: { "register": Register },

    data() {
        return {
            loggedIn: false, // Etat de l'utilisateur (connecté ou non)
            dialog: false // Etat de la fenêtre modale (ouverte ou fermée)
        }
    },

    // Méthode appelée lorsque le composant est créé
    created() {
        // Vérifie l'état de l'utilisateur avec Firebase
        firebase.auth().onAuthStateChanged((user) => {
            this.loggedIn = !!user; // Si un utilisateur est connecté, loggedIn devient vrai, sinon faux
            // Problème logique ici : cela annule le fait d'être connecté
            if (user) {
                this.loggedIn = false; // Cette ligne rend l'utilisateur non connecté, ce qui est probablement une erreur.
            } else {
                this.loggedIn = true; // Si aucun utilisateur n'est connecté, loggedIn est mis à vrai
            }
        });
    }
}
</script>

<style>
/* Aucun style spécifique ici, mais vous pouvez ajouter des styles personnalisés si nécessaire */
</style>