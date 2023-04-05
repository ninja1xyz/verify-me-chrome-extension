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

interface IInitialization {
  isCode: boolean;
  setIsCode: React.Dispatch<React.SetStateAction<boolean>>;
  setSecret?: React.Dispatch<React.SetStateAction<string>>;
}

const Initialization: React.FC<IInitialization> = ({
  isCode,
  setIsCode,
  setSecret,
}) => {
  const handleSubmit = (values: IRegister) => {
    let hash = CryptoJS.AES.encrypt(values?.password, "123").toString();
    const data = { secret: values?.secret, password: hash };
    storeData(data);
    setIsCode(false);
    setSecret && setSecret(JSON.stringify(data));
  };

  const formProps = useFormik({
    initialValues: initialValues(),
    validationSchema: validations,
    onSubmit: handleSubmit,
  });

  const codeSection = () => {
    return (
      <>
        <Typography variant="h6">Secret Code</Typography>
        <Tooltip title="Secret Code">
          <Typography variant="h6" className={classes.code}>
            {formProps?.values?.secret || ""}
          </Typography>
        </Tooltip>
        <CustomButton onClick={() => setIsCode(false)}>Next</CustomButton>
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
