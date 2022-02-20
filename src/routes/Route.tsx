import { HomeContainer } from "features/Home/HomeContainer";
import { AllShows, SearchPage } from "features/Listing";
import { MoviePage } from "features/MoviePage/MoviePage";
import { WishlistContainer } from "features/Wishlist/WishlistContainer";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

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
    protected: false,
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
  {
    path: "/wishlist",
    element: <WishlistContainer />,
    name: "WishList",
    protected: false,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
    name: "Not Found!",
    protected: false,
  },
];
