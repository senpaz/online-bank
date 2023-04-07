import axios from "axios";
import router from '@/router';
import store from '@/store';
const baseURL = process.env.VUE_APP_FB_REQUEST_URL;
const requestAxios = axios.create({
  baseURL
});
requestAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    store.commit('auth/logout');
    router.push('/auth?message=auth')
  }
  return Promise.reject(error);
})

export default requestAxios;
