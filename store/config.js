/* const _ = require('lodash') */
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

export const state = () => ({
  environnement: `${process.env.ENV}`,
  serverurl: process.env.URL ? `${process.env.URL}` : '',
  urlapi: process.env.URLAPI ? `${process.env.URLAPI}` : '',
  urlosii: process.env.URLOSII ? `${process.env.URLOSII}` : '',
  urlapitcia: process.env.URLAPITCIA ? `${process.env.URLAPITCIA}` : ''
})
export const mutations = {
  addenvironnement(state, environnement) {
    // console.log(`environnement: ${environnement}`)
    state.environnement = environnement
  },
  addserverurl(state, list) {
    state.serverurl = list
  },
}
