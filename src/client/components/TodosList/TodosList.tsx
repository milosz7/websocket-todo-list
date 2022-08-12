import { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { todoContext } from "../../types/types";
import TodoListItem from "../TodoListItem/TodoListItem";

const TodosList = () => {
  const { todos } = useContext(TodosContext) as todoContext;

  return (
    <div>
      {todos.map((todoData, idx) => <TodoListItem key={idx} {...todoData} />)}
    </div>
  )
};

export default TodosList;
