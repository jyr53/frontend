import axios from 'axios'

const state = () => ({
  list: [],
})
const mutations = {
  addList(state, params) {
    state.list.push(params)
  },
  setList(state, params) {
    state.list[0] = params
  },
  clearList(state) {
    state.list = []
  },
  replaceValue(state, params) {
    state.list[0].items.find((item) => item.serveur_id === params.id)[params.search] = params.modified
  },
}
const getters = {
  getList: (state) => {
    console.log('list from store: ', state.list);
    if (state.list.length > 0) {
      return state.list[0]
    } else {
      return []
    }
  },
}
const actions = {
  async get({ commit, rootState }, params) {
    commit('clearList')
    // let url;
    /*if (process.env.URL) url = `${process.env.URL}/api/${params.table}/all`;
    else {
      url = `/api/${params.table}/all`;
    }*/

    // url = `${process.env.URLAPITCIA}/${params.table}/list?api_key=WRgFvUVCXW6tDAaF8U7qQCbSEpk5J23dH3Cqe5zadmin`;
    // url = `http://localhost/sav-demo-logicia/api/${params.table}/list?api_key=WRgFvUVCXW6tDAaF8U7qQCbSEpk5J23dH3Cqe5zadmin`;
    console.error('get datatable')
    await axios
      //.get(`http://localhost:8765/api/tcia/transports/list?token=${context.$auth.$storage.getState("api_token")}`,{
      .get(`${this.app.$config.baseURLAPI}${params.table}/list?token=${context.$auth.$storage.getState("api_token")}`, {
        headers: {
          Authorization: `${rootState.$auth.api_token}`,
        },
      })
      // .get(url)
      .then((response) => {
        response.data.tablename = params.table
        commit('setList', response.data)
      })
      .catch((error) => {
        console.error(`Error: ${error}`)
      })
  },

  async increaseEtat({ state, rootState, dispatch }, params) {
    console.log('data', baseURLAPI);
    let url = `${process.env.URLAPITCIA}${params.table}${params.transportID}?token=${rootState.auth.token}`
    // let url = `http://localhost/sav-demo-logicia/api/transports/increaseEtat/${params}?api_key=WRgFvUVCXW6tDAaF8U7qQCbSEpk5J23dH3Cqe5zadmin`;
    await axios
      .get(
        url,
        {
          id: params,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log('stats.list: ', state.list)
        dispatch('get', { table: 'transports' })
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  },
}
