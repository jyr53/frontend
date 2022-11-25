<template>
  <div>
    <v-form>
      <v-row>
        <v-col class="col-12 col-md-4">
          <v-autocomplete ref="autocompleteClient" :items="clients" item-text="Name" item-value="Id"
            :hide-no-data="true" label="Sélectionner le N° client*" :loading="clients.length <= 0" clearable
            @change="selectClient" @click:clear="removeClient" return-object required>
          </v-autocomplete>
          <v-text-field label="N° client" v-model="form.num_client" placeholder="CL.. ou 53.." color="jaune" disabled />

          <v-text-field label="Nom du contact" v-model="form.nom_contact" color="jaune" disabled />
          <v-text-field label="Téléphone du contact*" v-model="form.tel_contact" @change="handleChangeTelContact"
            color="jaune" required />

          <v-text-field label="Email du contact*" v-model="form.email_contact" color="jaune" required />
        </v-col>
        <v-col class="col-12 col-md-4">
          <fieldset class="pa-2">
            <legend>Aller</legend>
            <v-select clearable v-model="form.agence_depart_aller_id" :items="agences" :loading="agences.length <= 0"
              item-value="id" item-text="nom" label="Agence de départ*" color="jaune" required>
            </v-select>

            <v-select clearable v-model="form.agence_arrivee_aller_id" :items="agences" :loading="agences.length <= 0"
              item-value="id" item-text="nom" label="Destination*" color="jaune" required>
            </v-select>
          </fieldset>

          <fieldset class="pa-2">
            <legend>Retour</legend>
            <v-select clearable v-model="form.agence_depart_retour_id" :items="agences" :loading="agences.length <= 0"
              item-value="id" item-text="nom" label="Agence de départ" color="jaune">
            </v-select>

            <v-select clearable v-model="form.agence_arrivee_retour_id" :items="agences" :loading="agences.length <= 0"
              item-value="id" item-text="nom" label="Destination" color="jaune"> </v-select>
          </fieldset>
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-textarea label="Contenu du colis*" v-model="form.contenu" placeholder="PC, imprimantes" color="jaune"
            required />

          <v-textarea v-model="form.motif" label="Motif*" value="" color="jaune" required />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-md-4">
          <v-text-field label="Nombre de colis*" v-model="form.nb_colis" color="jaune" required />
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-text-field label="Nom et Prénom de l'expediteur*" v-model="form.expediteur" color="jaune" required />
        </v-col>
        <v-col class="col-12 col-md-4">
          <div>
            <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
              min-width="290px" color="jaune">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field :value="computedDateFormattedMomentjs" label="Date de départ*" append-icon="mdi-calendar"
                  v-bind="attrs" v-on="on" color="jaune"></v-text-field>
              </template>
              <v-date-picker v-model="form.date_depart_aller" locale="FR-fr" color="jaune"></v-date-picker>
            </v-menu>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <span><small>* Informations obligatoire</small></span>
          <div class="d-flex flex-wrap mt-4">
            <v-btn :disabled="isFormFill" class="mb-4 mr-4" outlined color="primary" small @click="submitForm">
              Valider
              <v-icon right> mdi-archive-check </v-icon>
            </v-btn>
            <v-btn class="mb-4" @click="formReset" outlined color="secondary" small>
              Réinitialiser le formulaire
              <v-icon right> mdi-backspace </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'home',
  metaInfo: {
    title: 'Transport colis inter-agences',
  },
  data() {
    return {
      form: {
        nom_contact: '',
        num_client: '',
        tel_contact: '',
        email_contact: '',
        agence_depart_aller_id: '',
        agence_arrivee_aller_id: '',
        agence_depart_retour_id: '',
        agence_arrivee_retour_id: '',
        expediteur: '',
        contenu: '',
        motif: '',
        date_depart_aller: '',
        nb_colis: 0,
      },
      agences: [],
      clients: [],
    }
  },
  computed: {

    computedDateFormattedMomentjs() {
      return this.form.date_depart_aller ? moment(this.form.date_depart_aller).format('DD[-]MM[-]YYYY') : ''
    },

    isFormFill() {
      if (
        this.form.num_client &&
        this.form.tel_contact &&
        this.form.email_contact &&
        this.form.agence_depart_aller_id &&
        this.form.agence_arrivee_aller_id &&
        this.form.contenu &&
        this.form.nb_colis &&
        this.form.expediteur &&
        this.form.date_depart_aller
      ) {
        return false
      }
      return true
    },
  },
  mounted() {
    let token = this.$auth.$storage.getState("api_token");

    // Récupération des agences pour le select/option
    axios.get(`http://localhost:8765/api/tcia/agences/list?token=${token}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        this.agences = res.data
      })
    // Récupération de la liste des clients pour le select/option
    axios.get(`https://sav.logicia.fr/osii-ace/wscustomers/list`).then((res) => {
      this.clients = res.data
    })
  },
  methods: {
    handleChangeTelContact(e) {
      this.form.tel_contact = e.replace(/\s/g, '').replace(/\D/g, '')
    },
    selectClient(e) {
      this.form.num_client = e.Id
      this.form.nom_contact = e.nom_contact
      this.form.tel_contact = e.tel_contact
      this.form.email_contact = e.email_contact
      // this.form.adresse_contact=e.adresse_contact
    },
    removeClient() {
      this.$refs.autocompleteClient.reset()
      this.form.num_client = ''
      this.form.nom_contact = ''
      this.form.tel_contact = ''
      this.form.email_contact = ''
    },
    submitForm() {
      let agenceDepartAller = this.agences.find((el) => el.id === this.form.agence_depart_aller_id)
      let agenceArriveAller = this.agences.find((el) => el.id === this.form.agence_arrivee_aller_id)

      let dataReturn = {
        forPDF: {
          expe: agenceDepartAller.nom,
          adr1: agenceDepartAller.adresse1,
          adr2: agenceDepartAller.adresse2,
          villeCP: agenceDepartAller.ville + ' ' + agenceDepartAller.cp,
          contenu: this.form.contenu,
          motif: this.form.motif,
          date_envoi: this.form.date_depart_aller,
          expediteur: this.form.expediteur,
          transporteur: agenceDepartAller.transporteur,
          destinataire: agenceArriveAller.nom,
          destinataire_adr1: agenceArriveAller.adresse1,
          destinataire_adr2: agenceArriveAller.adresse2,
          destinataire_CP_Ville: agenceArriveAller.cp + ' ' + agenceArriveAller.ville,
          telephone: this.form.tel_contact,
          idClient: this.form.num_client,
          nomClient: this.form.nom_contact,
          adresseClint: this.form.adresse,

        },
        insertTransport: {
          nom_contact: this.form.nom_contact,
          num_client: this.form.num_client,
          tel_contact: this.form.tel_contact,
          email_contact: this.form.email_contact,
          agence_depart_aller_id: this.form.agence_depart_aller_id,
          agence_arrivee_aller_id: this.form.agence_arrivee_aller_id,
          agence_depart_retour_id: this.form.agence_depart_retour_id,
          agence_arrivee_retour_id: this.form.agence_arrivee_retour_id,
          contenu: this.form.contenu,
          motif: this.form.motif,
          date_depart_aller: this.form.date_depart_aller,
          nb_colis: this.form.nb_colis,
          expediteur: this.form.expediteur,
        },
      }
      let token = this.$auth.$storage.getState("api_token");
      let url = `http://localhost:8765/api/tcia/transports/add?token=${token}`
      axios
        .post(url, dataReturn, {
          headers: {
            'Content-Type': ['application/json'],
            Accept: 'application/pdf',
            'Access-Control-Allow-Origin': '*',
          },
          responseType: 'blob',
        })
        .then((res) => {
          let blob = new Blob([res.data], { type: 'application/pdf' })
          let url = window.URL.createObjectURL(blob)
          window.open(url)
        })
        .catch((error) => {
          console.error('error')
        })
    },
    formReset(e) {
      this.removeClient()
      this.form.agence_depart_aller_id = ''
      this.form.agence_arrivee_aller_id = ''
      this.form.agence_depart_retour_id = ''
      this.form.agence_arrivee_retour_id = ''
      this.form.contenu = ''
      this.form.motif = ''
      this.form.date_depart_aller = ''
      this.form.nb_colis = 0
      this.form.expediteur = ''
    },
  },
}
</script>
<style>

</style>
