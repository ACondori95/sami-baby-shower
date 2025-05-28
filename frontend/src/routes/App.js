import React from "react";
import {TodoProvider} from "../TodoContext";
import {HashRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./home/HomePage";
import {NewTodoPage} from "./new/NewTodoPage";

function App() {
  return (
    <TodoProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/new' element={<NewTodoPage />} />
          <Route path='*' element={<p>Not Found</p>} />
        </Routes>
      </HashRouter>
    </TodoProvider>
  );
}

export {App};
