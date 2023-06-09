import axios from "@/axios/request";
import store from "@/store";
import {error} from "@/utils/error";
export default {
  namespaced: true,
  state: {
    requests: []
  },
  mutations: {
    setRequest(state, payload) {
      state.requests = payload
    },
    addRequest(state, payload) {
      state.requests.push(payload)
    },
    deleteRequest(state, payload) {
      state.requests = state.requests.filter(item => item.id !== payload)
    },
    updateRequest(state, {id, ...payload}) {
      console.log('update Mutation', id, payload)
      state.requests = state.requests.map(item => {
        if (item.id === id) {
          return {...item, ...payload}
        }
        return item
      })
    }
  },
  actions: {
    async addRequest({commit, dispatch}, payload) {
      const token = store.getters['auth/token'];
      try {
        const {data} = await axios.post(`/requests.json?auth=${token}`, payload);
        console.log(data, 'data')
        commit('addRequest', {...payload, id: data.name});
        dispatch('setMessage', {
          value: 'Заявка успешно создана',
          type: 'primary'
        }, {root: true});
      } catch (e) {
        console.log(e)
        dispatch('setMessage', {value: e.response.statusText, type: 'danger'}, {root: true});
        throw new Error()
      }
    },
    async fetchRequest({commit, dispatch}) {
      const token = store.getters['auth/token'];
      try {
        const {data} = await axios.get(`/requests.json?auth=${token}`);
        const requests = Object.keys(data).map(id => ({...data[id], id}));
        commit('setRequest', requests);
      } catch (e) {
        dispatch('setMessage', {value: error(e.response.data.error.message), type: 'danger'}, {root: true});
        throw new Error()
      }
    },
    async requestOne({commit, dispatch}, id) {
      const token = store.getters['auth/token'];
      try {
        const {data} = await axios.get(`/requests/${id}.json?auth=${token}`);
        return data
      } catch (e) {
        dispatch('setMessage', {value: error(e.response.data.error.message), type: 'danger'}, {root: true});
        throw new Error()
      }
    },
    async deleteRequest({commit, dispatch}, id) {
      commit('deleteRequest', id);
      try {
        const token = store.getters['auth/token'];
        await axios.delete(`/requests/${id}.json?auth=${token}`);
        dispatch('setMessage', {value: 'Заявка успешно удалена', type: 'primary'}, {root: true});
      } catch (e) {
        dispatch('setMessage', {value: error(e.response.data.error.message), type: 'danger'}, {root: true});
        throw new Error()
      }
    },
    async update({commit, dispatch}, {id, ...payload}) {
      commit('updateRequest' , {id, ...payload});
      try {
        const token = store.getters['auth/token'];
        await axios.patch(`/requests/${id}.json?auth=${token}`, payload);
        dispatch('setMessage', {value: 'Заявка успешно обновлена', type: 'primary'}, {root: true});
      } catch (e) {
        dispatch('setMessage', {value: error(e.response.data.error.message), type: 'danger'}, {root: true});
        throw new Error()
      }
    }
  },
  getters: {
    requests: state => state.requests,
    requestById: state => id => state.requests.find(item => item.id === id)
  }
}
