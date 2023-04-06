import { createSlice } from "@reduxjs/toolkit";

export interface ISecretState {
  isCode: boolean;
  isLogin: boolean;
  secret: string;
}

const initialState: ISecretState = {
  isCode: true,
  isLogin: true,
  secret: "",
};

export const secretSlice = createSlice({
  name: "secret",
  initialState,
  reducers: {
    updateIsCode: (state, action) => {
      state.isCode = action?.payload?.isCode;
    },
    updateIsLogin: (state, action) => {
      state.isLogin = action?.payload.isLogin;
    },
    updateSecret: (state, action) => {
      state.secret = action?.payload.secret;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateIsCode, updateIsLogin, updateSecret } =
  secretSlice.actions;

export default secretSlice.reducer;
