import { createContext, useState, useEffect, PropsWithChildren, useContext } from "react";
import { TodoItem } from "../types/todo.interface";

interface TodoContextData {
  todoItems: TodoItem[];
  setTodoItems: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

export const TodoProvider = (props: PropsWithChildren) => {

  const [todoItems, setTodoItems] = useState<TodoItem[] | null>(null);

  useEffect(() => {
    const getData = (list: TodoItem[]) => {
      setTodoItems(list)
    }
    window.electron.send('message-from-main');
    window.electron.on('message-from-main-reply', getData);

    return window.electron.removeListener('message-from-main-reply', getData)
  }, []);

  useEffect(() => {
    todoItems && window.electron.send('save-data', todoItems);
  }, [todoItems]);

  const value = { todoItems, setTodoItems };

  return (
    <TodoContext.Provider value={value}>
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);