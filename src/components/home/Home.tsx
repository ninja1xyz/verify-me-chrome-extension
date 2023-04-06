import React from "react";

import classes from "./Home.module.scss";
import { Box, Typography, Tooltip } from "@mui/material";
import Login from "./components/login/Login";
import CustomButton from "../customButton/CustomButton";
import { RemoveData, getData, storeData } from "../../utils/chromeService";
import { v4 as uuidv4 } from "uuid";
import { updateIsCode, updateSecret } from "../../store/features/secret";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Home = () => {
  const dispatch = useDispatch();
  const { isLogin, secret } = useSelector((state: RootState) => state.secret);

  const showSecretKey = () => {
    const data = JSON.parse(secret || "");
    return data?.secret || "";
  };

  const updateNewSecret = async () => {
    const secret = await getData();
    const data = { ...JSON.parse(secret || "") };
    data.secret = uuidv4();
    storeData(data);
    dispatch(updateSecret({ secret: JSON.stringify(data) || "" }));
  };
  const removeSecret = () => {
    RemoveData();
    dispatch(updateIsCode({ isCode: true }));
    dispatch(updateSecret({ secret: "" }));
  };
  const homeSection = () => {
    return (
      <>
        <Typography variant="h6">Secret Code</Typography>
        <Tooltip title="Secret Code">
          <Typography variant="h6" className={classes.code}>
            {showSecretKey() || ""}
          </Typography>
        </Tooltip>
        <CustomButton onClick={updateNewSecret}>Regenerate Secret</CustomButton>
        <CustomButton onClick={removeSecret} sx={{ marginTop: "20px" }}>
          Reset
        </CustomButton>
      </>
    );
  };

  return (
    <Box className={classes.container}>
      {isLogin ? <Login /> : homeSection()}
    </Box>
  );
};
export default Home;
