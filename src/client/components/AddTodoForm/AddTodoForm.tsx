import React, { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { todoContext } from '../../types/types';
import shortid from 'shortid';
import styles from './AddTodoForm.module.css';
import TaskInput from '../TaskInput/TaskInput';
import { toast } from 'react-toastify';

const AddTodoForm = () => {
  const { addTodo } = useContext(TodosContext) as todoContext;
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoText) {
      const newTodo = {
        id: shortid(),
        task: todoText,
      };
      addTodo(newTodo);
      setTodoText('');
    }
    if (!todoText) {
      toast.error('Field cannot be empty if you want to add a new task.', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <h2 className={styles.heading}>Add a task</h2>
      <TaskInput
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="What do we have to do?"
        value={todoText}
      />
      <button className={styles.button} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
