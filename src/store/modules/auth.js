const TOKEN_KEY = 'jwt-token';

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
      commit('setToken', 'test-token');
      // try {
      //   const {data} = await this.$axios.post('/api/auth/login', payload);
      //   commit('setToken', data.token);
      // } catch (e) {
      //   console.log(e);
      // }
    }
  },
  getters: {
    token: state => state.token,
    isAuthenticated: (_, getters) => !!getters.token
  }
}
