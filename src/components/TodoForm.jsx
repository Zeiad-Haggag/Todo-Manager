import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Check, X } from "lucide-react";
import { addTodo, setIsAddingTodo } from "../store/todoSlice";

function TodoForm({ OnSubmit, OnCancel, initialValue = "", placeholder }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(initialValue);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (trimmedText) {
      if (OnSubmit) {
        OnSubmit(trimmedText);
      } else {
        dispatch(addTodo(trimmedText));
      }
      setText("");
    }
  };

  const handleCancel = () => {
    if (OnCancel) {
      OnCancel();
    } else {
      dispatch(setIsAddingTodo(false));
    }
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <div className="flex-1">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-xl focus:outline-none   focus:border-gray-400 focus:ring-3 focus:ring-gray-300 transition-all duration-200 focus:bg-gray-50  focus:shadow-[inset_0_0_4px_rgba(0,0,0,0.2)] backdrop-blur-sm text-gray-800 placeholder:text-gray-500 "
          maxLength={500}
          placeholder={placeholder}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-lg tansition-colors duration-200 "
          title="Save Todo"
        >
          <Check size={16} />
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg tansition-colors duration-200 "
          title="Cancel Todo"
          onClick={handleCancel}
        >
          <X size={16} />
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
