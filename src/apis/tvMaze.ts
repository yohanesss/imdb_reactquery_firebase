import { moviesCollectionType } from "./../types";
const BASE_API_URL = "https://api.tvmaze.com/";

export const getCollectionByQuery = async (
  collectionName: string,
  query: string
): Promise<moviesCollectionType> => {
  const getCollection = await fetch(`${BASE_API_URL}search/shows?q=${query}`);
  return {
    collectionName,
    collection: await getCollection.json(),
  };
};
