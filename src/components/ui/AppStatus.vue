<template>
<span :class="['badge', className]">{{text}}</span>
</template>

<script>
import { computed } from 'vue'
export default {
  name: "AppStatus",
  props: {
    status: {
      type: String,
      default: 'active'
    }
  },
  setup(props){
    const classesMap = {
      active: 'primary',
      canceled: 'danger',
      done: 'primary',
      pending: 'warning'
    }
    const textsMap = {
      active: 'Активная',
      canceled: 'Отменена',
      done: 'Завершена',
      pending: 'Выполняется'
    }
    const className = computed(() => classesMap[props.status])
    const text = computed(() => textsMap[props.status])

    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>
