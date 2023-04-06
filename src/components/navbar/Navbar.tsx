import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";

import classes from "./Navbar.module.scss";
import { COLORS } from "../../constants/colors";
import CustomIconButton from "../iconButton/IconButton";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateIsCode, updateIsLogin } from "../../store/features/secret";

const NavBar = () => {
  const dispatch = useDispatch();
  const {
    isCode,
    isLogin,
    secret: secretKey,
  } = useSelector((state: RootState) => state.secret);

  const Logout = () => {
    dispatch(updateIsLogin({ isLogin: true }));
  };
  const handleBack = () => {
    dispatch(updateIsCode({ isCode: true }));
  };
  return (
    <Box className={classes.container}>
      {isCode ? (
        <></>
      ) : (
        <>
          {!secretKey && (
            <CustomIconButton title="Back" onClick={handleBack}>
              <ArrowBackIcon sx={{ color: COLORS.white }} />
            </CustomIconButton>
          )}
        </>
      )}
      <Box className={classes.logoSection}>
        <img alt="logo" src={"./verify-me.png"} className={classes.logo} />
        <Typography variant="h6">Verify me</Typography>
      </Box>
      {secretKey && !isLogin && (
        <CustomIconButton title="Logout" onClick={Logout}>
          <LogoutIcon sx={{ color: COLORS.white }} />
        </CustomIconButton>
      )}
    </Box>
  );
};
export default NavBar;
