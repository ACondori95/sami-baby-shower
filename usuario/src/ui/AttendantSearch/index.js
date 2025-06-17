import React from "react";
import {AttendantContext} from "../../AttendantContext";
import "./TodoSearch.css";

function AttendantSearch() {
  const {searchValue, setSearchValue} = React.useContext(AttendantContext);

  return (
    <div className='TodoSearch-container'>
      <input
        placeholder='¡Buscate y Confirmá!'
        className='TodoSearch'
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
    </div>
  );
}

export {AttendantSearch};
