<template>
        <!-- Container pour l'ensemble du tutoriel -->
        <v-row justify="center" style="margin-top: -30px">
            <!-- Étape 1 : Chercher un film en entrant un mot-clé -->
            <v-container fluid>
                <strong>1<sup>er</sup> étape :</strong> Chercher un film en entrant son <strong>mot-clef</strong>.
            </v-container>
            
            <!-- Image associée à la première étape -->
            <img class="tuto" src="../../../assets/ajout/search.png"/>
    
            <!-- Étape 2 : Trouver un film parmi la liste de l'API The Movie Database -->
            <v-container fluid>
                <strong>2<sup>ème</sup> étape :</strong> Trouver votre film parmi la liste proposée par l'<strong>API The Movie Database</strong>.
            </v-container>
    
            <!-- Image associée à la deuxième étape -->
            <img class="tuto" src="../../../assets/ajout/searchFilm.png"/>
    
            <!-- Étape 3 : Cliquer sur le film pour l'ajouter aux favoris -->
            <v-container fluid>
                <strong>3<sup>ème</sup> étape :</strong> Cliquer sur le film afin de l'ajouter dans <strong>la liste des favoris</strong>.
            </v-container>
    
            <!-- Image associée à la troisième étape -->
            <img class="tuto" src="../../../assets/ajout/miseFavoris.png"/>
            <img class="tuto" src="../../../assets/ajout/Favoris.png"/>
    
            <!-- Étape 4 : Accéder à la fiche détaillée du film -->
            <v-container fluid>
                <strong>4<sup>ème</sup> étape :</strong> En cliquant sur le titre vous arrivez sur une fenêtre (voir ci-dessous) avec la fiche du film. 
                Pour modifier, cliquer sur le <strong>bouton "MODIFIER"</strong>.
            </v-container>
    
            <!-- Image associée à la quatrième étape -->
            <img class="tuto" src="../../../assets/ajout/modifFavoris.png"/>
    
            <!-- Étape 5 : Modifier le nom et le genre du film -->
            <v-container fluid>
                <strong>5<sup>ème</sup> étape :</strong> Grâce à ces champs, vous pouvez modifier le nom du film et changer le genre. La modification du nom ou du genre 
                s'effectue après avoir cliqué sur le <strong>bouton "SAVE"</strong>. Recliquer ensuite sur le <strong>bouton "VALIDER"</strong> de la boîte de dialogue 
                (voir ci-dessus) pour que les modifications soient prises en compte dans la liste des favoris.
            </v-container>
    
            <!-- Image associée à la cinquième étape -->
            <img class="tuto" src="../../../assets/ajout/editModif.png"/>
    
            <!-- Étape 6 : Valider les modifications et enregistrer dans Firebase -->
            <v-container fluid>
                <strong>6<sup>ème</sup> étape :</strong> Lorsque les modifications sont réalisées, il vous suffit de <strong>VALIDER</strong> directement sur la page. 
                Le film est ajouté dans la <strong>base de données Firebase</strong>.
            </v-container>
        </v-row>
</template>
    
<script></script>
    
<style>
    /* Style personnalisé pour les images du tutoriel */
    .tuto {
        width: 100%; /* Les images prendront toute la largeur du conteneur */
        margin-bottom: 20px; /* Ajout d'un espace entre les images */
    }
</style>
    