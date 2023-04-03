<template>
  <component :is="`${layout}-layout`" v-if="layout"></component>
  <h1 v-else>
    No layout found or Loading...
  </h1>
</template>

<script>
import {useRoute} from 'vue-router';
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { computed } from "vue";
export default {
  name: "App",
  setup() {
    const route = useRoute();

    const layout = computed(() => route.meta.layout)

    return {
      layout
    }
  },
  components: {
    MainLayout,
    AuthLayout
  }
}
</script>
