import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseImageURL, options } from '../constants/constants';
import Loading from '../components/Loading';
import { Splide, SplideSlide } from '@splidejs/react-splide';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// https://api.themoviedb.org/3/movie/{movie_id}/credits

const DetailPage = () => {

  // filmin idsini alma
  const { id } = useParams();
  // filmin verileri
  const [movie, setMovie] = useState(null)
  // oyuncuların verisi
  const [cast, setCast] = useState(null)



  // url deki idye göre filmin verilerini al
  useEffect(() => {
    axios.get(`/movie/${id}`, options)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    // filmdeki oyuncu bilgileri
    axios.get(`/movie/${id}/credits`, options)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.log(err));




  }, []);

  return (
    <div className="row">
      {!movie ? (<Loading />)
        : (
          <>
            <div className="col-md-12 banner">
              <img className="w-100 h-100 object-fit-cover"
                src={baseImageURL.concat(movie.backdrop_path)} />
              <div className="banner-bg">
                <span>{movie.title}</span>
              </div>
            </div>
            <div className="col-md-6 mt-4 p-4">

              {/* 1 şirketler alan */}
              <h3>Yapımcı şirketler</h3>
              <div className="d-flex flex-wrap gap-4">
                {movie.production_companies.map((comp) => (
                  <div className="bg-white rounded p-2" key={comp.id}>
                    {comp.logo_path ? (
                      <img
                        className="object-fit-contain"
                        title={comp.name}
                        width={100}
                        height={50}
                        src={baseImageURL.concat(comp.logo_path)}
                      // Resim alt etiketi ekleyin (opsiyonel)
                      />

                    ) : (
                      <p
                        style={{
                          width: '100px',
                          marginTop: '10px',
                          height: '50px',
                        }}
                        className="text-black text-center">
                        {comp.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {/* 2 konuşulan diller */}
              <h3 className="mt-4">Konuşulan Diller</h3>
              <div className="d-flex flex-wrap gap-4">
                {movie.spoken_languages.map((lang) => (
                  <div className="bg-white rounded p-1 text-black" key={lang.iso_639_1}>
                    <span>{lang.english_name}</span>
                  </div>
                ))}
              </div>
              {/* 3 yapımcı ülkeler */}
              <h3 className="mt-4">Yapımcı Ülkeler</h3>
              <div className="d-flex flex-wrap gap-4">
                {movie.production_countries.map((country) => (
                  <div className="bg-white rounded p-1 text-black" key={country.iso_3166_1}>
                    <span>{country.name}</span>
                  </div>
                ))}
              </div>


            </div>
            <div className="col-md-6 mt-4 p-4">
              <p className="lead">{movie.overview}</p>
              <p><span className="fw-bold">Bütçe:</span> {movie.budget}</p>
              <p><span className="fw-bold" >Gelir:</span>  {movie.revenue}</p>


            </div>
            {/* oyuncular listesi */}
            <div className="col-12 p-4 my-3">
              <h2>Oyuncular</h2>
              <Splide
                options={{
                  height: '200px',
                  gap: '10px', //elemanlar arası boşluk
                  pagination: false, //alt kısımdaki noktaları kaldır
                  autoWidth: true, //sayfa geni,şliğine göre ürün görsel bas sığdır

                }}>
                {cast?.map((actor) => (
                  <SplideSlide key={actor.cast_id}>
                    <div className='actor-card h-100'>
                      {/* Görüntü veya film bilgilerini buraya ekleyin */}
                      <img
                        className="movie"
                        src={baseImageURL.concat(actor.profile_path)} />
                        <p><span>{actor.name}</span></p>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </>
        )
      }
    </div>

  )
};

export default DetailPage;