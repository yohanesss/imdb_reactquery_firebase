import { HomeBanner } from "./HomeBanner";
import { MovieCollectionWidget } from "utils/components/MovieCollectionWidget";
import { moviesCollectionType } from "types";
import { getCollectionByQuery } from "apis";
import { useQuery } from "react-query";

const getCollections = async (
  ...args: { collectionName: string; query: string }[]
) => {
  return await Promise.all<moviesCollectionType>(
    args.map(
      async (arg) => await getCollectionByQuery(arg.collectionName, arg.query)
    )
  );
};

export const HomeContainer = () => {
  const { data: moviesCollection } = useQuery<moviesCollectionType[], Error>(
    "homeCollections",
    async () =>
      getCollections(
        { collectionName: "Tom and Jerry", query: "tom and jerry" },
        { collectionName: "nickelodeon", query: "nickelodeon" }
      )
  );

  return (
    <div>
      <HomeBanner />
      <div className="w-full md:w-11/12 m-auto h-full p-5">
        {moviesCollection &&
          moviesCollection.length > 0 &&
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
