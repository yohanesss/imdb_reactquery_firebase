import React from "react";
import "./App.css";
import { LayoutContainer } from "features/Layout";
import { Route, Routes } from "react-router-dom";
import { HomeContainer } from "features/Home/HomeContainer";
import { MoviePage } from "features/MoviePage/MoviePage";

function App() {
  return (
    <LayoutContainer>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/movies/:id" element={<MoviePage />} />
      </Routes>
    </LayoutContainer>
  );
}

export default App;
