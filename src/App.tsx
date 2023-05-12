import React, { useState } from "react";
// import { setConstantValue } from "typescript";
import { v1 } from "uuid";
import "./App.css";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Redux", isDone: true },
  ]);

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: v1(), title: "What to learn", filter: "active" },
    { id: v1(), title: "What to buy", filter: "completed" },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if(todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
    
  }

  

  return (
    <div className="App">
      {
        todolists.map((tl) => {

          let tasksForTodoList = tasks;
          if (tl.filter === "completed") {
            tasksForTodoList = tasks.filter((task) => task.isDone);
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasks.filter((task) => !task.isDone);
          }

          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodoList}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
            />
          );
        })
      }
    </div>
  );
}

export default App;
