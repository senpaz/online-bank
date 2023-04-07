<template>
  <div v-if="requests.length === 0" class="text-center">Заявок пока нет</div>
  <table v-else class="table">
    <thead>
      <tr>
        <th>№</th>
        <th>Имя</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, index) in requests" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ request.name }}</td>
        <td>{{ request.phone }}</td>
        <td>{{ currency(request.amount) }}</td>
        <td><app-status :status="request.status"/></td>
        <td>
          <router-link
            :to="{ name: 'request', params: { id: request?.id } }"
            v-slot="{ navigate }"
            > <button class="btn" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import  currency  from "@/utils/currency";
import AppStatus from "@/components/ui/AppStatus";
export default {
  name: "RequestsTable",
  components: {
    AppStatus,
  },
  props: {
    requests: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {

    const showRequestDetails = (request) => {
      console.log('showRequestDetails', request)
    };
    return {
      showRequestDetails,
      currency,
    };
  },
}
</script>


<style scoped>

</style>
