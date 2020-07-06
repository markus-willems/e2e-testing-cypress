import React from 'react';
import './TodosFilter.css';
import { useDispatch } from 'react-redux';
import { filterTodosAll, filterTodosDone, filterTodosUndone } from './reducers/todosReducer';

function TodosFilter() {
    const dispatch = useDispatch();

    return (
        <ul className="filter">
            <li>
                <button onClick={() => dispatch(filterTodosAll())}>All</button>
            </li>
            <li>
                <button onClick={() => dispatch(filterTodosDone())}>Done</button>
            </li>
            <li>
                <button onClick={() => dispatch(filterTodosUndone())}>Undone</button>
            </li>
        </ul>
    );
}

export default TodosFilter;
