import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ActorMovie, MovieItemType } from "types";
import ReactImageMagnify from "react-image-magnify";
import { MovieListDetail } from "./MovieListDetail";

export const MoviePage = () => {
  const [movie, setMovie] = useState<MovieItemType | null>(null);
  const [cast, setCast] = useState<ActorMovie[] | []>([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((data) => data.json())
      .then((movie) => setMovie(movie));

    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then((data) => data.json())
      .then((cast) => setCast(cast));
  }, [id]);

  const renderMovieDetail = (movie: MovieItemType) => (
    <div className="w-full md:w-11/12 m-auto h-full p-5">
      <Link to="/" className="p-2 text-blue-600 hover:underline">
        Go Back
      </Link>
      <div className="flex">
        <div className="basis-1/4 p-2">
          <img src={movie.image.original} alt={movie.name} />
          <h2 className="text-2xl text-orange-700 my-4 underline">Summary</h2>
          <p dangerouslySetInnerHTML={{ __html: movie.summary }}></p>
        </div>
        <div className="basis-3/4 p-2">
          <h1 className="text-5xl text-gray-700 mb-4">{movie.name}</h1>
          <ul>
            <MovieListDetail label="Genres" value={movie.genres.join(", ")} />
            <MovieListDetail
              label="Rating"
              value={movie.rating.average + " / 10 ⭐️"}
            />
            <MovieListDetail label="Status" value={movie.status} />
            <MovieListDetail
              label="Avg. runtime"
              value={movie.averageRuntime + " min"}
            />
          </ul>
          {cast.length > 0 && (
            <>
              <h2 className="text-3xl text-orange-700 my-4 underline">Cast</h2>
              <div className="flex flex-wrap">
                {cast.map((p) => (
                  <div
                    className="flex shadow-lg m-2 p-2"
                    style={{ flexBasis: "calc(25% - 4rem)", minWidth: "188px" }}
                  >
                    <img
                      className="w-1/2 mr-2"
                      src={p.person.image.medium}
                      alt={p.person.name}
                    />
                    <div>
                      <div>{p.person.name}</div>
                      <div>as</div>
                      <div className="text-red-400">{p.character.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return <div>{movie ? renderMovieDetail(movie) : <h1>Loading...</h1>}</div>;
};
