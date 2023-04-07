import {useField, useForm} from "vee-validate";
import * as yup from "yup";

export const useRequestForm = (fn) => {

  const {handleSubmit, isSubmitting} = useForm({
    initialValues: {
      name: "Artem",
      phone: "+998 (90) 175-33-65",
      amount: "1000",
      status: "active",
    }
  });
  const {value: name, errorMessage: nError, handleBlur: nBlur} = useField(
    "name",
    yup
      .string()
      .trim()
      .required("Поле обязательно для заполнения")
  );
  const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
    "phone",
    yup
      .string()
      .trim()
      .min(9, "Минимальная длина 9 символов")
      .required("Поле обязательно для заполнения")
  );
  const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
    "amount",
    yup
      .string()
      .trim()
      .min(1, "Сумма должна быть больше 0")
      .required("Поле обязательно для заполнения")
  );
  const {value: status, errorMessage: sError, handleBlur: sBlur} = useField(
    "status",
    yup
      .string()
      .trim()
      .required("Поле обязательно для заполнения")
  );
  const submit = handleSubmit(fn);
  return {
    submit,
    isSubmitting,
    name,
    nError,
    nBlur,
    phone,
    pError,
    pBlur,
    amount,
    aError,
    aBlur,
    status,
    sError,
    sBlur,
  };
};
