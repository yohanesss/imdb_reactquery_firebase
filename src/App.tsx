import React from "react";
import "./App.css";
import { LayoutContainer } from "features/Layout";
import { Route, Routes } from "react-router-dom";
import { HomeContainer } from "features/Home/HomeContainer";
import { MoviePage } from "features/MoviePage/MoviePage";
import { AllShows, SearchPage } from "features/Listing";

function App() {
  return (
    <LayoutContainer>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/all-shows" element={<AllShows />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
      </Routes>
    </LayoutContainer>
  );
}

export default App;
