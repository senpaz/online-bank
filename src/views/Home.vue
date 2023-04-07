<template>
  <div class="home">
    <app-loader v-if="loading"/>
    <app-page title="Список заявок" v-else>
      <template #header>
        <button class="btn primary" @click="modal = true">Создать</button>
      </template>

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
import {ref, computed, onMounted} from 'vue'
import {useStore} from "vuex";
import AppPage from '@/components/ui/AppPage'
import RequestsTable from "@/components/requests/RequestTable";
import AppModal from '@/components/ui/AppModal'
import RequestModal from "@/components/requests/RequestModal";
import AppLoader from "@/components/ui/AppLoader";
export default {
  name: 'Home',
  components: {
    AppPage,
    RequestsTable,
    AppModal,
    RequestModal,
    AppLoader
  },
  setup() {
    const loading = ref(false)
    const store = useStore()
    const modal = ref(false)
    const close = () => {
      modal.value = false
    }
    const requests = computed(() => store.getters['request/requests'])
    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/fetchRequest')
      loading.value = false
    })
    return {
      modal,
      close,
      loading,
      requests
    }
  },

}
</script>
