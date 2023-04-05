import React, { useState } from "react";
import { FormikProps } from "formik";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import classes from "./Register.module.scss";
import { IRegister } from "../../data/initialValues";
import CustomInput from "../../../customInput/CustomInput";
import CustomButton from "../../../customButton/CustomButton";
import { isError, isErrorMessage } from "../../../../utils/utils";
import { COLORS } from "../../../../constants/colors";

interface IRegisterPage {
  formProps: FormikProps<IRegister>;
}

const Register: React.FC<IRegisterPage> = ({ formProps }) => {
  const { handleSubmit, errors, touched, getFieldProps } = formProps;
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleShowPassword = (type: string, value: boolean) => {
    setShowPassword((prev) => {
      return { ...prev, [type]: !value };
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={classes.form}
      autoComplete="off"
    >
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      <CustomInput
        type={showPassword?.password ? "text" : "password"}
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
                onClick={() =>
                  handleShowPassword("password", showPassword?.password)
                }
                onMouseDown={handleMouseDownPassword}
                sx={{ marginRight: "1px" }}
                edge="end"
              >
                {showPassword?.password ? (
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

      <CustomInput
        type={showPassword?.confirmPassword ? "text" : "password"}
        id="confirmPassword"
        label="Confirm password"
        placeholder="Confirm password"
        helperText={
          isError("confirmPassword", errors, touched)
            ? isErrorMessage("confirmPassword", errors)
            : ""
        }
        error={isError("confirmPassword", errors, touched)}
        sx={{ margin: "20px 0px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() =>
                  handleShowPassword(
                    "confirmPassword",
                    showPassword?.confirmPassword
                  )
                }
                onMouseDown={handleMouseDownPassword}
                sx={{ marginRight: "1px" }}
                edge="end"
              >
                {showPassword?.confirmPassword ? (
                  <Visibility sx={{ color: COLORS.white }} />
                ) : (
                  <VisibilityOff sx={{ color: COLORS.white }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...getFieldProps("confirmPassword")}
      />

      <CustomButton type="submit" sx={{ marginTop: "20px" }}>
        Submit
      </CustomButton>
    </Box>
  );
};
export default Register;
