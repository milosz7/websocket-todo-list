import express from 'express';
import path from 'path';
import { Server } from 'socket.io';

interface todoData {
  id: string;
  task: string;
}

const buildDir = path.join(process.cwd() + '/build');
const app = express();
const port = 8000;

const todos: todoData[] = [
  {id: '1', task: 'Go out with the dog.'},
  {id: '2', task: 'Study for at least 2 hours.'},
  {id: '3', task: 'Clean up the kitchen.'}
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.use((req, res) => {
  const errorObject = {
    message: 'Not found',
    status: 404,
  };
  res.status(404);
  res.send(errorObject)
})

const server = app.listen(port, () => {
  console.log(`running on port: ${port}.`);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
  }
});

io.on('connection', (socket) => {
  console.log(todos)
  socket.emit('getData', todos);
  socket.on('addTodo', (newTodo: todoData) => {
    todos.push(newTodo);
    socket.broadcast.emit('getData', todos);
  });
  socket.on('removeTodo', (todoToRemoveId) => {
    const todoToRemove = todos.findIndex(todo => todo.id === todoToRemoveId);
    todos.splice(todoToRemove, 1);
    socket.broadcast.emit('getData', todos);
  })
  console.log(socket.id)
});
