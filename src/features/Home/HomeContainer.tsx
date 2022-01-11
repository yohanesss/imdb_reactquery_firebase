import React from "react";
import { HomeBanner } from "./HomeBanner";
import { imagesDataPlaceholder } from "apis/data";
import { MovieCollectionWidget } from "utils/components/MovieCollectionWidget";

export const HomeContainer = () => {
  return (
    <div>
      <HomeBanner />
      <div className="w-full md:w-11/12 m-auto h-full p-5">
        <MovieCollectionWidget
          movies={imagesDataPlaceholder}
          collectionName="testcol"
        />
      </div>
    </div>
  );
};
