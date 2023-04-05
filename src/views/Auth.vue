<template>
  <form @submit.prevent="submitForm" class="card">
    <h1>Войти в систему</h1>
    <div :class="['form-control', {invalid: eError}]" >
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" placeholder="Введите email">
      <small v-if="eError">{{eError}}</small>
    </div>
    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Password</label>
      <input type="password" id="password" autocomplete v-model="password" placeholder="Введите пароль">
      <small v-if="pError">{{pError}}</small>
    </div>
    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">Вы слишком часто пытаетесь войти в систему. Попробуйте позже</div>
  </form>
</template>

<script>
import {useLoginForm} from "@/use/login-form";
import {useRoute} from 'vue-router'
import {useStore} from "vuex";
import {error} from "@/utils/error";

export default {
  name: "Auth",
  setup () {
    document.title = 'Авторизация'
    const route = useRoute()
    const store = useStore()
    if (route.query.message) {
      store.commit('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    return useLoginForm() // из функции возвращаем объект с данными и методами поэтому вы возвращаем просто вызов метода можем написать еще так: return { ...useLoginForm() }
  }
}
</script>

<style scoped>

</style>
