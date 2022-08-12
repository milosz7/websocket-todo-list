import Container from './components/Container/Container';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { todoData } from './types/types';
import { TodosContext } from './context/TodosContext';
import TodosList from './components/TodosList/TodosList';

const SERVER_URL = 'http://localhost:8000';
const socket = io(SERVER_URL);

const App = () => {
  const [todos, setTodos] = useState<todoData[]>([]);
  
  useEffect(() => {
    socket.on('getData', (data: todoData[]) => {
      setTodos(data);
    });
  }, []);

  const addTodo = (newTodo: todoData) => {
    setTodos([...todos, newTodo])
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
