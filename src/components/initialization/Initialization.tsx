import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import CryptoJS from "crypto-js";

import classes from "./Initialization.module.scss";
import CustomButton from "../customButton/CustomButton";
import { validations } from "./data/validations";
import { IRegister, initialValues } from "./data/initialValues";
import Register from "./components/register/Register";
import { storeData } from "../../utils/chromeService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateIsCode, updateSecret } from "../../store/features/secret";

const Initialization = () => {
  const dispatch = useDispatch();
  const { isCode } = useSelector((state: RootState) => state.secret);

  const handleSubmit = (values: IRegister) => {
    let hash = CryptoJS.AES.encrypt(
      values?.password,
      process.env.REACT_APP_Secret_KEY || "test"
    ).toString();
    const data = { secret: values?.secret, password: hash };
    storeData(data);
    dispatch(updateIsCode({ isCode: false }));
    dispatch(updateSecret({ secret: JSON.stringify(data) || "" }));
  };

  const formProps = useFormik({
    initialValues: initialValues(),
    validationSchema: validations,
    onSubmit: handleSubmit,
  });
  const handleNext = () => {
    dispatch(updateIsCode({ isCode: false }));
  };

  const codeSection = () => {
    return (
      <>
        <Typography variant="h6">Secret Code</Typography>
        <Tooltip title="Secret Code">
          <Typography variant="h6" className={classes.code}>
            {formProps?.values?.secret || ""}
          </Typography>
        </Tooltip>
        <CustomButton onClick={handleNext}>Next</CustomButton>
      </>
    );
  };
  const passwordSection = () => {
    return <Register formProps={formProps} />;
  };
  return (
    <Box className={classes.container}>
      {isCode ? codeSection() : passwordSection()}
    </Box>
  );
};
export default Initialization;
