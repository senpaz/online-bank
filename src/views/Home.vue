<template>
  <div class="home">
    <app-loader v-if="loading"/>
    <app-page title="Список заявок" v-else>
      <template #header>
        <button class="btn primary" @click="modal = true">Создать</button>
      </template>

      <request-filter v-model="filter"/>
      <requests-table :requests="requests"/>

      <teleport to="body">
        <app-modal title="Создать заявку" v-if="modal" @close="close">
          <RequestModal @created="close"/>
        </app-modal>
      </teleport>

    </app-page>
  </div>
</template>

<script>
import {ref, computed, onMounted, watch} from 'vue'
import {useStore} from "vuex";
import AppPage from '@/components/ui/AppPage'
import RequestsTable from "@/components/requests/RequestTable";
import RequestModal from "@/components/requests/RequestModal";
import RequestFilter from "@/components/requests/RequestFilter";
import AppModal from '@/components/ui/AppModal'
import AppLoader from "@/components/ui/AppLoader";
export default {
  name: 'Home',
  components: {
    AppPage,
    RequestsTable,
    RequestModal,
    RequestFilter,
    AppModal,
    AppLoader
  },
  setup() {
    const loading = ref(false)
    const store = useStore()
    const modal = ref(false)
    const filter = ref({})
    const close = () => {
      modal.value = false
    }
    const requests = computed(() => store.getters['request/requests']
      .filter(request => {
        if (filter.value.name) {
          return request.name.toLowerCase().includes(filter.value.name.toLowerCase())
        }
        return true
      })
      .filter(request => {
        if (filter.value.status) {
          return request.status === filter.value.status
        }
        return true
      })
    )

    onMounted(async () => {
      loading.value = true
      if (requests.value.length === 0) {
        await store.dispatch('request/fetchRequest')
      }
      loading.value = false
    })
    return {
      modal,
      filter,
      close,
      loading,
      requests
    }
  },

}
</script>
