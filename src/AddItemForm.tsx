import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropType = {
    addItem: (title: string) => void;
}

export function AddItemForm(props: AddItemFormPropType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13) {
            if (title.trim() !== "" && title.trim() !== "kakashka") {
                props.addItem(title.trim());
                setTitle("");
            } else {
                setError("Title is required");
            }
        }
    };
    const addTask = () => {
        if (title.trim() !== '' && title.trim() !== 'kakashka') {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError('Title is required');
        }
    }

    return (
        <div>
            <TextField
                sx={{marginRight: '20px', mb: '10px'}}
                variant="outlined"
                label={'Type value'}
                size={"small"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <IconButton
                color={"primary"}
                onClick={addTask}>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <ControlPoint />
            </IconButton>
        </div>
    )
}