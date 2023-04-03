import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter } from "vue-router";

export const useLoginForm = () => {
  const store = useStore();
  const router = useRouter();
  const {handleSubmit, isSubmitting, submitCount} = useForm();
  const PASSWORD_MIN_LENGTH = 6;
  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField('email',
    yup
      .string()
      .required('Введите email')
      .email('Введите корректный email')
  );
  //const passwordLength = computed(() => password.value.length);
  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password',
    yup
      .string()
      .required('Введите пароль')
      .min(PASSWORD_MIN_LENGTH, `Пароль должен быть не менее ${PASSWORD_MIN_LENGTH} символов`)
  );
  const isTooManyAttempts = computed(() => submitCount.value >= 3);
  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 2000);
    }
  });
  const submitForm = handleSubmit(async (values) => {
    console.log(values);
    await store.dispatch('auth/login', values);
    await router.push('/')
  });

  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    submitForm,
    isSubmitting,
    isTooManyAttempts
  }
}
