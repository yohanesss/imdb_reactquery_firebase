import { getAllShows, searchShows } from "apis/tvMaze";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { movieCollectionBasic } from "types";
import { MovieCard } from "utils/components/MovieCard";

export const SearchPage = () => {
  const [shows, setShows] = useState<movieCollectionBasic[] | []>([]);
  const [searchParam] = useSearchParams();
  const query = searchParam.get("q");

  useEffect(() => {
    let didCancel = false;
    if (query?.length && !didCancel) {
      searchShows(query).then((shows) => setShows(shows));
    }

    return () => {
      didCancel = true;
    };
  }, [query]);

  const renderShows = () => (
    <div className="flex flex-wrap gap-4 justify-start">
      {shows.map(({ show }) => (
        <MovieCard key={show.id} movie={show} />
      ))}
    </div>
  );

  return (
    <div>
      {query && (
        <h1 className="mt-4 mb-2 text-red-900 font-extrabold text-5xl transition-all font-sans text-center">
          Showing result for "{query}"
        </h1>
      )}
      {shows?.length > 0 && renderShows()}
    </div>
  );
};
