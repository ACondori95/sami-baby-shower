import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./home/HomePage";
import {AttendantProvider} from "../AttendantContext";
import {NewAttendantPage} from "./new/NewAttendantPage";

function App() {
  return (
    <AttendantProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/new' element={<NewAttendantPage />} />
          <Route path='*' element={<p>Not Found</p>} />
        </Routes>
      </HashRouter>
    </AttendantProvider>
  );
}

export {App};
