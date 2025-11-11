import { createSlice } from "@reduxjs/toolkit";

const getTeamName = () => {
  return localStorage.getItem("selectedTeam") || "Frontend Team";
};
const loadTodos = () => {
  try {
    const team = getTeamName();
    const saved = localStorage.getItem(`todos_${team}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveTodos = (todos) => {
  try {
    const team = getTeamName();
    localStorage.setItem(`todos_${team}`, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos...", error);
  }
};

const initialState = {
  items: loadTodos(),
  filter: "all",
  isAddingTodo: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setIsAddingTodo: (state, action) => {
      state.isAddingTodo = action.payload;
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: crypto.randomUUID(),
        text: action.payload.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.unshift(newTodo);
      state.isAddingTodo = false;
      saveTodos(state.items);
    },
    // toggle checkbox todo
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date().toISOString();
        saveTodos(state.items);
      }
    },
    // Delete todo
    deleteTodo: (state, action) => {
      state.items = state.items.filter((items) => items.id !== action.payload);
      saveTodos(state.items);
    },
    //Update todo
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const todo = state.items.find((item) => item.id === id);
      if (todo) {
        Object.assign(todo, updates, { updatedAt: new Date().toISOString() });
      }
      saveTodos(state.items);
    },
    // Set Filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    //Mark all completed
    markAllCompleted: (state) => {
      const hasInCompleted = state.items.some((item) => !item.completed);
      state.items.forEach((todo) => {
        todo.completed = hasInCompleted;
        todo.updatedAt = new Date().toISOString();
      });
      saveTodos(state.items);
    },
    //Clear Completed
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
      saveTodos(state.items);
    },
    reloadTodos: (state) => {
      state.items = loadTodos();
    },
  },
});

export const {
  setIsAddingTodo,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  markAllCompleted,
  clearCompleted,
  reloadTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
