import Container from './components/Container/Container';
import { useState } from 'react';
import { todoData } from './types/types';
import { TodosContext } from './context/TodosContext';
import TodosList from './components/TodosList/TodosList';
import { socket } from './client-socket';
import Spinner from './components/Spinner/Spinner';

const App = () => {
  const [todos, setTodos] = useState<todoData[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [dataFetched, setdataFetched] = useState(false);
  const [socketTimeout, setSocketTimeout] = useState<NodeJS.Timeout | null>(null)

  socket.on('connect_error', () => {
    setIsConnecting(true);
    if (!socketTimeout) {
      setSocketTimeout(setTimeout(() => {
        if (!socket.connected) {
          socket.connect();
        }
        if (socket.connected) {
          setIsConnecting(false);
        }
      }, 1000));
    }
  });

  socket.on('getData', (data: todoData[]) => {
    setTodos(data);
    setdataFetched(true)
  });

  const addTodo = (newTodo: todoData) => {
    setTodos([...todos, newTodo]);
    socket.emit('addTodo', newTodo);
  };

  const removeTodo = (todoToRemoveId: string) => {
    setTodos(todos.filter((todo) => todo.id !== todoToRemoveId));
    socket.emit('removeTodo', todoToRemoveId);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo }}>
      <Container>
        {isConnecting &&
          <>
            <h1>Failed to connect, trying to reconnect.</h1>
            <Spinner />
          </>
          }
        {(!isConnecting && dataFetched) && (
          <>
            <h1>To-do list</h1>
            <TodosList />
          </>
        )}
      </Container>
    </TodosContext.Provider>
  );
};

export default App;
