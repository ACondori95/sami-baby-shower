import React from "react";
import {AttendantContext} from "../../AttendantContext";
import {useNavigate} from "react-router-dom";
import {TodosError} from "../../ui/TodosError";
import {EmptyTodos} from "../../ui/EmptyTodos";
import {AttendantSearch} from "../../ui/AttendantSearch";
import {AttendantList} from "../../ui/AttendantList";
import {AttendantLoading} from "../../ui/AttendantLoading";
import {CreateAttendantButton} from "../../ui/CreateAttendantButton";
import {AttendantItem} from "../../ui/AttendantItem";

function HomePage() {
  const navigate = useNavigate();

  const {loading, error, searchedAttendants, confirmAttendance} =
    React.useContext(AttendantContext);

  return (
    <>
      <AttendantSearch />

      <AttendantList>
        {loading && (
          <>
            <AttendantLoading />
            <AttendantLoading />
            <AttendantLoading />
          </>
        )}
        {error && <TodosError />}
        {!loading && searchedAttendants.length === 0 && <EmptyTodos />}

        {searchedAttendants.map((att) => (
          <AttendantItem
            key={att._id}
            name={att.name}
            accepted={att.accepted}
            onEdit={() => navigate(`/edit/${att._id}`)}
            onConfirm={() => confirmAttendance(att._id)}
          />
        ))}
      </AttendantList>

      <CreateAttendantButton onClick={() => navigate("/new")} />
    </>
  );
}

export {HomePage};
