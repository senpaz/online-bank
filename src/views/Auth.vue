<template>
  <form @submit.prevent class="card">
    <h1>Войти в систему</h1>
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="Введите email">
    </div>
    <div class="form-control">
      <label for="password">Email</label>
      <input type="password" id="password" placeholder="Введите пароль">
    </div>
    <button class="btn primary" type="submit">Войти</button>
  </form>
</template>

<script>
export default {
  name: "Auth",
  setup () {

  }
}
</script>

<style scoped>

</style>
