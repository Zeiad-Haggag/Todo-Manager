import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TodoApp from "../pages/TodoApp";
import { AnimatePresence } from "framer-motion";

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/todo" element={<TodoApp />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
