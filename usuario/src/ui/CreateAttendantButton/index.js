import "./CreateTodoButton.css";

function CreateAttendantButton(props) {
  return (
    <button className='CreateTodoButton' onClick={props.onClick}>
      +
    </button>
  );
}

export {CreateAttendantButton};
