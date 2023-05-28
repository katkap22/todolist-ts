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

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, setTasksObj] = useState({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "Redux", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ]
  })

  function removeTodolist(todolistId:string) {
    let filteredTodoList = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodoList);
    delete tasksObj[todolistId];
    setTasksObj({...tasksObj});
  }

  function removeTask(id: string, todolistId:string) {
    // let filteredTasks = tasksObj[todolistId].filter((task) => task.id !== id); redundant - излишняя переменная
    // tasksObj[todolistId] = filteredTasks;

    tasksObj[todolistId] = tasksObj[todolistId].filter((task) => task.id !== id);
    setTasksObj({...tasksObj});
  }

  function addTask(title: string,  todolistId:string) {
    let task = {id: v1(), title: title, isDone: false};
    tasksObj[todolistId] = [task, ...tasksObj[todolistId]];
    setTasksObj({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId:string) {
    let task = tasksObj[todolistId].find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasksObj({...tasksObj}); //44 мин
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

          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === "completed") {
            tasksForTodoList = tasksObj[tl.id].filter((task) => task.isDone);
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasksObj[tl.id].filter((task) => !task.isDone);
          }

          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodoList}
              removeTask={removeTask}
              removeTodolist={removeTodolist}
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
