import React, { useState } from "react";
import { ILogin, initialValues, validations } from "../../data/initialValues";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import CryptoJS from "crypto-js";
import { IconButton, InputAdornment, Typography, Box } from "@mui/material";
import CustomInput from "../../../customInput/CustomInput";
import { isError, isErrorMessage } from "../../../../utils/utils";
import { COLORS } from "../../../../constants/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomButton from "../../../customButton/CustomButton";
import { getData } from "../../../../utils/chromeService";

interface ILoginPage {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<ILoginPage> = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleFormSubmit = (
    values: ILogin,
    formikHelpers: FormikHelpers<ILogin>
  ) => {
    const secretData = JSON.parse(getData());
    const byte = CryptoJS.AES.decrypt(secretData?.password, "123");
    const decryptedData = byte.toString(CryptoJS.enc.Utf8);
    if (decryptedData === values.password) {
      setIsLogin(false);
    } else {
      formikHelpers?.setErrors({ password: "Password is invalid" });
    }
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const { errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: initialValues(),
    validationSchema: validations,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box component="form" onSubmit={handleSubmit} autoComplete="off">
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <CustomInput
        type={showPassword ? "text" : "password"}
        id="password"
        label="Password"
        placeholder="Password"
        helperText={
          isError("password", errors, touched)
            ? isErrorMessage("password", errors)
            : ""
        }
        error={isError("password", errors, touched)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                sx={{ marginRight: "1px" }}
                edge="end"
              >
                {showPassword ? (
                  <Visibility sx={{ color: COLORS.white }} />
                ) : (
                  <VisibilityOff sx={{ color: COLORS.white }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...getFieldProps("password")}
      />
      <CustomButton type="submit" sx={{ marginTop: "20px" }}>
        Login
      </CustomButton>
    </Box>
  );
};
export default Login;
