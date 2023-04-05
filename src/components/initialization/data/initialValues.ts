import { v4 as uuidv4 } from "uuid";
export interface IRegister {
  secret: string;
  password: string;
  confirmPassword: string;
}

export const initialValues = (): IRegister => {
  return {
    secret: uuidv4(),
    password: "",
    confirmPassword: "",
  };
};
