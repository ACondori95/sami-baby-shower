import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AttendantContext} from "../../AttendantContext";
import "./TodoForm.css";

function AttendantForm() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {addAttendant, searchedAttendants} = React.useContext(AttendantContext);

  const todoToEdit = searchedAttendants.find((todo) => todo.id === Number(id));
  const [newTodoValue, setNewTodoValue] = React.useState(
    todoToEdit ? todoToEdit.text : ""
  );

  const onSubmit = (event) => {
    event.preventDefault();
    addAttendant(newTodoValue);
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
          Añadir
        </button>
      </div>
    </form>
  );
}

export {AttendantForm};
