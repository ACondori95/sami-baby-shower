import {CompleteIcon} from "../TodoIcon/CompleteIcon";
import "./TodoItem.css";

function AttendantItem(props) {
  return (
    <li className='TodoItem'>
      <CompleteIcon completed={props.accepted} onComplete={props.onConfirm} />
      <p className={`TodoItem-p ${props.accepted && "TodoItem-p--complete"}`}>
        {props.name}
      </p>
    </li>
  );
}

export {AttendantItem};
