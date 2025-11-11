import React from "react";
import TodoApp from "./pages/TodoApp";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
