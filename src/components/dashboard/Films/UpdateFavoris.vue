<template>
    <!-- Conteneur principal qui affiche les détails du film -->
    <v-container fluid>
        <!-- Titre de la carte avec un bouton pour fermer la vue -->
        <v-card-title>
            <!-- Bouton pour fermer la vue des favoris -->
            <v-btn icon class="closeSearch" style="position:absolute; " @click="closeFavoris">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        
        <!-- Affichage des informations du film -->
        <v-container fluid>
            <!-- Affichage de l'image du film -->
            <v-img v-bind:src='Description.poster' class="image" height="370" width="340"></v-img>
            
            <!-- Affichage du titre du film -->
            <h1>{{ Description.titre }}</h1>
            
            <!-- Affichage des genres du film, avec une condition pour afficher les genres si plus de 1 -->
            <a v-if="Description.genre_Id.length > 1">{{ Description.genre_Id[0]}}, {{ Description.genre_Id[1]}}, {{ Description.genre_Id[2]}}</a>
            <a v-else>{{ Description.genre_Id[0]}}</a>
            
            <br><br>
            
            <!-- Affichage de la date de sortie du film -->
            <p class="titre"><strong> Date de Sortie : </strong>{{ Description.date_sortie }}</p>
            
            <!-- Affichage du synopsis du film -->
            <p class="paragrapheD"><strong> Synopsis : </strong>{{ Description.descriptif }}</p>
            
            <!-- Affichage des acteurs et de la direction technique si présents -->
            <v-container v-if="favs.Acteur.length != 0">
                <p class="paragraphe"><strong> Acteurs principaux :</strong> {{ Description.acteur[0]}} , {{ Description.acteur[1]}} , {{ Description.acteur[2]}} , {{ Description.acteur[3]}} , {{ Description.acteur[4]}}</p>
                <p class="paragraphe"><strong> Direction technique :</strong> {{ Description.direction[0]}}, {{ Description.direction[1]}}, {{ Description.direction[2]}}, {{ Description.direction[3]}}, {{ Description.direction[4]}}</p>
            </v-container>

            <!-- Section des actions de la carte, incluant les boutons pour modifier ou valider les favoris -->
            <v-card-actions>
                <v-spacer></v-spacer>
                
                <!-- Dialogue de modification des favoris, activé par les boutons -->
                <v-dialog :retain-focus="false" v-model="edits" max-width="500" max-height="700"> 
                    <template v-slot:activator="{ on, attrs }">
                        <!-- Bouton pour valider la modification -->
                        <v-btn class="ma-2" tile outlined color="success" v-on:click="details = false" @click="ModifFav">Valider</v-btn>
                        
                        <!-- Bouton pour modifier le film -->
                        <v-btn class="ma-2" tile outlined color="success" v-bind="attrs" v-on="on" v-on:click.once="MesGenres">
                            <v-icon left>mdi-pencil</v-icon> Modifier
                        </v-btn>
                    </template>
                    
                    <!-- Card contenant le formulaire d'édition -->
                    <v-card>
                        <v-card-title>Edit films</v-card-title>
                        <v-divider></v-divider>
                        
                        <!-- Formulaire de modification des informations du film -->
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <!-- Champ de texte pour modifier le nom du film -->
                                        <v-text-field v-model='change' label="Nom Film"></v-text-field>
                                        
                                        <!-- Sélecteur de genre pour modifier les genres du film -->
                                        <v-select v-model="value" :items="Genre" label="Genre Film" chips multiple></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                            
                            <!-- Actions pour annuler ou enregistrer la modification -->
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="edits = false">Cancel</v-btn>
                                <v-btn color="blue darken-1" text v-on:click="edits = false" v-on:keyup.enter="ajoutModif" @click="ajoutModif">Save</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-card-actions>
            <v-divider></v-divider>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: "description",

    // Définition des props reçues dans ce composant
    props: {
        Description: {type: Object, required: true},  // Les informations du film à afficher
        favs: {type: Object, required: true},         // Les favoris de l'utilisateur
        genre: {type: Array, required: true},         // La liste des genres disponibles
        change: {type: String, required: true},       // Le nom modifié du film
        update: {type: Boolean, required: true}       // Indicateur pour savoir si une mise à jour est requise
    },

    data() {
        return {
            modif: [], // Liste des genres modifiés
            modifNom: '', // Nouveau nom du film
            details: false, // Variable pour afficher ou non les détails
            edits: false,   // Variable pour contrôler l'activation de l'éditeur
            value: [],      // Valeur des genres sélectionnés
            Genre: []       // Liste des genres à afficher dans le sélecteur
        }
    },

    methods: {
        // Méthode pour fermer la fenêtre des favoris
        closeFavoris() {this.$emit('close', false);},

        // Méthode pour récupérer les genres disponibles et les préparer pour l'édition
        MesGenres() {
            for(var genre=0; genre < this.genre.length ; genre++) {
                this.Genre.push(this.genre[genre]['name']);
            }
            this.Genre.push("Biopic");
            this.Genre.splice(5, 1); // Retirer un genre supplémentaire
            this.Genre.sort(); // Trier les genres
        },

        // Méthode pour ajouter les modifications de nom et de genre
        ajoutModif() {
            this.Description.genre_Id.splice(0, 5); // Réinitialiser les genres existants
            this.Description.titre = this.change;   // Mettre à jour le titre
            for(var i5 = 0; i5 < this.value.length; i5++) {
                this.Description.genre_Id.push(this.value[i5]); // Ajouter les nouveaux genres
                this.modif = this.Description.genre_Id[0]; // Conserver le premier genre comme référence
            }
            this.modifNom = this.change; // Conserver le nom modifié
        },

        // Méthode pour valider la modification dans la liste des favoris
        ModifFav() {
            for(var item = 0; item < this.favs.Id.length; item++) {
                if(this.Description.id == this.favs.Id[item]) {
                    var it = this.favs.Id.indexOf(this.favs.Id[item]);
                    this.favs.Genre_Id[it].splice(0, 3); // Réinitialiser les genres dans les favoris
                    this.favs.Genre_Id[it].push(this.modif); // Ajouter le genre modifié
                    this.favs.Titre[it] = this.change; // Mettre à jour le titre dans les favoris
                }
            }
            this.value.splice(0,3); // Réinitialiser la sélection de genres
            this.$emit('close', false); // Fermer la vue après modification
        },
    }
}
</script>

<style>
/* Aucun style personnalisé n'est ajouté ici */
</style>
