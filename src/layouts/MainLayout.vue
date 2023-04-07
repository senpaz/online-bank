<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <AppMessage/>
   <router-view/>
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar.vue";
import AppMessage from "@/components/ui/AppMessage";
export default {
  name: "MainLayout",
  components: {
    TheNavbar,
    AppMessage
  }

}
</script>

<style scoped>

</style>
