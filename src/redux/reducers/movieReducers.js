import { actionTypes } from "../actionsTypes";

const initialState = {
    popularMovies: [],
    genres: [],
    isMoviesLoading: false,
    İsGenresError: false,
    isMoviesError: false
};


const movieReducers = (state = initialState, { type, payload }) => {
    switch (type) {

        case actionTypes.SET_MOVIES_LOADİNG:
            return { ...state, isMoviseLoading: true };
        case actionTypes.SET_MOVIES_ERROR:
            return {
                ...state,
                isMoviesLoading: false,
                isMoviesError: true
            };
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                isMoviesLoading: false,
                isMoviesError: false,
                popularMovies: payload,
            };
        case actionTypes.SET_GENRES_LOADİNG:
            return {
                ...state,
                İsGenresLoading: true
            };
        case actionTypes.SET_GENRES_ERROR:
            return {
                ...state,
                İsGenresLoading: false,
                İsGenresError: true
            };
        case actionTypes.SET_GENRES:
            return {
                ...state,
                İsGenresLoading: true,
                İsGenresError: false,
                genres: payload,
            };

        default:
            return state;

    }
};

export default movieReducers;
