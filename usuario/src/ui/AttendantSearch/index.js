import React from "react";
import {AttendantContext} from "../../AttendantContext";
import "./TodoSearch.css";

function AttendantSearch() {
  const {searchValue, setSearchValue} = React.useContext(AttendantContext);

  return (
    <input
      placeholder='Buscá un regalo para Sami'
      className='TodoSearch'
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
      }}
    />
  );
}

export {AttendantSearch};
