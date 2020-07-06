import React from 'react';
import TodosMenu from './TodosMenu';
import TodosList from './TodosList';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './reducers/todosReducer';
import './App.css';
import TodosFilter from './TodosFilter';

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Todos</h1>
            <TodosMenu />
            <TodosFilter />
            <TodosList />
        </div>
    );
}

export default App;
