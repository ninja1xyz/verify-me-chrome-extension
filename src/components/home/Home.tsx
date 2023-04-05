import React, { useState } from "react";

import classes from "./Home.module.scss";
import { Box, Typography, Tooltip } from "@mui/material";
import Login from "./components/login/Login";
import CustomButton from "../customButton/CustomButton";
import { RemoveData, getData, storeData } from "../../utils/chromeService";
import { v4 as uuidv4 } from "uuid";

interface IHome {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCode: React.Dispatch<React.SetStateAction<boolean>>;
  setSecret: React.Dispatch<React.SetStateAction<string>>;
}
const Home: React.FC<IHome> = ({
  isLogin,
  setIsLogin,
  setIsCode,
  setSecret: updateSecretKey,
}) => {
  let secret = JSON.parse(getData() || "{}");
  const [secretKey, setSecret] = useState(secret?.secret || "");

  const updateSecret = () => {
    const data = { ...secret };
    data.secret = uuidv4();
    storeData(data);
    setSecret(data.secret);
  };
  const removeSecret = () => {
    RemoveData();
    setIsCode(true);
    updateSecretKey("");
  };
  const homeSection = () => {
    return (
      <>
        <Typography variant="h6">Secret Code</Typography>
        <Tooltip title="Secret Code">
          <Typography variant="h6" className={classes.code}>
            {secretKey || ""}
          </Typography>
        </Tooltip>
        <CustomButton onClick={updateSecret}>Regenerate Secret</CustomButton>
        <CustomButton onClick={removeSecret} sx={{ marginTop: "20px" }}>
          Reset
        </CustomButton>
      </>
    );
  };

  return (
    <Box className={classes.container}>
      {isLogin ? <Login setIsLogin={setIsLogin} /> : homeSection()}
    </Box>
  );
};
export default Home;
