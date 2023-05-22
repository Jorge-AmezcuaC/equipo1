import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux' 

export const favSlice = createSlice({
    name: 'favlist',
    initialState: {
        list: []
    },
    reducers: {
        setMoviesFavorites: (state, action) => {
            state.list = action.payload;
        }  
    }
});

export default favSlice.reducer;

const { setMoviesFavorites } = favSlice.actions;

export const fetchAllFavMovies = () => async (dispatch) => {
    const { sessionId } = useSelector((state) => state.login.tokens)
    const uri = `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=af168e8969d69372dcccc733bfb642ff&session_id=${sessionId}`
    const response = await fetch(uri);
    const data = await response.json();
    dispatch(setMoviesFavorites(data));
};