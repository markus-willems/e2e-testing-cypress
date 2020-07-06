import React from 'react';
import { Todo } from './api/todos';
import './TodoItem.css';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from './reducers/todosReducer';

type TodoProps = {
    todo: Todo;
};

function TodoItem({ todo }: TodoProps) {
    const dispatch = useDispatch();

    function toggleHandler(id: string) {
        dispatch(toggleTodo(id));
    }

    function deleteHandler(id: string) {
        dispatch(deleteTodo(id));
    }

    return (
        <li className="todo-item">
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <button className="btn btn-delete" onClick={() => deleteHandler(todo.id)}>
                Delete
            </button>
            <button className="btn" onClick={() => toggleHandler(todo.id)}>
                {!todo.completed ? 'Done' : 'Do'}
            </button>
        </li>
    );
}

export default TodoItem;
