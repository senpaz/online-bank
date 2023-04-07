import { createStore, createLogger } from 'vuex'
import auth  from './modules/auth'
import request from "@/store/modules/request";
const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}
export default createStore({
  plugins,
  state: {
    message: null
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 5000)
    }
  },
  getters: {
    message: state => state.message
  },
  modules: {
    auth,
    request
  }
})
