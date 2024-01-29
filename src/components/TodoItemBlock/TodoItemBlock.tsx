import { useState, useEffect } from "react";
import clsx from "clsx";

import { useTodo } from "../../store/TodoContext";

import { TodoItem } from "../../types/todo.interface";

import { validateInput } from "../../utils/textValidate";

import CheckIcon from "../Icons/CheckIcon";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import UpdateIcon from "../Icons/UpdateIcon";
import CloseIcon from "../Icons/CloseIcon";

import "./style.scss";

interface TodoItemBlockProps {
  data: TodoItem;
}
const TodoItemBlock: React.FC<TodoItemBlockProps> = ({ data }) => {
  const { todoItems, setTodoItems } = useTodo();

  const [todoText, setTodoText] = useState<string>(data.text);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  useEffect(() => {
    validateInput(todoText, setIsInputValid);
  }, [todoText]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const handleUpdateTodo = () => {
    if (isInputValid) {
      const copyTodoItems: TodoItem[] = [...todoItems];
      const selectedTodo: TodoItem = copyTodoItems.find((todo) => todo.id === data.id)!;
      selectedTodo.text = todoText;
      setTodoItems(copyTodoItems);
      setIsEditable(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key.toLowerCase() === "enter") {
      handleUpdateTodo();
    }
  };

  const handleDeleteTodo = () => {
    const filteredTodoItems = todoItems.filter(
      (todo) => todo.id !== data.id
    );
    setTodoItems(filteredTodoItems);
  };

  const completeTodo = () => {
    const copyTodoItems: TodoItem[] = [...todoItems];
    const selectedTodo: TodoItem = copyTodoItems.find((todo) => todo.id === data.id)!;
    selectedTodo.isCompleted = !selectedTodo.isCompleted;
    setTodoItems(copyTodoItems);
  };

  return (
    <li className='item'>
      {!isEditable && (
        <span
          className={clsx('text', data.isCompleted && 'line')}
          data-testid="todoSpan"
        >
          {data.text}
        </span>
      )}

      {isEditable && (
        <input
          value={todoText}
          onChange={handleChangeInput}
          className='input'
          onKeyDown={handleKeyDown}
        />
      )}

      {!isEditable && (
        <div className='icon_wrapper'>
          <button className='button' onClick={completeTodo}>
            <CheckIcon className={clsx('icon', data.isCompleted && 'completed_icon')} />
          </button>

          <button className='button' onClick={() => setIsEditable(true)}>
            <EditIcon className='icon' />
          </button>

          <button className='button' onClick={handleDeleteTodo}>
            <DeleteIcon className='icon' />
          </button>
        </div>
      )}

      {isEditable && (
        <div className='editable_icon'>
          <button
            className='button'
            disabled={!isInputValid}
            onClick={handleUpdateTodo}
          >
            <UpdateIcon className='icon' />
          </button>

          <button
            className='button'
            onClick={() => setIsEditable(false)}
          >
            <CloseIcon className='icon' />
          </button>

        </div>
      )}
    </li>
  );
};

export default TodoItemBlock;
