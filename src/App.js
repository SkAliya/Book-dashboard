import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import BookFormPage from "./pages/BookFormPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add" element={<BookFormPage />} />
        <Route path="/edit/:id" element={<BookFormPage />} />
      </Routes>
    </Router>
  );
}