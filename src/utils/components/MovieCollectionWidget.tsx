import React from "react";
import { Link } from "react-router-dom";
import { MovieItemType } from "types";

type MovieCollectionWidgetType = {
  movies: MovieItemType[];
  collectionName: string;
};

export const MovieCollectionWidget = ({
  movies,
  collectionName,
}: MovieCollectionWidgetType) => {
  return (
    <>
      <h1 className="mt-4 mb-2 text-red-900 font-extrabold text-5xl transition-all font-sans hover:font-serif">
        {collectionName}
      </h1>
      <div className="flex flex-wrap gap-4 justify-between">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="inline-block"
            style={{ flexBasis: "calc(25% - .75rem)" }}
          >
            <div className="shadow-xl p-2 cursor-pointer">
              <img
                className="w-full"
                src={movie.image.medium}
                alt={movie.name}
              />
              <h2 className="text-red-900 font-extrabold text-3xl">
                {movie.name}
              </h2>
              <p dangerouslySetInnerHTML={{ __html: movie.summary }}></p>
              {/* <pre>{JSON.stringify(movie, null, 2)}</pre> */}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
