import { TodosContext } from "../../context/TodosContext";
import { useContext } from "react";
import { todoContext } from "../../types/types";
import styles from './TodoListItem.module.css';

const TodoListItem = ({ id, task }: {id: string, task: string}) => {
  const { removeTodo } = useContext(TodosContext) as todoContext;
  
  return (
    <li className={styles.item}>
      <p>{task}</p>
      <button className={styles.button} onClick={() => removeTodo(id)} type="button">done</button>
    </li>
  )
};

export default TodoListItem;
