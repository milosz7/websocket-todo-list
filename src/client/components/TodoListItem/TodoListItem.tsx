import { todoData } from '../../types/types';
import styles from './TodoListItem.module.css';
import { useState } from 'react';
import TaskInput from '../TaskInput/TaskInput';
import { toast } from 'react-toastify';
import React from 'react';

const TodoListItem = React.memo(
  ({
    id,
    task,
    editTodo,
    removeTodo,
  }: {
    id: string;
    task: string;
    editTodo: (todoToEdit: todoData) => void;
    removeTodo: (todoToRemoveId: string) => void;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState('');

    const manageTodoEditing = (id: string) => {
      if (newValue) {
        const editedTodo = {
          id,
          task: newValue,
        };
        editTodo(editedTodo);
        setIsEditing(false);
        setNewValue('');
      } else {
        toast.error('Field cannot be empty if you want to edit data.', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    return (
      <li className={styles.item}>
        {!isEditing && (
          <>
            <p className={styles.task}>{task}</p>
            <button className={styles.successButton} onClick={() => removeTodo(id)} type="button">
              done
            </button>
            <button
              className={styles.warningButton}
              onClick={() => setIsEditing(true)}
              type="button"
            >
              edit
            </button>
          </>
        )}
        {isEditing && (
          <>
            <TaskInput
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter new todo text"
            />
            <button
              className={styles.undoButton}
              onClick={() => {
                setIsEditing(false);
                setNewValue('');
              }}
            >
              undo
            </button>
            <button className={styles.successButton} onClick={() => manageTodoEditing(id)}>
              save
            </button>
          </>
        )}
      </li>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.task === nextProps.task;
  }
);

export default TodoListItem;
