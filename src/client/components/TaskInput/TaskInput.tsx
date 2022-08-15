import { ChangeEventHandler } from "react";
import styles from './TaskInput.module.css';

const TaskInput = ({ placeholder, onChange, value}: {placeholder: string, onChange: ChangeEventHandler<HTMLInputElement>, value: string}) => {
  return (
    <input
      className={styles.input}
      onChange={onChange}
      value={value}
      type="text"
      autoComplete="off"
      placeholder={placeholder}
    />
  );
};

export default TaskInput;
