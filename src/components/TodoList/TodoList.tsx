import { useState, useEffect } from "react";
import clsx from "clsx";

import { useTodo } from "../../store/TodoContext";

import { FilterParameter } from "../../types/filter.inteface";

import TodoItemBlock from "../TodoItemBlock/TodoItemBlock";

import "./style.scss";


const TodoList: React.FC = () => {
  const { todoItems } = useTodo();

  const [filteredTodoItems, setFilteredTodoItems] = useState(todoItems);
  const [filterParameter, setFilterParameter] = useState<FilterParameter>(FilterParameter.ALL);

  useEffect(() => {
    const filteredItems = filterParameter === FilterParameter.COMPLITED ? todoItems.filter((todo) => todo.isCompleted === true) : todoItems;
    setFilteredTodoItems(filteredItems);
  }, [filterParameter, todoItems]);

  const filterTodo = () => {
    const filteredItems = todoItems.filter((todo) => todo.isCompleted === true);
    setFilteredTodoItems(filteredItems);
    setFilterParameter(FilterParameter.COMPLITED);
  };

  const clearTodo = () => {
    setFilteredTodoItems(todoItems);
    setFilterParameter(FilterParameter.ALL);
  };

  return (
    <>
      <div className='filter_wrapper'>
        <p
          onClick={clearTodo}
          className={clsx('text', filterParameter === FilterParameter.ALL && 'selected')}
        >
          {FilterParameter.ALL}
        </p>
        <p>&nbsp;/&nbsp;</p>
        <p
          onClick={filterTodo}
          className={clsx('text', filterParameter === FilterParameter.COMPLITED && 'selected')}
        >
          {FilterParameter.COMPLITED}
        </p>
      </div>
      {
        filteredTodoItems?.length
          ? <ul className='list_wrapper'>
            {!!filteredTodoItems?.length &&
              filteredTodoItems.map((todo) => (
                <TodoItemBlock key={todo.id} data={todo} />
              ))}
          </ul>
          : <p className="empty_text">Empty List</p>
      }
    </>

  );
};

export default TodoList;
