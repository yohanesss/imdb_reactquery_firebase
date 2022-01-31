import { getAllShows } from "apis/tvMaze";
import React, { useEffect, useState } from "react";
import { MovieItemType } from "types";
import { MovieCard } from "utils/components/MovieCard";

export const SearchPage = () => {
  const [shows, setShows] = useState<MovieItemType[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllShows(currentPage).then((shows) =>
      setShows((prevShows) => [...prevShows, ...shows])
    );
  }, [currentPage]);

  const renderShows = () => (
    <div className="flex flex-wrap gap-4 justify-start">
      {shows.map((show) => (
        <MovieCard key={show.id} movie={show} />
      ))}
    </div>
  );

  return (
    <div>
      <h1 className="mt-4 mb-2 text-red-900 font-extrabold text-5xl transition-all font-sans text-center">
        Showing All Movies!
      </h1>
      {shows?.length > 0 && renderShows()}
      <button
        className="m-auto mt-2 mb-2 block hover:underline"
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Show More
      </button>
    </div>
  );
};
