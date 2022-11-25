<template>
  <base-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details />
    </v-card-title>
    <v-card class="pa-2" v-show="modal">
      <div>
        <v-btn small elevation="2" @click="callDataAPI">
          <v-icon color="blue-grey darken-2"> mdi-refresh </v-icon>
        </v-btn>
        <span><small>dernier rafraichissement le {{ dateLastRefreshApiCall }}</small></span><br>
        <span><small> cliker sur la ligne pour connaitre le statut du colis</small></span>
      </div>
      <v-chip-group column v-model="headersIdSelected" @change="handleChangeChipGrp" multiple
        active-class="primary--text">
        <v-chip filter outlined x-small v-for="colHead in headers" :key="colHead.value">
          {{ colHead.text }}
        </v-chip>
      </v-chip-group>

      <v-data-table  multi-sort :headers="headersSelected" :items="items" :items-per-page="itemPerPageForTable"
        class="elevation-1 table-one row-pointer" :loading="items.length <= 0" loading-text="Chargement... Veuillez patienter"
        :search="search"   @click:row="handleClickRow" :sort-desc="sortDescForTable" :sort-by="sortByForTable"
        item-key="id" :footer-props="{
          showFirstLastPage: true,
          itemsPerPageText: 'Lignes par pages',
          itemsPerPageAllText: 'Toutes',
          itemsPerPageOptions: itemsPerPageOptions,
        }">
      </v-data-table>
    </v-card>
    <v-card  class="pa-10 text-center" v-show="!modal">

      <div class="px-sm  shadow-sm primary " >
        <v-row  justify="center">
          <v-col>
            <h2 class="pa-8 white--text">STATUT DU COLIS DE {{ toggleDiag.nom_contact }}</h2>
          </v-col>
          <v-btn class="primary" @click="closePopup">
            <v-icon>mdi-close</v-icon>
          </v-btn> <br />
        </v-row>
      </div>
      <br />
      <v-table class="text-center" justify="space-between">
        <td class="pa-8">
          <h5>Contenu du colis : {{ toggleDiag.contenu }}</h5>
        </td>
        <td class="pa-8">
          <h5> le Motif de l'envoi : {{ toggleDiag.motif }}</h5>
        </td>
        <td>
          <h5>Expédié par : {{ toggleDiag.expediteur }}</h5>
        </td>
        <tr>
          <td class="pa-8">
            <h5>le colis est parti de {{ toggleDiag.agence_depart_aller_id }}</h5>
          </td>
          <td class="pa-8">
            <h5> le {{ toggleDiag.date_depart_aller }}</h5>
          </td>
        </tr>
        <tr>
          <td class="pa-8">
            <h5>le colis est arrivé à {{ toggleDiag.agence_arrivee_aller_id }}</h5>
          </td>
          <td class="pa-8">
            <h5> le {{ toggleDiag.date_arrivee_aller }}</h5>
          </td>
          <td>
            <v-btn v-if="!toggleDiag.date_arrivee_aller" @click="onButtonClick(toggleDiag)"> arrivé aller </v-btn>
          </td>
        </tr>
        <tr>
          <td class="pa-8">
            <h5>le colis est parti de {{ toggleDiag.agence_arrivee_aller_id }}</h5>
          </td>
          <td class="pa-8">
            <h5>le {{ toggleDiag.date_depart_retour }}</h5>
          </td>
          <td>
            <v-btn v-if="!toggleDiag.date_depart_retour&&toggleDiag.date_arrivee_aller" @click="onButtonClick(toggleDiag)">départ retour</v-btn><br />
          </td>
        </tr>
        <tr>
          <td class="pa-8">
            <h5>le colis est arrivé à {{ toggleDiag.agence_arrivee_retour_id }}</h5>
          </td>
          <td class="pa-8">
            <h5>le {{ toggleDiag.date_arrivee_retour }}</h5>
          </td>
          <td>
            <v-btn v-if="!toggleDiag.date_arrivee_retour&&toggleDiag.date_depart_retour" @click="onButtonClick(toggleDiag)">arrivé retour</v-btn><br />
          </td>
        </tr>
      </v-table>
    </v-card>
  </base-card>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'IndexDatatables',
  props: ['table', 'title'],

  data() {
    return {
      search: '',
      expanded: [],
      currentSearch: '',
      currentFiltersValues: [],
      dateLastRefreshApiCall: moment().format('DD[/]MM[/]YYYY [à] H:mm:ss'),
      headersIdSelected: [], // value from ship-group selected
      headersSelected: [], // selected header for table
      headersForTable: [], // All header from database
      dataForTable: [],
      itemPerPageForTable: 10,
      sortByForTable: '',
      sortDescForTable: false,
      dialog: true,
      etatColis: 0,
      toggleDiag:
      {

      }
      ,
      notifications: false,
      modal: true,
      widgets: false,
    }
  },

  created() {
    this.callDataAPI()
  },
  mounted() {
    this.headersSelected = this.headers
  },
  computed: {
    itemsPerPageOptions() {
      return [this.itemPerPageForTable, this.itemPerPageForTable * 2, this.itemPerPageForTable * 4, this.itemPerPageForTable * 10, -1]
    },
    filters() {
      const filtersList = []
      this.headersForTable.forEach((header) => {
        if (header.filterable) {
          filtersList[header.value] = []
        }
      })
      return filtersList
    },
    hasFilters() {
      return Object.keys(this.filters).length > 0
    },
    hasFiltersValues() {
      let values = false
      if (this.hasFilters && this.currentFiltersValues) {
        Object.keys(this.currentFiltersValues).forEach((filter) => {
          if (this.currentFiltersValues[filter].length > 0) {
            values = true
          }
        })
      }
      return values
    },
    searches() {
      const searchesList = []
      this.headersForTable.forEach((header) => {
        if (header.searchable) {
          searchesList.push(header.value)
        }
      })
      return searchesList
    },
    headers() {// mise en forme des entêtes du tableau
      return this.headersForTable.filter((header) => header.visible === true)
    },
    items() {//mis en forme pour le tableau de la data
      return this.dataForTable
        .filter((data) => {
          let isInData = false
          if (!this.hasFilters || !this.hasFiltersValues) {
            isInData = true
          } else {
            Object.keys(this.currentFiltersValues).forEach((filter) => {
              this.currentFiltersValues[filter].forEach((filtervalue) => {
                if (data[filter].indexOf(filtervalue) !== -1) {
                  isInData = true
                }
              })
            })
          }
          return isInData
        })
        .filter((data) => {
          let isInData = false
          if (this.currentSearch == null || this.currentSearch === '') {
            isInData = true
          } else {
            this.searches.forEach((search) => {
              if (data[search].toLowerCase().indexOf(this.currentSearch.toLowerCase()) !== -1) {
                isInData = true
              }
            })
          }
          return isInData
        })
    },
  },
  methods: {
    onButtonClick(item) {//met a jour la variable d'affichage 
      let etatc = this.etatcolis();
      if (etatc == 0) {//passe le jour d'arrivé du colis
        this.toggleDiag.date_arrivee_aller = moment().format('YYYY[-]MM[-]DD ')
      }
      if (etatc == 1) {//passe le jour du retour du colis
        this.toggleDiag.date_depart_retour = moment().format('YYYY[-]MM[-]DD ')
      }
      if (etatc == 2) {//passe le jour d'arrivé du colis chez le destinataire
        this.toggleDiag.date_arrivee_retour = moment().format('YYYY[-]MM[-]DD ')
      }
      this.save(item);
    },
    etatcolis() { //pour savoir ou  est le colis
      let valetat = 0;
      if (this.toggleDiag.date_arrivee_aller && !this.toggleDiag.date_depart_retour && !this.toggleDiag.date_arrivee_retour) {
        valetat = 1;
      }
      if (this.toggleDiag.date_arrivee_aller && this.toggleDiag.date_depart_retour && !this.toggleDiag.date_arrivee_retour) {
        valetat = 2;
      }
      if (this.toggleDiag.date_arrivee_aller && this.toggleDiag.date_depart_retour && this.toggleDiag.date_arrivee_retour) {
        valetat = 3;
      }
      return valetat;
    },
    refreshDateLastRefreshApiCall() {
      this.dateLastRefreshApiCall = moment().format('DD[/]MM[/]YYYY [à] H:mm:ss')
    },
    setterDataForTable(listeDesTransports) {
      this.dataForTable = listeDesTransports
    },
    handleChangeChipGrp() {
      this.headersIdSelected.sort((a, b) => a - b)
      this.headersSelected = this.headersIdSelected.map((el) => this.headers[el])
    },
    handleClickRow(item) {//sur le click de la ligne 
      this.toggleDiag = item; //passage des info pour la vue
      this.modal = !this.modal;//changement de vue
      window.scrollTo(0, 0);//repossition en haut de la fenètre
    },
    closePopup() { //fermeture de la fenetre
      this.modal = !this.modal;
    },
    save(item) { //appelle au back pour mettre a jour la BDD
      let dataReturn = {
        'etat': this.etatcolis()
      }

      let id = item.id
      let token = this.$auth.$storage.getState("api_token");
      let url = `http://localhost:8765/api/tcia/transports/update/${id}?token=${token}`
      axios
        .post(url, dataReturn, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }).then(function (response) {
          console.log(response);
        }).then(this.modal = !this.modal)
        .catch(function (error) {
          console.log(error);
        });
    },
    callDataAPI() {//permetde recupérer la base de données transport

      axios

        .get(`http://localhost:8765/api/tcia/transports/list?token=${this.$auth.$storage.getState("api_token")}`)
        .then((resultatRequest) => {
          this.headersForTable = resultatRequest.data.headers
          this.setterDataForTable(resultatRequest.data.items)
          this.itemPerPageForTable = resultatRequest.data.items_per_page
          this.sortByForTable = resultatRequest.data.sort_by
          this.sortDescForTable = resultatRequest.data.sort_desc
        })
        .catch((err) => {
          console.log('err callDataAPI: ', err)
        })
        .finally(() => {
          this.headersSelected = this.headers
          this.refreshDateLastRefreshApiCall()
        })
    },
  },
}
</script>
<style> 
.row-pointer > .v-data-table__wrapper > table > tbody > tr:hover {  
  cursor: pointer;
}
</style>