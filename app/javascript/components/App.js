import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Airlines from "./Airlines/Airlines";
import Airline from "./Airline/Airline";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/airlines/:slug" element={<Airline />} />
        <Route path="/" element={<Airlines />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
