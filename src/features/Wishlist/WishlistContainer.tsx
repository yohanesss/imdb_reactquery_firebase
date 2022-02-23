import { useAuth } from "hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";
import { FavoriteMovieType } from "types";

export const WishlistContainer = () => {
  const { favorite } = useAuth();

  console.log("[favorite]", favorite);
  return (
    <div className="w-full md:w-11/12 m-auto h-full p-5">
      <h1 className="mt-4 mb-2 text-red-900 font-extrabold text-5xl transition-all font-sans text-center">
        My Wishlist
      </h1>
      {favorite?.data?.movies?.length > 0 ? (
        <ul>
          {favorite?.data?.movies.map((movie: FavoriteMovieType) => (
            <li
              style={{
                display: "flex",
                borderBottom: "1px solid gainsboro",
                padding: "10px 0",
              }}
            >
              <img
                src={movie.image_url}
                alt={movie.name}
                style={{ height: "100px", marginRight: "10px" }}
              />
              <p style={{ fontSize: "22px" }}>
                {movie.name}
                <br />
                <span style={{ color: "red" }}>
                  Movie Id: <b>{movie.movieId}</b>
                </span>
                <br />
                <Link to={`/movies/${movie.movieId}`}>View Detail</Link>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Your Wishlist is empty</h2>
      )}
    </div>
  );
};
