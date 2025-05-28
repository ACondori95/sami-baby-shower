import {createContext, useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance";

export const TodoContext = createContext();

export function TodoProvider({children}) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Fetch all todos from MongoDB
  const getAllTodos = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/todos");
      setTodos(response.data.todos || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;
  const searchedTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Add new todo
  const addTodo = async (text) => {
    try {
      const response = await axiosInstance.post("/api/todos", {text});
      setTodos((prev) => [...prev, response.data.todo]);
    } catch (error) {
      setError(error);
    }
  };

  // Edit existing todo
  const editTodo = async (id, newText) => {
    try {
      const response = await axiosInstance.put(`/api/todos/${id}`, {
        text: newText,
      });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data.todo : todo))
      );
    } catch (error) {
      setError(error);
    }
  };

  // Mark todo as completed
  const completeTodo = async (id) => {
    try {
      const response = await axiosInstance.patch(`/api/todos/${id}/complete`);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data.todo : todo))
      );
    } catch (error) {
      setError(error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/api/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        editTodo,
        completeTodo,
        deleteTodo,
      }}>
      {children}
    </TodoContext.Provider>
  );
}
