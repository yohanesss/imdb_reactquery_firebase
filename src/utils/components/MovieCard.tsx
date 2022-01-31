import React from "react";
import { Link } from "react-router-dom";
import { MovieItemType } from "types";

type MovieCardProps = {
  movie: MovieItemType;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      key={movie.id}
      to={`/movies/${movie.id}`}
      className="inline-block"
      style={{ flexBasis: "calc(25% - .75rem)" }}
    >
      <div className="shadow-xl p-2 cursor-pointer">
        <img className="w-full" src={movie.image?.medium} alt={movie.name} />
        <h2
          className="text-red-900 font-extrabold text-2xl line-clamp-2"
          style={{ minHeight: "64px" }}
        >
          {movie.name}
        </h2>
        <p
          className=" line-clamp-2 "
          dangerouslySetInnerHTML={{ __html: movie.summary }}
        ></p>
      </div>
    </Link>
  );
};
