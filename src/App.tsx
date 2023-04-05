import React, { useEffect, useState } from "react";

import "./App.css";
import NavBar from "./components/navbar/Navbar";
import Initialization from "./components/initialization/Initialization";
import { getData } from "./utils/chromeService";
import Home from "./components/home/Home";

const App = () => {
  const secret = getData();
  const [isCode, setIsCode] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [secretKey, setSecret] = useState(secret);
  const InitializationProps = {
    isCode,
    setIsCode,
    setSecret,
    setIsLogin,
    isLogin,
  };
  const homeProps = {
    isLogin,
    setIsLogin,
    setIsCode,
    setSecret,
  };
  useEffect(() => {
    if (secret) setIsCode(false);
  }, [secret]);

  return (
    <div className="App">
      <NavBar {...InitializationProps} />
      {!secretKey ? (
        <Initialization {...InitializationProps} />
      ) : (
        <Home {...homeProps} />
      )}
    </div>
  );
};

export default App;
