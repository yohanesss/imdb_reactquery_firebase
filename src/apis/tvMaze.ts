import { MovieItemType } from "types";
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

export const getAllShows = async (
  page: number = 1
): Promise<MovieItemType[]> => {
  const getAllShows = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
  return await getAllShows.json();
};
