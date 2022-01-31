import {
  movieCollectionBasic,
  MovieItemType,
  moviesCollectionType,
} from "types";
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

export const searchShows = async (
  query: string
): Promise<movieCollectionBasic[]> => {
  const shows = await fetch(`${BASE_API_URL}search/shows?q=${query}`);
  return await shows.json();
};

export const getAllShows = async (
  page: number = 1
): Promise<MovieItemType[]> => {
  const getAllShows = await fetch(`${BASE_API_URL}shows?page=${page}`);
  return await getAllShows.json();
};
