import React from "react";
import "./App.css";
import { LayoutContainer } from "features/Layout";
import { Route, Routes } from "react-router-dom";
import { HomeContainer } from "features/Home/HomeContainer";

function App() {
  return (
    <LayoutContainer>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
      </Routes>
    </LayoutContainer>
  );
}

export default App;
