import React from "react";
import { Link } from "react-router-dom";
import { movieCollectionBasic } from "types";
import { MovieCard } from "./MovieCard";

type MovieCollectionWidgetType = {
  movies: movieCollectionBasic[];
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
      <div className="flex flex-wrap gap-4 justify-start">
        {movies.map(({ show: movie }) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};
