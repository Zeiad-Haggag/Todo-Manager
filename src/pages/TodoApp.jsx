import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoFilters from "../components/TodoFilters";
import TodoForm from "../components/TodoForm";
import { reloadTodos } from "../store/todoSlice";
import { motion } from "framer-motion";
import { pageVariants } from "../animations/pageTransition";

import {
  SquareCheckBig,
  Plus,
  Trash2,
  CircleCheck,
  ListTodo,
  Filter,
} from "lucide-react";
import TodoItem from "../components/TodoItem";
import {
  selectFilteredTodos,
  selectTodos,
  selectedTodosStats,
  selectFilter,
  selectIsAddingTodo,
  selectedTeam,
} from "../store/selectors";
import {
  setIsAddingTodo,
  setFilter,
  markAllCompleted,
  clearCompleted,
} from "../store/todoSlice";

function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filteredTodos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectedTodosStats);
  const filter = useSelector(selectFilter);
  const isAddingTodo = useSelector(selectIsAddingTodo);

  const handleAddTodoClick = () => {
    dispatch(setIsAddingTodo(true));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleMarkAllCompleted = () => {
    dispatch(markAllCompleted());
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const { teamColor, teamName } = useSelector(selectedTeam);
  useEffect(() => {
    dispatch(reloadTodos());
  }, [teamName, dispatch]);
  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-2xl mx-auto">
        {/* Todo Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SquareCheckBig className="h-8 w-8 text-gray-950" />
            <h1 className="md:text-3xl text-lg text-gray-950  flex items-center gap-2">
              Todo Management
              {teamName && (
                <span
                  className="px-3 py-1 rounded-full text-white text-sm font-semibold shadow"
                  style={{ backgroundColor: teamColor || "#6366f1" }}
                >
                  {teamName}
                </span>
              )}
            </h1>
          </div>

          <p className="text-gray-500">
            Stay organized and get things done with our simple todo manager
          </p>
        </div>

        {/* Stats Card */}
        {stats.total > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl  text-gray-950">Progress Overview</h2>
              <div className="text-2xl font-bold text-green-600">
                {/* Stats Completed Logics*/}
                {stats.percentCompleted}%
              </div>
            </div>

            <div className="w-full bg-gray-300 rounded-full mb-4">
              {/* Progress Bar Logic  */}
              <div
                className="bg-linear-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out "
                style={{ width: `${stats.percentCompleted}%` }}
              ></div>
            </div>

            {/*Stats*/}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl  text-gray-800">
                  {/* State Total Logic */}
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-2xl  text-gray-800">
                  {/* State Active Logic */}
                  {stats.active}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl  text-gray-800">
                  {/* State Completed Logic */}
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        )}
        {/* Todo Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-300 shadow-lg overflow-hidden">
          {/* Todo Form Logic */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <button
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-sm sm:text-base text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer "
                onClick={handleAddTodoClick}
              >
                <Plus size={20} /> Add Task
              </button>
              {/* Mark All Completed / Clear Button */}
              {stats.total > 0 && (
                <div className="flex items-center gap-2">
                  {stats.completed > 0 && (
                    // Clear Completed Button
                    <button
                      className="flex items-center gap-3 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transiton-colors duration-200 text-sm"
                      onClick={handleClearCompleted}
                    >
                      <Trash2 size={16} />
                      Clear Completed
                    </button>
                  )}
                  {stats.active > 0 && (
                    // Mark All Completed Button
                    <button
                      className="flex items-center gap-3 text-green-600 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 transiton-colors duration-200 text-sm"
                      onClick={handleMarkAllCompleted}
                    >
                      <CircleCheck size={16} />
                      Mark All Completed
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* Todo Filters */}
            <TodoFilters
              currentFilter={filter}
              stats={stats}
              onFilterChange={handleFilterChange}
            />
          </div>
          {/* Todo Form */}
          {isAddingTodo && (
            <div className="p-6 border-b border-gray-300 bg-gray-100">
              <TodoForm placeholder="Add a new todo..." />
            </div>
          )}

          {/* Todo Items List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="p-10 text-center">
                {todos.length === 0 ? (
                  <div className="text-gray-950">
                    <ListTodo size={48} className="mx-auto mb-6 opacity-50" />
                    <p className="mb-6 text-gray-950">No todos found</p>
                    <p className="text-gray-500">
                      Add your first todo to get started!
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    <Filter size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="mb-2 text-gray-900">
                      No {filter} Todos
                      <p className="text-sm">
                        {filter === "completed" &&
                          "All your Todos are Completed"}
                        {filter === "completed" &&
                          "No Completed Todos yet, keep going"}
                      </p>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-300">
                {/* Render your filtered todos here */}
                {filteredTodos.map((todo, index) => {
                  return <TodoItem key={todo.id} todo={todo} index={index} />;
                })}
              </div>
            )}
          </div>
        </div>
        {/* Footer Todos */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl mt-8 border border-gray-300 shadow-md">
          <div className="flex flex-col items-center justify-center py-4 text-gray-700">
            <p className="text-sm font-medium tracking-wide">
              Designed & Developed by
              <span className="ml-1 font-semibold text-gray-900 hover:text-green-600 transition-colors duration-200">
                Zeiad Haggag
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TodoApp;
