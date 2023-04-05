<template>
<div class="card">
  <h1 class="card-title">{{title}}</h1>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "AppPage",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    document.title = props.title  + ' | Bank'
  }
}
</script>

<style scoped>

</style>
