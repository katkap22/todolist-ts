import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id:string
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value);
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.charCode === 13) {
      if (newTaskTitle.trim() !== "" && newTaskTitle.trim() !== "kakashka") {
        props.addTask(newTaskTitle.trim(), props.id);
        setNewTaskTitle("");
      } else {
        setError("Title is required");
      }
    }
  };

  const addTask = ()=> {
    if (newTaskTitle.trim() !== '' && newTaskTitle.trim() !== 'kakashka') {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
    } else {
      setError('Title is required');
    }
  }

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompleteClickHandler = () => props.changeFilter("completed", props.id);
  const removeTodolist = () => props.removeTodolist(props.id);

  return (
    <div>
      <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => props.removeTask(task.id, props.id);
          const onChangeStatusHandler = (
            event: ChangeEvent<HTMLInputElement>
          ) => {
            console.log(
              task.id + " want to change on " + event.currentTarget.checked
            );
            props.changeTaskStatus(task.id, event.currentTarget.checked, props.id);
          };

          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeStatusHandler}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler} 
                className={props.filter === 'all' ? "active-filter" : ''}>All</button>
        <button onClick={onActiveClickHandler} 
                className={props.filter === 'active' ? "active-filter" : ''}>Active</button>
        <button onClick={onCompleteClickHandler} 
                className={props.filter === 'completed' ? "active-filter" : ''}>Completed</button>
      </div>
    </div>
  );
}
