<template>
  <div>
    <v-row>
      <!-- Datatables transports en cours / terminés -->
      <v-col class="col-12">
        <base-card>
          <v-card-title class="primary--text"> Transport en cours / terminés </v-card-title>
          <v-card-text>
            <Datatable title="" table="transports" />
          </v-card-text>
        </base-card>
      </v-col>
    </v-row>
    <v-row>
      <!-- Formulaire d'ajout de colis -->
      <v-col class="col-12">
        <base-card>
          <div class="shadow-none">
            <div class="d-flex justify-space-between flex-wrap align-center">
              <v-card-title class="primary--text"> Ajouter un nouveau colis </v-card-title>
            </div>
          </div>
          <v-card-text>
            <FormAddColis />
          </v-card-text>
        </base-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'home',
  metaInfo: {
    title: 'Transport colis inter-agences',
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.token,
      urlapitcia: (state) => state.config.urlapitcia,
      urlosii: (state) => state.config.urlosii,
    }),
  },
}
</script>
<style>
.expedDesti {
  /* font-weight: bold; */
  font-size: 2rem;
}
.expedDestiIntitule {
  font-weight: bold;
  color: brown;
}
.contentPDF {
  font-size: 1.5rem;
}
.contentPDFIntitule {
  text-decoration: underline;
  margin-right: 50px;
}
.background {
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
}
</style>
