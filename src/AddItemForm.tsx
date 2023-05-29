import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}