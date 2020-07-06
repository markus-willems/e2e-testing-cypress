import React from 'react';
import TodoItem from './TodoItem';
import './TodosList.css';
import { selectTodosData } from './reducers/todosReducer';
import { useSelector } from 'react-redux';

function TodosList() {
    const { todos, loading, error } = useSelector(selectTodosData);

    return (
        <>
            {loading ? (
                'Loading...'
            ) : (
                <>
                    {error ? (
                        'Something went wrong...'
                    ) : (
                        <ul className="todos-list">
                            {todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </>
    );
}

export default TodosList;
