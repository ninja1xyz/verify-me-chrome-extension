import React from "react";
import { TextFieldProps, TextField } from "@mui/material";

import "./CustomInput.scss";

const CustomInput: React.FC<TextFieldProps> = ({ ...rest }) => {
  return (
    <TextField
      variant="standard"
      className={`customInput ${rest.className}`}
      {...rest}
    />
  );
};
export default CustomInput;
