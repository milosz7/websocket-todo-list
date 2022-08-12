import React, { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { todoContext } from '../../types/types';
import shortid from 'shortid';

const AddTodoForm = () => {
  const { addTodo } = useContext(TodosContext) as todoContext;
  const [todoText, setTodoText] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoText) {
      const newTodo = {
        id: shortid(),
        task: todoText,
      };
      setError(false);
      addTodo(newTodo);
      setTodoText('');
    }
    if (!todoText) {
      setError(true);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        onChange={(e) => setTodoText(e.target.value)}
        value={todoText}
        type="text"
        autoComplete="off"
        placeholder="What do we have to do?"
      />
      <button type="submit">Add</button>
      {error && <p>Please enter any valid value!</p>}
    </form>
  );
};

export default AddTodoForm;
