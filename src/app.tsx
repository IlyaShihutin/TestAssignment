import React from 'react';
import { createRoot } from 'react-dom/client';
import { TodoProvider } from './store/TodoContext';
import Home from './Home';

const root = createRoot(document.body);
root.render(<React.StrictMode>
  <TodoProvider>
    <Home />
  </TodoProvider>
</React.StrictMode>);