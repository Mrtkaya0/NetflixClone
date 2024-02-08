import React, { useEffect } from 'react';
import Hero from '../components/hero';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPopular } from '../redux/actions/movieActions';
import { actionTypes } from '../redux/actionsTypes';
import Loading from '../components/Loading';
import Movielist from '../components/MovieList';



const MainPage = () => {
  const dispatch = useDispatch();
  const state =useSelector((store) => store);


  useEffect(() => {
    // filmler için yüklenme statetini aktif ede aksiyon
    dispatch({type:actionTypes.SET_MOVIES_LOADİNG});
    // popüler filmleri al STORE AKTAR  
    dispatch(getPopular());

    // türlerini al store aktar

    dispatch({ type: actionTypes.SET_GENRES_LOADİNG});
    dispatch(getGenres());

  }, []);


  return (
  <div>
    {/* KArşılama alanı */}
   <Hero/>


    {/* her bir kategori için ekrana filmlerin kategorisini ekran basma */}
    { state.isGenresLoading ? (
    <Loading/> 
    ) : state.isGenresError 
    ? (<p>Hata Oluştu</p>) 
    : (state.genres.map((genre) => <Movielist key={genre.id} genre={genre}/>) )}

  </div>
  )
};

export default MainPage;