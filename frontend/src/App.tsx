import React from "react";
import "./App.css";
// for routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// custom components
import InputProd from "./components/InputProd";
import ListProds from "./components/ListProds";
import ErrorPg from "./components/ErrorPg";

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage - all the products listed in a table */}
        <Route path="/" element={<ListProds />} />
        {/* Add page - form for inserting data (location, name, price) */}
        <Route path="/add" element={<InputProd />} />
        {/* 404 not found page */}
        <Route path="*" element={<ErrorPg />} />
      </Routes>
    </Router>
  );
}

export default App;
