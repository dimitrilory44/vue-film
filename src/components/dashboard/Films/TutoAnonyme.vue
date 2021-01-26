<template>
    <v-row justify="center" style="margin-top: -30px">
            <!-- <p style="width: 100%">Vous êtes en anomyme</p> -->
        <v-container fluid>
            <strong>1<sup>er</sup> étape :</strong> Chercher un film en entrant son <strong>mot-clef</strong>.
        </v-container>
        <img class="tuto" src="../../../assets/ajout/search.png"/>
        <v-container fluid>
                <strong>2<sup>ème</sup> étape :</strong> Trouver votre film parmi la liste proposée par l'<strong>API The Movie Database</strong>.
        </v-container>
        <img class="tuto" src="../../../assets/ajout/searchFilm.png"/>
        <v-container fluid>
                <strong>3<sup>ème</sup> étape :</strong> Cliquer sur le film afin de l'ajouter dans <strong> la liste des favoris</strong>.
        </v-container>
        <img class="tuto" src="../../../assets/ajout/miseFavoris.png"/>
        <img class="tuto" src="../../../assets/ajout/Favoris.png"/>
        <v-container fluid>
                <strong>4<sup>ème</sup> étape :</strong> En cliquant sur le titre vous arrivez sur une fenêtre (voir ci-dessous) avec la fiche du film. Pour modifier, cliquer sur le <strong>bouton "MODIFIER"</strong>.
        </v-container>
        <img class="tuto" src="../../../assets/ajout/modifFavoris.png"/>
        <v-container fluid>
                <strong>5<sup>ème</sup> étape :</strong> Grace à ces champs, vous pouvez modifier le nom du film et changer le genre. La modification du nom ou du genre s'effectue après avoir cliquer sur le <strong>bouton "SAVE"</strong>. Recliquer ensuite sur le <strong>bouton "VALIDER"</strong> de la boite de dialogue (voir ci-dessus) pour que les modifications soient prise en compte dans la liste des favoris.
        </v-container>
        <img class="tuto" src="../../../assets/ajout/editModif.png"/>
        <v-container fluid>
                <strong>6<sup>ème</sup> étape :</strong> Lorsque les mofications sont réalisées il vous suffit de <strong>VALIDER</strong> directement sur la page. Le film est ajouté dans la <strong>base de donnée Firebase</strong>.
        </v-container>
    </v-row>
</template>

<script>
export default {

}
</script>

<style>

</style>