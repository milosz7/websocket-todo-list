import Container from './components/Container/Container';
import { useState } from 'react';
import { todoData } from './types/types';
import { TodosContext } from './context/TodosContext';
import TodosList from './components/TodosList/TodosList';
import { socket } from './client-socket'

const App = () => {
  const [todos, setTodos] = useState<todoData[]>([]);

  socket.on('getData', (data: todoData[]) => {
    setTodos(data);
  });

  const addTodo = (newTodo: todoData) => {
    setTodos([...todos, newTodo])
    socket.emit('addTodo', newTodo);
  };

  const removeTodo = (todoToRemoveId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoToRemoveId));
  }

  return (
    <TodosContext.Provider value={{todos, addTodo, removeTodo}}>
      <Container>
        <h1>To-do list</h1>
        <TodosList />
      </Container>
    </TodosContext.Provider>
  );
};

export default App;
