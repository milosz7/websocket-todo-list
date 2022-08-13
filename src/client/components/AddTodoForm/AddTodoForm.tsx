import React, { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { todoContext } from '../../types/types';
import shortid from 'shortid';
import styles from './AddTodoForm.module.css';

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
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <h2 className={styles.heading}>Add a task</h2>
      <input
        className={styles.input}
        onChange={(e) => setTodoText(e.target.value)}
        value={todoText}
        type="text"
        autoComplete="off"
        placeholder="What do we have to do?"
      />
      <button className={styles.button} type="submit">Add</button>
      {error && <small className={styles.error}>Please enter any valid value!</small>}
    </form>
  );
};

export default AddTodoForm;
