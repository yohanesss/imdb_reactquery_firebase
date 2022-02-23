import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ActorMovie, FavoriteMovieType, MovieItemType } from "types";
import { MovieListDetail } from "./MovieListDetail";
import moment from "moment";
import { getCast, getShow } from "apis/tvMaze";
import { useQuery } from "react-query";
import { useAuth } from "hooks/useAuth";
import {
  createNewDocument,
  getFavoriteByDoc,
  getUserFavorite,
  updateDocument,
} from "apis/firebase";

export const MoviePage = () => {
  const { favorite, user } = useAuth();
  const { id } = useParams();

  const { error: isErrorMovie, data: movie } = useQuery<MovieItemType, Error>(
    ["movie", id],
    async () => await getShow(id || "")
  );

  const { data: cast } = useQuery<ActorMovie[], Error>(
    ["movie", ["cast", id]],
    async () => await getCast(id || "")
  );

  const handleDeleteItem = async (movieId: number, uid: string) => {
    if (window.confirm("Are you sure want to delete this item?") === false)
      return;

    const currentFavorites = favorite ? [...favorite.data.movies] : [];
    const updatedMovies = currentFavorites.filter(
      (p: FavoriteMovieType) => p.movieId !== movieId
    );
    updateDocument("favorite", uid, { movies: updatedMovies });
  };

  const addToFavorite = async () => {
    if (user) {
      const { data: userFavorite, isExists } = await getUserFavorite(user.uid);
      if (!isExists) {
        await createNewDocument("favorite", user.uid, {
          movies: [
            {
              name: movie?.name,
              movieId: movie?.id,
              image_url: movie?.image?.original,
            },
          ],
        });
      } else {
        const fav = userFavorite;
        const isShowInFavorite =
          favorite?.data?.movies.filter(
            (p: { id: number }) => p.id === movie?.id
          ).length > 0;

        updateDocument("favorite", user.uid, {
          movies: isShowInFavorite
            ? fav?.favorite
            : [
                ...fav?.movies,
                {
                  name: movie?.name,
                  movieId: movie?.id,
                  image_url: movie?.image?.original,
                },
              ],
        });
      }
    } else {
      alert("please login before add to favorite");
    }
  };

  const renderMovieDetail = (movie: MovieItemType) => {
    const isMovieFavorited =
      favorite?.data?.movies.filter(
        (_movie: FavoriteMovieType) => _movie.movieId === movie.id
      ).length > 0;
    return (
      <div className="w-full md:w-11/12 m-auto h-full p-5">
        <Link to="/" className="p-2 text-blue-600 hover:underline">
          Go Back
        </Link>
        <div className="flex">
          <div className="basis-1/4 p-2">
            <img src={movie?.image?.original} alt={movie.name} />
            <h2 className="text-2xl text-orange-700 my-4 underline">Summary</h2>
            <p dangerouslySetInnerHTML={{ __html: movie.summary }}></p>
          </div>
          <div className="basis-3/4 p-2">
            <h1 className="text-5xl text-gray-700 mb-4">{movie.name}</h1>
            {user &&
              (!isMovieFavorited ? (
                <button
                  onClick={addToFavorite}
                  className="p-2 bg-green-700 text-white mb-4 rounded-md hover:bg-green-900"
                >
                  Add to Favorite ❤️
                </button>
              ) : (
                <button
                  className="p-2 bg-red-700 text-white mb-4 rounded-md hover:bg-red-900"
                  onClick={() => handleDeleteItem(movie.id, user.uid)}
                >
                  Remove from Favorite
                </button>
              ))}

            <ul>
              {movie?.genres?.length > 0 && (
                <MovieListDetail
                  label="Genres"
                  value={movie.genres.join(", ")}
                />
              )}
              <MovieListDetail label="Type" value={movie.type} />
              {movie?.rating?.average && (
                <MovieListDetail
                  label="Rating"
                  value={movie.rating.average + " / 10 ⭐️"}
                />
              )}
              <MovieListDetail label="Status" value={movie.status} />
              {movie?.premiered && (
                <MovieListDetail
                  label="Premiered"
                  value={moment(movie.premiered).format("dddd, MMMM Do YYYY")}
                />
              )}
              {movie?.ended && (
                <MovieListDetail
                  label="Ended"
                  value={moment(movie.ended).format("dddd, MMMM Do YYYY")}
                />
              )}
              {movie?.averageRuntime && (
                <MovieListDetail
                  label="Avg. runtime"
                  value={movie.averageRuntime + " min"}
                />
              )}
            </ul>
            {cast && cast.length > 0 && (
              <>
                <h2 className="text-3xl text-orange-700 my-4 underline">
                  Cast
                </h2>
                <div className="flex flex-wrap">
                  {cast.map((p) => (
                    <div
                      key={p.character.id}
                      className="flex shadow-lg m-2 p-2"
                      style={{
                        flexBasis: "calc(25% - 4rem)",
                        minWidth: "188px",
                      }}
                    >
                      <img
                        className="w-1/2 mr-2"
                        src={p.person.image?.medium}
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
  };

  return (
    <div>
      {movie ? (
        renderMovieDetail(movie)
      ) : isErrorMovie ? (
        "Error Loading Movie!"
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
