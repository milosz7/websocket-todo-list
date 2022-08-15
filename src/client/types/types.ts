export interface todoData {
  id: string;
  task: string;
}

export interface todoContext {
  todos: todoData[];
  addTodo: (newTodo: todoData) => void;
  removeTodo: (todoToRemoveId: string) => void;
  editTodo: (editedTodo: todoData) => void;
}
