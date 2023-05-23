import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    tokens: {
      requestToken: "",
      sessionId: "",
    },
    isSiggnedIn: false,
    web: false,
  },
  reducers: {
    addRequestToken: (state, action) => {
      state.tokens.requestToken = action.payload;
    },
    webActive: (state, action) => {
      state.web = action.payload;
    },
    addSessionId: (state, action) => {
      state.tokens.sessionId = action.payload;
    },
    login: (state, action) => {
      state.isSiggnedIn = action.payload;
    },
    removeRequestToken: (state, action) => {
      state.tokens.requestToken = action.payload;
    },
  },
});

export default loginSlice.reducer;

const { addRequestToken, webActive, addSessionId, login, removeRequestToken } =
  loginSlice.actions;

export const axiosRequestToken = () => async (dispatch) => {
  const url =
    "https://api.themoviedb.org/3/authentication/token/new?api_key=af168e8969d69372dcccc733bfb642ff";
  const response = await axios.get(url);

  if (response.status === 200) {
    dispatch(addRequestToken(response.data.request_token));
  }
};

export const changeWebValue = (value) => (dispatch) => {
  dispatch(webActive(value));
};

export const sessionId = (value) => (dispatch) => {
  dispatch(addSessionId(value));
};

export const isLoggedIn = (value) => (dispatch) => {
  dispatch(login(value));
};

export const deleteRequestToken = (value) => (dispatch) => {
  dispatch(removeRequestToken(value));
};
