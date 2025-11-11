import { createSelector } from "reselect";

//basic selectors
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectIsAddingTodo = (state) => state.todos.isAddingTodo;
//filter items
export const selectFilteredTodos = (state) => {
  const todos = selectTodos(state);
  const filter = selectFilter(state);

  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "all":
    default:
      return todos;
  }
};

export const selectedTodosStats = createSelector([selectTodos], (todos) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const percentCompleted =
    total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, active, percentCompleted };
});

export const selectedTeam = (state) => state.team;
