import { getAllShows } from "apis/tvMaze";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { MovieItemType } from "types";
import { MovieCard } from "utils/components/MovieCard";

export const AllShows = () => {
  const {
    data: shows,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery<{ data: MovieItemType[]; nextPage: number }, Error>(
    "allshows",
    ({ pageParam = 0 }) => getAllShows(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextPage;
      },
    }
  );

  const renderShows = () => (
    <div className="flex flex-wrap gap-4 justify-start">
      {shows &&
        shows.pages.map((page) =>
          page.data.map((show) => <MovieCard key={show.id} movie={show} />)
        )}
    </div>
  );

  return (
    <div>
      <h1 className="mt-4 mb-2 text-red-900 font-extrabold text-5xl transition-all font-sans text-center">
        Showing All Movies! {shows?.pageParams}
      </h1>
      {shows && shows.pages.length > 0 && renderShows()}
      <button
        className="m-auto mt-2 mb-2 block hover:underline"
        onClick={() => fetchNextPage()}
      >
        Show More
      </button>
      {isFetching && <h2>Loading...</h2>}
    </div>
  );
};
