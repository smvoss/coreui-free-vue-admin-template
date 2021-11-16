import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    currentReport: {}
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setReport(state, payload) {
      console.log("updating the store with a new report")
      state.currentReport = payload
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState()
  ]
})
