<template>
    <!-- Dialog pour la connexion/déconnexion -->
    <v-dialog v-model="dialog" width="500" :retain-focus="false">
        <template v-slot:activator="{ on, attrs }">
            <!-- Bouton de connexion pour les utilisateurs non connectés -->
            <v-btn icon v-bind="attrs" v-on="on" v-if="loggedIn">
                <router-link to="/connexion" tag='span'>
                    <v-icon>mdi-account-key</v-icon>
                </router-link>
            </v-btn>
            <!-- Bouton de déconnexion pour les utilisateurs connectés -->
            <v-btn icon v-on:click.once="loggout" v-else>
                <v-icon>mdi-account-remove</v-icon>
            </v-btn>
        </template>

        <!-- Carte contenant la fenêtre modale -->
        <v-card>
            <v-card-title class="headline grey lighten-2">
                Connectez-vous
                <!-- Bouton pour fermer le dialogue -->
                <v-btn icon style="position:absolute; left: 88%" v-on:keyup.esc="dialog = false" @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <!-- Composant de formulaire de connexion -->
            <login></login>
        </v-card>
    </v-dialog>
</template>

<script>
// Importation des dépendances nécessaires
import { firebase } from "../config/configApp";
import Login from './form-auth/Form-LogIn';

export default {
    name: "Log",

    // Déclaration du composant 'login' à utiliser dans le template
    components: { "login": Login },

    data() {
        return {
            loggedIn: false, // Etat de l'utilisateur (connecté ou non)
            dialog: false // Etat de la fenêtre modale (ouverte ou fermée)
        }
    },

    // Gestion de l'état de l'utilisateur lors de la création du composant
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            this.loggedIn = !!user; // Si un utilisateur est connecté, loggedIn est vrai, sinon faux
            if (user) {
                this.loggedIn = false; // Cette ligne fait que loggedIn est toujours faux si l'utilisateur est connecté, peut-être une erreur dans la logique
            } else {
                this.loggedIn = true; // Si aucun utilisateur n'est connecté, loggedIn est vrai
            }
        });
    },

    methods: {
        // Méthode pour se déconnecter
        loggout() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.push({ path: "/" }); // Rediriger vers la page d'accueil après la déconnexion
                document.location.reload(true); // Recharger la page pour appliquer les changements
            })
            .catch((error) => {
                this.error = error.message; // Gérer les erreurs de déconnexion
            });
        }
    }
}
</script>

<style>
/* Pas de style spécifique ici, mais vous pouvez ajouter des styles personnalisés si nécessaire */
</style>