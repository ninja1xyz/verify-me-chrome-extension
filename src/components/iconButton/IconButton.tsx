import React from "react";
import { IconButton, Tooltip } from "@mui/material";

interface ICustomIconButton {
  onClick?: () => void;
  children: React.ReactElement;
  title: string;
}

const CustomIconButton: React.FC<ICustomIconButton> = ({
  children,
  onClick,
  title,
}) => {
  return (
    <IconButton type="button" onClick={onClick}>
      <Tooltip title={title}>{children}</Tooltip>
    </IconButton>
  );
};
export default CustomIconButton;
