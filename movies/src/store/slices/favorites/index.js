import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    iconName: "heart-outline",
    buttonName: "Agregar a favoritos",
  },
  reducers: {
    markAsFavorite: (state, action) => {
      state.buttonName = "Quitar de favoritos";
      state.iconName = "heart-sharp";
    },
  },
});

export default favoritesSlice.reducer;

const { markAsFavorite } = favoritesSlice.actions;

export const axiosMarkAsFavorite = (sessionId, movieId) => async (dispatch) => {
  const url = `
  https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=af168e8969d69372dcccc733bfb642ff&session_id=${sessionId}`;
  const response = await axios.post(url, {
    media_type: "movie",
    media_id: movieId,
    favorite: true,
  });

  if (response.status === 201) {
    dispatch(markAsFavorite());
  }
};
