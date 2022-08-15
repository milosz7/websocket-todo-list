import { TodosContext } from '../../context/TodosContext';
import { useContext } from 'react';
import { todoContext } from '../../types/types';
import styles from './TodoListItem.module.css';
import { useState } from 'react';
import TaskInput from '../TaskInput/TaskInput';

const TodoListItem = ({ id, task }: { id: string; task: string }) => {
  const { removeTodo, editTodo } = useContext(TodosContext) as todoContext;
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
          <button className={styles.warningButton} onClick={() => setIsEditing(true)} type="button">
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
          <button className={styles.successButton} onClick={() => manageTodoEditing(id)}>save</button>
        </>
      )}
    </li>
  );
};

export default TodoListItem;
