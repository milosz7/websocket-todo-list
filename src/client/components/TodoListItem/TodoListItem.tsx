import { TodosContext } from "../../context/TodosContext";
import { useContext } from "react";
import { todoContext } from "../../types/types";

const TodoListItem = ({ id, task }: {id: string, task: string}) => {
  const { removeTodo } = useContext(TodosContext) as todoContext;
  
  return (
    <li>
      <p>{task}</p>
      <button onClick={() => removeTodo(id)} type="button">Mark as finished</button>
    </li>
  )
};

export default TodoListItem;
