import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
            <h2><EditableSpan title={props.title}
                              onChange={changeTodolistTitle}/>
                <IconButton
                    aria-label="delete"
                    onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h2>
            <AddItemForm addItem={addTask}/>
            <div>
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
                            <div key={task.id} className={task.isDone ? "is-done" : ""}>
                                <Checkbox
                                    color="secondary"
                                    checked={task.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                {/*s<span>{task.title}</span>*/}
                                <EditableSpan title={task.title}
                                              onChange={onChangeTitleHandler}/>
                                <IconButton
                                    aria-label="delete"
                                    onClick={onRemoveHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        );
                    })
                }
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? "contained" : "text"}
                    color={'success'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    color={'primary'}
                    variant={props.filter === 'active' ? "contained" : 'text'}>Active
                </Button>
                <Button
                    onClick={onCompleteClickHandler}
                    color={'secondary'}
                    variant={props.filter === 'completed' ? "contained" : 'text'}>Completed
                </Button>
            </div>
        </div>
    );
}


