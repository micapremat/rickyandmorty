import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCharacters: [],
    search: ''
  },
  mutations: {
    setAllCharacters (state, value) {
      state.allCharacters = value
    },
    setSearch (state, value) {
      state.search = value
    }
  },
  getters: {
    getAllCharacters (state) {
      return state.allCharacters
    },
    getSearch (state) {
      return state.search
    }
  },
  actions: {
  },
  modules: {
  }
})
