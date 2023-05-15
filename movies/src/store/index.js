import { configureStore } from "@reduxjs/toolkit";
import login from "./slices/login";
import movies from "./slices/movies";

export default configureStore({
  reducer: {
    login,
    movies
  },
});
