import React from "react";
import "./App.css";
import { LayoutContainer } from "features/Layout";
import { Route, Routes } from "react-router-dom";
import { HomeContainer } from "features/Home/HomeContainer";
import { MoviePage } from "features/MoviePage/MoviePage";
import { AllShows, SearchPage } from "features/Listing";
import { routes } from "routes/Route";
import { AuthRoute } from "utils/components/AuthRouterWrapper";

function App() {
  return (
    <LayoutContainer>
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            element={
              route.protected ? (
                <AuthRoute>{route.element}</AuthRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </LayoutContainer>
  );
}

export default App;
