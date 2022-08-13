import { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { todoContext } from "../../types/types";
import TodoListItem from "../TodoListItem/TodoListItem";
import styles from './TodosList.module.css';
import AddTodoForm from "../AddTodoForm/AddTodoForm";

const TodosList = () => {
  const { todos } = useContext(TodosContext) as todoContext;

  return (
    <ul className={styles.list}>
      {todos.map((todoData, idx) => <TodoListItem key={idx} {...todoData} />)}
      <div className={styles.layout}>
      <AddTodoForm />
      </div>
    </ul>
  )
};

export default TodosList;
