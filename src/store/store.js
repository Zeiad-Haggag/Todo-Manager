import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import teamNameReducer from "./teamSlice";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    team: teamNameReducer,
  },
});
