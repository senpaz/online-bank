import axios from 'axios';
import {error} from "@/utils/error";
const TOKEN_KEY = 'jwt-token';
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem(TOKEN_KEY)
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    }
  },
  actions: {
    async login({commit}, payload) {
      try {
        console.log(process.env.VUE_APP_FB_KEY)
        const {data} = await axios.post(URL, {...payload, returnSecureToken: true});
        console.log(data)
        commit('setToken', data?.idToken);
      } catch (e) {
        console.warn(error(e.response.data.error.message));
        //выьрасываем ошибку, чтобы ее поймать в компоненте и добавить tr y catch и делать редирент только в try
        throw new Error()
      }
    }
  },
  getters: {
    token: state => state.token,
    isAuthenticated: (_, getters) => !!getters.token
  }
}
