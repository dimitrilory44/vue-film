<template>
    <v-card class="overflow-hidden" >
      <!-- Footer Links -->
  <!-- <v-container class="container-fluid text-center text-md-left"> -->

    <!-- Grid row -->
    <v-container class="row" style="margin-right:2%">

      <!-- Grid column -->
      <v-container class="col-md-6 mt-md-0">

        <!-- Content -->
        <h5 style='color:grey' class="text-uppercase">Contenu des applis de gestion</h5>
        <p style='color:grey'>Cette application de gestion de films fait parti d'un grosse appli de gestion de l'appartement</p>

      </v-container>
      <!-- Grid column -->

      <hr class="clearfix w-100 d-md-none pb-3">

      <!-- Grid column -->
      <v-container class="col-md-2 mb-md-0 mb-3">

        <!-- Links -->
        <h5 class="text-uppercase">Melodie</h5>

        <ul class="list-unstyled">
          <li>
            <a :href="lien" target="_BLANK" style='color:grey'>Videothèque</a>
          </li>
          <li>
            <a href="#!" style='color:grey'>Link 2</a>
          </li>
        </ul>

      </v-container>
      <!-- Grid column -->

      <!-- Grid column -->
      <v-container class="col-md-2 mb-md-0 mb-3">

        <!-- Links -->
        <h5 class="text-uppercase">Dimitri</h5>

        <ul class="list-unstyled">
          <li>
            <a href="#!" style='color:grey'>Link 1</a>
          </li>
          <li>
            <a href="#!" style='color:grey'>Link 2</a>
          </li>
        </ul>

      </v-container>
      <!-- Grid column -->
      <v-container class="col-md-2 mb-md-0 mb-3">

        <!-- Links -->
        <h5 class="text-uppercase">Coloc</h5>

        <ul class="list-unstyled">
          <li>
            <a href="#!" style='color:grey'>Link 1</a>
          </li>
          <li>
            <a href="#!" style='color:grey'>Link 2</a>
          </li>
        </ul>

      </v-container>

    </v-container>
    <!-- Grid row -->

  <!-- </v-container> -->
  <!-- Footer Links -->
      <v-container class="footer-copyright text-center titreBottom">© 2020 Copyright :
        <a class="titreBottom">Application réalisée par Dimitri LORY</a>
      </v-container>
    </v-card>
</template>

<script>
import {LienAppli} from '../config/configApp';

export default {
  name: 'Footer',

  data () {
    return {
      lien: LienAppli
    }
  },
  
};

</script>

<style scoped>
  #app {
    text-align: center;
  }

  #footer {
    padding-right:0;
    padding-left:0;
    padding-top:0;
  }

  .titreBottom {
    padding:20px;
    color: grey;
  }

  a {
    text-decoration: none;
    color: black!important;
  }

  a:hover {
    color: #000080!important;
  }

</style>