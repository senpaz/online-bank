<template>
  <AppLoader v-if="loading"></AppLoader>
  <template v-else>
    <app-page v-if="request" title="Заявка" :back="true">
      <p><strong>Имя:</strong> {{request.name}}</p>
      <p><strong>Телефон:</strong> {{request.phone}}</p>
      <p><strong>Сумма:</strong> {{currency(request.amount)}}</p>
      <p><strong>Статус:</strong> <app-status :status="request.status"/></p>
      <div class="form-control">
        <label for="status">Изменить статус</label>
        <select id="status" v-model="status">
          <option value="active">Активная</option>
          <option value="pending">Выполняется</option>
          <option value="done">Завершена</option>
          <option value="canceled">Отменена</option>
        </select>
      </div>
      <button class="btn danger" @click.prevent="remove">Удалить</button>
      <button class="btn" v-if="hasChanged" @click.prevent="update">Обновить</button>
    </app-page>
    <span v-else class="text-center text-white">Заявки с ID:{{$route.params.id}} НЕТ</span>
  </template>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import currency from "@/utils/currency";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import AppPage from '@/components/ui/AppPage'
export default {
  name: "Request",
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const status = ref()
    const loading = ref(true)
    const request = ref({})
    const load = async () => {
      loading.value = true
      const get_request = computed(() => store.getters['request/requestById'](route.params.id))
      console.log(request, 'absd')
      if (get_request.value) {
        console.log('aaa')
        request.value = get_request.value
        status.value = get_request.value?.status
        loading.value = false
        return
      }
      request.value = await store.dispatch('request/requestOne', route.params.id)
      status.value = request.value?.status
      loading.value = false
    }
    onMounted(load)
    const remove = async () => {
      try {
        if(confirm('Вы уверены что хотите удалить заявку?')) {
          await store.dispatch('request/deleteRequest', route.params.id)
          await router.push('/')
        }
      } catch (e) {}
    }
    const update = async () => {
      try {
        await store.dispatch('request/update', {
          id: route.params.id,
          status: status.value
        })
        await load()
      } catch (e) {}
    }
    const hasChanged = computed(() => status.value !== request.value?.status)

    return {
      loading,
      status,
      request,
      currency,
      remove,
      hasChanged,
      update
    }
  },
  components: {
    AppPage,
    AppStatus,
    AppLoader
  },
}
</script>

<style scoped>

</style>
