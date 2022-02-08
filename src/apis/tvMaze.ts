import { ActorMovie } from "./../types";
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

export const getShow = async (id: string): Promise<MovieItemType> => {
  const show = await fetch(`https://api.tvmaze.com/shows/${id}`);
  return await show.json();
};

export const getCast = async (id: string): Promise<ActorMovie[]> => {
  const cast = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
  return await cast.json();
};

export const getAllShows = async (
  page: number = 1
): Promise<{ data: MovieItemType[]; nextPage: number }> => {
  const getAllShows = await fetch(`${BASE_API_URL}shows?page=${page}`);
  console.log("nextPage", page + 1);
  return { data: await getAllShows.json(), nextPage: page + 1 };
};
