import { createStore, createLogger } from 'vuex'
const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}
import auth  from './modules/auth'
export default createStore({
  plugins,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})
