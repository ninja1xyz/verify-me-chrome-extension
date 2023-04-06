import React, { useEffect } from "react";

import "./App.css";
import NavBar from "./components/navbar/Navbar";
import Initialization from "./components/initialization/Initialization";
import { getData } from "./utils/chromeService";
import Home from "./components/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { updateIsCode, updateSecret } from "./store/features/secret";
import { RootState } from "./store/store";

const App = () => {
  const { secret: secretKey } = useSelector((state: RootState) => state.secret);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSecretData = async () => {
      const secret = await getData();
      dispatch(updateSecret({ secret: secret || "" }));
    };
    getSecretData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (secretKey) dispatch(updateIsCode({ isCode: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secretKey]);

  return (
    <div className="App">
      <NavBar />
      {!secretKey ? <Initialization /> : <Home />}
    </div>
  );
};

export default App;
