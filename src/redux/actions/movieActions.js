
import axios from "axios";
import { options } from "../../constants/constants";
import { actionTypes } from "../actionsTypes";

// base URL belirleme
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// popüler filmleri alacak ve Redux store'a aktaracak olan thunk
export const getPopular = () => {
  return (dispatch) => {
    axios.get('/movie/popular', options)
      .then((res) => {
        // Veriyi başarıyla alındığında Redux store'a gönder
        dispatch({
          type: actionTypes.SET_MOVIES,
          payload: res.data.results,
        });
      })
      .catch((err) => dispatch({type: actionTypes.SET_MOVIES_ERROR}))
     
  };
};

// tür ve verilireini ala store aktar

export const getGenres =() => {
  return (dispatch) => {
    axios.get('genre/movie/list?language=en', options)
    .then((res) => 
    dispatch({type: actionTypes.SET_GENRES, payload:res.data.genres}))
    .catch(() => dispatch({type:actionTypes.SET_GENRES_ERROR}))

  }

}