import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {TodoContext} from "../../TodoContext";
import "./TodoForm.css";

function TodoForm() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {addTodo, editTodo, searchedTodos} = React.useContext(TodoContext);

  const todoToEdit = searchedTodos.find((todo) => todo.id === Number(id));
  const [newTodoValue, setNewTodoValue] = React.useState(
    todoToEdit ? todoToEdit.text : ""
  );

  const onSubmit = (event) => {
    event.preventDefault();
    if (id) {
      editTodo(Number(id), newTodoValue);
    } else {
      addTodo(newTodoValue);
    }
    navigate("/");
  };

  const onCancel = () => navigate("/");

  const onChange = (event) => setNewTodoValue(event.target.value);

  return (
    <form onSubmit={onSubmit}>
      <textarea
        placeholder='¡Agregá tu propio regalo!'
        value={newTodoValue}
        onChange={onChange}
      />
      <div className='TodoForm-buttonContainer'>
        <button
          type='button'
          className='TodoForm-button TodoForm-button--cancel'
          onClick={onCancel}>
          Cancelar
        </button>
        <button type='submit' className='TodoForm-button TodoForm-button--add'>
          {id ? "Editar" : "Añadir"}
        </button>
      </div>
    </form>
  );
}

export {TodoForm};
