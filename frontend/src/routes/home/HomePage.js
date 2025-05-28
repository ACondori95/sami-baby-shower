import React from "react";
import {useNavigate} from "react-router-dom";
import {TodoContext} from "../../TodoContext";
import {TodoSearch} from "../../ui/TodoSearch";
import {TodoList} from "../../ui/TodoList";
import {TodosLoading} from "../../ui/TodosLoading";
import {TodosError} from "../../ui/TodosError";
import {EmptyTodos} from "../../ui/EmptyTodos";
import {TodoItem} from "../../ui/TodoItem";
import {CreateTodoButton} from "../../ui/CreateTodoButton";

function HomePage() {
  const navigate = useNavigate();

  const {loading, error, searchedTodos, completeTodo, deleteTodo} =
    React.useContext(TodoContext);

  return (
    <>
      <TodoSearch />

      <TodoList>
        {loading && (
          <>
            <TodosLoading />
            <TodosLoading />
            <TodosLoading />
          </>
        )}
        {error && <TodosError />}
        {!loading && searchedTodos.length === 0 && <EmptyTodos />}

        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            text={todo.text}
            completed={todo.completed}
            onEdit={() => navigate(`/edit/${todo._id}`)}
            onComplete={() => completeTodo(todo._id)}
            onDelete={() => deleteTodo(todo._id)}
          />
        ))}
      </TodoList>

      <CreateTodoButton onClick={() => navigate("/new")} />
    </>
  );
}

export {HomePage};
