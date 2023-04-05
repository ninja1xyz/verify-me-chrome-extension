import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";

import classes from "./Navbar.module.scss";
import { COLORS } from "../../constants/colors";
import CustomIconButton from "../iconButton/IconButton";
import { getData } from "../../utils/chromeService";

interface INavBar {
  isCode: boolean;
  isLogin?: boolean;
  setIsCode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogin?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<INavBar> = ({
  isCode,
  setIsCode,
  setIsLogin,
  isLogin,
}) => {
  const secret = getData();
  console.log("secret", secret);
  const Logout = () => {
    setIsLogin && setIsLogin(true);
  };

  return (
    <Box className={classes.container}>
      {isCode ? (
        <></>
      ) : (
        <>
          {!secret && (
            <CustomIconButton title="Back" onClick={() => setIsCode(true)}>
              <ArrowBackIcon sx={{ color: COLORS.white }} />
            </CustomIconButton>
          )}
        </>
      )}
      <Box className={classes.logoSection}>
        <img alt="logo" src={"./verify-me.png"} className={classes.logo} />
        <Typography variant="h6">Verify me</Typography>
      </Box>
      {secret && !isLogin && (
        <CustomIconButton title="Logout" onClick={Logout}>
          <LogoutIcon sx={{ color: COLORS.white }} />
        </CustomIconButton>
      )}
    </Box>
  );
};
export default NavBar;
