import * as Yup from "yup";

export const validations = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
});

export interface ILogin {
  password: string;
}

export const initialValues = (): ILogin => {
  return {
    password: "",
  };
};
