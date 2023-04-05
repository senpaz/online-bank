<template>
<div :class="['alert', message.type]" v-if="message">
  <p class="alert-title" v-if="title">{{  title }}</p>
  <p>{{ message.value}}</p>
  <span class="alert-close" @click="close">&times;</span>
</div>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "AppMessage",
  setup () {
    const store = useStore()
    const TITLE_MAP = {
      danger: 'Ошибка',
      success: 'Успех',
      warning: 'Предупреждение'
    }
    const message = computed(() => store.getters['message'])
    // const classes = computed(() => {
    //   return {
    //     'alert': true,
    //     'danger': message.value.type === 'error',
    //     'success': message.value.type === 'success',
    //     'warning': message.value.type === 'warning',
    //   }
    // })
    const title = computed(() => TITLE_MAP[message.value.type])
    const close = () => {
      store.commit('clearMessage')
    }
    return {message, close, title}
  }
}
</script>

<style scoped>

</style>
