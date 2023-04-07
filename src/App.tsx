import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {

  let [tasks, setTasks] = useState< Array<TaskType> >([
    {id: 1, title: 'CSS', isDone: true},
    {id: 2, title: 'JS', isDone: false},
    {id: 3, title: 'React', isDone: true},
    {id: 4, title: 'Redux', isDone: true},
  ]);

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: number) {
    let filteredTasks = tasks.filter( task =>  task.id !== id )
    setTasks(filteredTasks);
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(task => task.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(task => task.isDone === false);
  }

  return (
    <div className="App">
      <Todolist title={"What to learn"} 
          tasks={tasksForTodoList} 
          removeTask={removeTask}
          changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
