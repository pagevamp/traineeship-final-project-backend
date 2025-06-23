import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empIdRegex = /^Emp\d{1,7}$/;

export const loginFormValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Employee Id / Email is required")
    .test(
      "is-valid-username",
      "Must be a valid Employee Id (e.g. Emp001) or a valid Email address",
      function (value) {
        if (!value) return false;
        const isEmail = emailRegex.test(value) && value.length <= 100;
        const isEmpId = empIdRegex.test(value) && value.length <= 10;
        return isEmail || isEmpId;
      }
    ),
  password: Yup.string().required("Password is required"),
});
