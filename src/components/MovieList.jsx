import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseImageURL, options } from "../constants/constants";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

const Movielist = ({ genre }) => {

    const [movies, setMovies] = useState(null);

    useEffect(() => {
        // genre.id değiştiğinde useEffect çalışacak
        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.id}`, options)
            .then((res) => setMovies(res.data.results))
            .catch((err) => console.log(err));

        
    }, []); // genre.id'yi bağımlılık dizisine ekleyin

    return (
        <div className="p-7">
            <h1 className="mb-3">{genre.name}</h1>
            <Splide options={{
                gap: '10px', //elemanlar arası boşluk
                pagination:false, //alt kısımdaki noktaları kaldır
                autoWidth:true, //sayfa geni,şliğine göre ürün görsel bas sığdır

            }} aria-label="My Favorite Images">
                {movies?.map((movie) => (
                    <SplideSlide key={movie.id}>
                        <Link to={`/detay/${movie.id}`}>
                         {/* Görüntü veya film bilgilerini buraya ekleyin */}
                         <img className="movie" src={baseImageURL.concat(movie.poster_path)}/>
                        </Link>
                       </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default Movielist;