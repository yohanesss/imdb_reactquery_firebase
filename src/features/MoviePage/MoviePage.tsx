import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieItemType } from "types";
import ReactImageMagnify from "react-image-magnify";
export const MoviePage = () => {
  const [movie, setMovie] = useState<MovieItemType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((data) => data.json())
      .then((movie) => setMovie(movie));
  }, [id]);

  const renderMovieDetail = (movie: MovieItemType) => (
    <div className="w-full md:w-11/12 m-auto h-full p-5">
      <h1>{movie.name}</h1>
      <img src={movie.image.original} alt={movie.name} />
    </div>
  );

  return <div>{movie ? renderMovieDetail(movie) : <h1>Loading...</h1>}</div>;
};
