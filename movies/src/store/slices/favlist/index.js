import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

export const favSlice = createSlice({
  name: "favlist",
  initialState: {
    list: [],
    moviesId: [],
  },
  reducers: {
    setMoviesFavorites: (state, action) => {
      if (typeof action.payload === "object") {
        state.list = action.payload;
      } else {
        state.list = JSON.parse(action.payload);
      }
    },
    setMoviesId: (state, action) => {
      state.moviesId = action.payload;
    },
    markAsFavorite: (state, action) => {
      state.moviesId.push(action.payload);
    },
    markAsNotFavorite: (state, action) => {
      state.moviesId = state.moviesId.filter((item) => item !== action.payload);
    },
  },
});

export default favSlice.reducer;

const { setMoviesFavorites, setMoviesId, markAsFavorite, markAsNotFavorite } =
  favSlice.actions;

export const fetchAllFavMovies = (sessionId) => async (dispatch) => {
  const conection = NetInfo.fetch();

  if ((await conection).isConnected) {
    const uri = `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=af168e8969d69372dcccc733bfb642ff&session_id=${sessionId}`;
    const response = await fetch(uri);
    const data = await response.json();
    dispatch(setMoviesFavorites(data));

    let favMoviesId = [];
    data.results.filter((movie) => favMoviesId.push(movie.id));
    dispatch(setMoviesId(favMoviesId));
    AsyncStorage.setItem("movies", JSON.stringify(data));
  } else {
    const movies = await AsyncStorage.getItem("movies");

    if (movies) {
      dispatch(setMoviesFavorites(movies));
    }
  }
};

export const addToFavorites = (movieId) => (dispatch) => {
  dispatch(markAsFavorite(movieId));
}

export const removeFromFavorites = (movieId) => (dispatch) => {
  dispatch(markAsNotFavorite(movieId))
}
