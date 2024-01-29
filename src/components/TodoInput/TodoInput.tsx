import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useTodo } from "../../store/TodoContext";

import { TodoItem } from "../../types/todo.interface";

import { validateInput } from "../../utils/textValidate";

import AddIcon from "../Icons/AddIcon";

import "./style.scss";


const TodoInput: React.FC = () => {
  const { setTodoItems } = useTodo();

  const [todoText, setTodoText] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  useEffect(() => {
    validateInput(todoText, setIsInputValid);
  }, [todoText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const addTodo = () => {
    if (isInputValid) {
      const todo: TodoItem = {
        id: uuidv4(),
        text: todoText,
        isCompleted: false,
      };
      setTodoItems((prevState) => [todo, ...prevState]);
      setTodoText("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key.toLowerCase() === "enter" && isInputValid) {
      addTodo();
    }
  };

  return (
    <div className='input_wrapper'>
      <input
        type="text"
        placeholder="Add todo"
        className='input'
        value={todoText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className='button'
        disabled={!isInputValid}
        onClick={addTodo}
      >
        <AddIcon className='input_icon' />
      </button>
    </div>
  );
};

export default TodoInput;
