import React from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './reducers/todosReducer';
import './TodosMenu.css';

function TodosMenu() {
    const [title, setTitle] = React.useState('');
    const dispatch = useDispatch();

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(addTodo(title));
        setTitle('');
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    return (
        <div className="todos-menu">
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="todo-title">Title:</label>
                <input
                    type="text"
                    name="todo-title"
                    id="todo-title"
                    value={title}
                    onChange={handleChange}
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default TodosMenu;
