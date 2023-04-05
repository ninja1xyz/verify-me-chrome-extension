import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

import "./CustomButton.scss";

interface ICustomButton extends ButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<ICustomButton> = ({ children, ...rest }) => {
  return (
    <Button className={`customButton ${rest.className}`} {...rest}>
      {children}
    </Button>
  );
};
export default CustomButton;
