import React from "react";
import { Header, TodoInput, TodoList } from "./components";

import "./style.scss";
function Home() {

  return (
    <div className='app' >
      <div className='wrapper'>
        <Header />
        <TodoInput />
        <TodoList />
      </div>
    </div>
  );
}

export default Home;
