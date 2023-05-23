import { configureStore } from "@reduxjs/toolkit";
import login from "./slices/login";
import movies from "./slices/movies";
import favlist from "./slices/favlist";

export default configureStore({
  reducer: {
    login,
    movies,
    favlist,
  },
});
