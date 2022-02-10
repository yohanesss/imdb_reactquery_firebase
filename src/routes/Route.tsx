import { HomeContainer } from "features/Home/HomeContainer";
import { AllShows, SearchPage } from "features/Listing";
import { MoviePage } from "features/MoviePage/MoviePage";
import { ReactNode } from "react";

interface IRoute {
  path: string;
  element: ReactNode;
  name: string;
  protected: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/",
    element: <HomeContainer />,
    name: "Home Page",
    protected: false,
  },
  {
    path: "/all-shows",
    element: <AllShows />,
    name: "All Shows",
    protected: true,
  },
  {
    path: "/search",
    element: <SearchPage />,
    name: "Search Page",
    protected: false,
  },
  {
    path: "/movies/:id",
    element: <MoviePage />,
    name: "Movie Page",
    protected: false,
  },
];
