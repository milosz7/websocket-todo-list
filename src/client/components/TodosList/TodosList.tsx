import { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { todoContext } from "../../types/types";
import TodoListItem from "../TodoListItem/TodoListItem";
import styles from './TodosList.module.css';
import AddTodoForm from "../AddTodoForm/AddTodoForm";

const TodosList = () => {
  const { todos, removeTodo, editTodo } = useContext(TodosContext) as todoContext;

  return (
    <ul className={styles.list}>
      {todos.map((todoData) => <TodoListItem key={todoData.id} removeTodo={removeTodo} editTodo={editTodo} {...todoData} />)}
      {!todos.length && <h2 className={styles.noTodos}>Everything is done! Time to rest.</h2>}
      <div className={styles.layout}>
      <AddTodoForm />
      </div>
    </ul>
  )
};

export default TodosList;
