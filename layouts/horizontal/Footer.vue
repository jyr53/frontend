<template>
  <v-footer tile flat class="font-weight-medium shadow-md -mt-20" :color="$vuetify.theme.dark ? 'dark' : 'primary'"
    :dark="$vuetify.theme.dark" :inset="true">
    <v-container class="white--text">
      <v-row class="mt-20">
        <v-col cols="12" md="4">
          <span class="nomAdresse">LOGICIA INFORMATIQUE</span>
          <div>
            <p>Parc technopole de Changé<br />53000 LAVAL</p>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <v-row align="center" class="" justify="center">
            <v-col cols="1">
              <v-icon class="chip" color="darken-2"> mdi-phone </v-icon>
            </v-col>
            <v-col cols="11" class="">
              <span> Tél. 02 43 69 90 05 </span>
            </v-col>
          </v-row>
          <v-row align="center" class="" justify="center">
            <v-col cols="1">
              <v-icon class="chip" color="darken-2"> mdi-hammer-screwdriver </v-icon>
            </v-col>
            <v-col cols="11" class="telephone">
              <span> Tél. 02 43 69 90 00 </span>
            </v-col>
          </v-row>
          <v-row align="center" class="" justify="center">
            <v-col cols="1">
              <v-icon class="chip" color="darken-2"> mdi-email </v-icon>
            </v-col>
            <v-col cols="11" class="">
              <span> contact@logicia.fr </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4" class="">
          <p class="body-2">Réseaux sociaux</p>
          <p>Suivez nos actualités également sur nos réseaux sociaux</p>
          <div>
            <v-btn class="mx-2" fab dark x-small color="#3765c9" href="https://fr-fr.facebook.com/LogiciaInformatique/">
              <v-icon small dark>mdi-facebook</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark x-small color="#3765c9" href="https://www.instagram.com/logicia_informatique/">
              <v-icon small dark>mdi-instagram</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark x-small color="#039ff5"
              href="https://www.linkedin.com/company/logicia-informatique">
              <v-icon small dark>mdi-linkedin</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12" md="12">
          <p class="grey--text text--lighten-2">Réalisé par <a class="grey--text text--lighten-2 font-weight-medium"
              href="https://www.logicia.fr/">Logicia Informatique</a></p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<style>
.nomAdresse {
  font-size: 1.2rem;
}



.chip {
  padding: 5px;
  margin-right: 10px;
  background-color: #1d6b9c;
  border-radius: 50%;
  color: hsla(204, 48%, 61%, 0);
}
</style>
