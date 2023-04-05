import * as Yup from "yup";

export const validations = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must have 8 characters")
    .required("Please enter a valid password")
    .test("isValidPass", "Must have UpperCase Letter", (value, context) => {
      const hasUpperCase = /[A-Z]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 1;
      const conditions = [hasUpperCase];
      conditions.forEach((condition) => (condition ? validConditions++ : null));
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    })
    .test("isValidPass", "Must have LowerCase Letter", (value, context) => {
      const hasLowerCase = /[a-z]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 1;
      const conditions = [hasLowerCase];
      conditions.forEach((condition) => (condition ? validConditions++ : null));
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    })
    .test("isValidPass", "Must have Numbers", (value, context) => {
      const hasNumber = /[0-9]/.test(value);

      let validConditions = 0;
      const numberOfMustBeValidConditions = 1;
      const conditions = [hasNumber];
      conditions.forEach((condition) => (condition ? validConditions++ : null));
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    })
    .test("isValidPass", "Must have Symbol", (value, context) => {
      const hasSymbole = /[!@#%&]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 1;
      const conditions = [hasSymbole];
      conditions.forEach((condition) => (condition ? validConditions++ : null));
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords does not match")
    .min(8, "Password must have 8 characters")
    .required("Please enter a valid password"),
});
