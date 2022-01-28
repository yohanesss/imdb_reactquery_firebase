import React, { useEffect, useState } from "react";
import { HomeBanner } from "./HomeBanner";
import { imagesDataPlaceholder } from "apis/data";
import { MovieCollectionWidget } from "utils/components/MovieCollectionWidget";
import { movieCollectionBasic, moviesCollectionType } from "types";
import { getCollectionByQuery } from "apis";

export const HomeContainer = () => {
  const [moviesCollection, setMoviesCollection] = useState<
    moviesCollectionType[] | []
  >([]);

  useEffect(() => {
    const getCollections = async (
      ...args: { collectionName: string; query: string }[]
    ) => {
      const moviesCollections = await Promise.all<moviesCollectionType>(
        args.map(
          async (arg) =>
            await getCollectionByQuery(arg.collectionName, arg.query)
        )
      );

      setMoviesCollection(moviesCollections);
    };

    getCollections(
      { collectionName: "Tom and Jerry", query: "tom and jerry" },
      { collectionName: "nickelodeon", query: "nickelodeon" }
    );
  }, []);

  return (
    <div>
      <HomeBanner />
      <div className="w-full md:w-11/12 m-auto h-full p-5">
        {moviesCollection.length > 0 &&
          moviesCollection.map((collection, id) => (
            <MovieCollectionWidget
              key={id}
              movies={collection.collection}
              collectionName={collection.collectionName}
            />
          ))}
      </div>
    </div>
  );
};
