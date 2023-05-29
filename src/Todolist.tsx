import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompleteClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id);
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle);

    const addTask = (title: string) => props.addTask(title, props.id);

    return (
        <div>
            <h3><EditableSpan title={props.title}
                              onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id, props.id);
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
                        };
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id);
                        };

                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan title={task.title}
                                              onChange={onChangeTitleHandler}/>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? "active-filter" : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? "active-filter" : ''}>Active
                </button>
                <button onClick={onCompleteClickHandler}
                        className={props.filter === 'completed' ? "active-filter" : ''}>Completed
                </button>
            </div>
        </div>
    );
}


