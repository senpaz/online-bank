<template>
  <form @submit.prevent="submit">
    <div class="form-control">
      <label for="name">Имя</label>
      <input
        type="text"
        id="name"
        v-model="name"
        @blur="nBlur"
      />
      <small v-if="nError" class="text-danger">{{nError}}</small>
    </div>
    <div class="form-control">
      <label for="phone">Телефон</label>
      <input
        type="tel"
        id="phone"
        v-model="phone"
        @blur="pBlur"
      />
      <small v-if="pError" class="text-danger">{{pError}}</small>
    </div>
    <div class="form-control">
      <label for="amount">Сумма</label>
      <input
        type="number"
        id="amount"
        v-model="amount"
        @blur="aBlur"
      />
      <small v-if="aError" class="text-danger">{{aError}}</small>
    </div>
    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status" @blur="sBlur">
        <option value="active">Активная</option>
        <option value="pending">Выполняется</option>
        <option value="done">Завершена</option>
        <option value="canceled">Отменена</option>
      </select>
      <small v-if="sError" class="text-danger">{{sError}}</small>
    </div>
    <button class="btn primary">Создать</button>
  </form>
</template>
<script>
import {useRequestForm} from "@/use/request-form";
import {useStore} from "vuex";

export default {
  name: "RequestModal",
  setup(props, context) {
    const store = useStore();
    const submit = async(values) => {
      try {
        await store.dispatch("request/addRequest", values);
        await context.emit("created");
      } catch (e) {}
    };
    return {
      ...useRequestForm(submit),
    };
  },
}
</script>

<style scoped>

</style>


