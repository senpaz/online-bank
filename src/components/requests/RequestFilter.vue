<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Начните писать имя" v-model="name">
    </div>
    <div class="form-control">
      <select v-model="status">
        <option value="active">Активные</option>
        <option value="done">Завершенные</option>
        <option value="pending">Выполняется</option>
        <option value="canceled">Отмененные</option>
      </select>
    </div>
    <button class="btn warning" v-if="isFilterActive" @click="reset">Очистить</button>
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue'
export default {
  name: "RequestFilter",
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, {emit}) {
    const name = ref('')
    const status = ref()
    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })
    const isFilterActive = computed(() => name.value || status.value)
    return {
      name,
      status,
      isFilterActive,
      reset: () => {
        name.value = ''
        status.value = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
