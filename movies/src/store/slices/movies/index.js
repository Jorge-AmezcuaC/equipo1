import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    list: []
  },
  reducers: {
    setMovieList: (state, action) => {
      state.list = action.payload;
    }
  }
});

const { setMovieList } = movieSlice.actions;

export default movieSlice.reducer;

export const fetchAllMovies = () => async (dispatch) => {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=af168e8969d69372dcccc733bfb642ff'
  );
  const data = await response.json();
  dispatch(setMovieList(data));
};