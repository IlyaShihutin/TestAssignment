export { };

declare global {
  interface Window {
    electron: {
      send: (channel: string, data?: TodoItem[]) => void;
      on: (channel: string, func: (...args: TodoItem[]) => void) => void;
      removeListener: (channel: string, func: (...args: TodoItem[]) => void) => void
    };
  }
}
