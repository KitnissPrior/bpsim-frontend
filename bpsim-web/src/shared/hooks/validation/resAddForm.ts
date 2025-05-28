import * as yup from 'yup';

export const resourceSchema = yup.object().shape({
  // type_id: yup.string()
  //   .required("Выберите тип ресурса"),
  name: yup.string()
    .required("Это поле не может быть пустым")
    .min(3, "Минимальная длина 3 символа")
    .max(50, "Максимальная длина 50 символов"),
  current_value: yup.number()
    .required("Это поле не может быть пустым"),
  // measure_id: yup.string()
  //   .required("Выберите единицу измерения")
});