import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
  name: "favlist",
  initialState: {
    list: [],
    moviesId: [],
  },
  reducers: {
    setMoviesFavorites: (state, action) => {
      state.list = action.payload;
    },
    setMoviesId: (state, action) => {
      state.moviesId = action.payload;
    },
    markAsFavorite: (state, action) => {
      state.moviesId.push(action.payload)
    },
    markAsNotFavorite: (state, action) => {
      state.moviesId = state.moviesId.filter((item) => item !== action.payload)
    }
  },
});

export default favSlice.reducer;

const { setMoviesFavorites, setMoviesId, markAsFavorite, markAsNotFavorite } = favSlice.actions;

export const fetchAllFavMovies = (sessionId) => async (dispatch) => {
  const uri = `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=af168e8969d69372dcccc733bfb642ff&session_id=${sessionId}`;
  const response = await fetch(uri);
  const data = await response.json();
  dispatch(setMoviesFavorites(data));
  let favMoviesId = [];
  data.results.filter((movie) => favMoviesId.push(movie.id));
  dispatch(setMoviesId(favMoviesId));
};

export const addToFavorites = (movieId) => (dispatch) => {
  dispatch(markAsFavorite(movieId));
}

export const removeFromFavorites = (movieId) => (dispatch) => {
  dispatch(markAsNotFavorite(movieId))
}
