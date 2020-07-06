import produce, { Draft } from 'immer';
import { Todo, getTodos } from '../api/todos';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../store/store';
import { Action } from 'redux';

const ADD_TODO = 'todos/add';
const DELETE_TODO = 'todos/delete';
const TOGGLE_TODO = 'todos/toggle';
const FETCH_TODOS_REQUEST = 'todos/request';
const FETCH_TODOS_SUCCESS = 'todos/request-success';
const FETCH_TODOS_FAILURE = 'todos/request-failure';
const FILTER_TODOS_ALL = 'todos/filter-all';
const FILTER_TODOS_DONE = 'todos/filter-done';
const FILTER_TODOS_UNDONE = 'todos/filter-undone';

type AddTodoAction = {
    type: typeof ADD_TODO;
    data: {
        title: string;
    };
};

export function addTodo(title: string): AddTodoAction {
    return {
        type: ADD_TODO,
        data: {
            title,
        },
    };
}

type DeleteTodoAction = {
    type: typeof DELETE_TODO;
    data: {
        id: string;
    };
};

export function deleteTodo(id: string): DeleteTodoAction {
    return {
        type: DELETE_TODO,
        data: {
            id,
        },
    };
}

type ToggleTodoAction = {
    type: typeof TOGGLE_TODO;
    data: {
        id: string;
    };
};

export function toggleTodo(id: string): ToggleTodoAction {
    return {
        type: TOGGLE_TODO,
        data: {
            id,
        },
    };
}

type RequestTodosAction = {
    type: typeof FETCH_TODOS_REQUEST;
};

function requestTodos(): RequestTodosAction {
    return {
        type: FETCH_TODOS_REQUEST,
    };
}

type RequestTodosSuccessAction = {
    type: typeof FETCH_TODOS_SUCCESS;
    data: {
        error: false;
        todos: Todo[];
    };
};

function requestTodosSuccess(todos: Todo[]): RequestTodosSuccessAction {
    return {
        type: FETCH_TODOS_SUCCESS,
        data: {
            error: false,
            todos,
        },
    };
}

type RequestTodosFailureAction = {
    type: typeof FETCH_TODOS_FAILURE;
    data: {
        error: true;
        todos: null;
    };
};

function requestTodosFailure(): RequestTodosFailureAction {
    return {
        type: FETCH_TODOS_FAILURE,
        data: {
            error: true,
            todos: null,
        },
    };
}

export function fetchTodos(): ThunkAction<void, ApplicationState, unknown, Action<string>> {
    return async function (dispatch) {
        dispatch(requestTodos());
        try {
            const todos = await getTodos();
            dispatch(requestTodosSuccess(todos));
        } catch (_) {
            dispatch(requestTodosFailure());
        }
    };
}

type FilterTodosAllAction = {
    type: typeof FILTER_TODOS_ALL;
    data: {
        filter: 'all';
    };
};

export function filterTodosAll(): FilterTodosAllAction {
    return {
        type: FILTER_TODOS_ALL,
        data: {
            filter: 'all',
        },
    };
}

type FilterTodosDoneAction = {
    type: typeof FILTER_TODOS_DONE;
    data: {
        filter: 'done';
    };
};

export function filterTodosDone(): FilterTodosDoneAction {
    return {
        type: FILTER_TODOS_DONE,
        data: {
            filter: 'done',
        },
    };
}

type FilterTodosUndoneAction = {
    type: typeof FILTER_TODOS_UNDONE;
    data: {
        filter: 'undone';
    };
};

export function filterTodosUndone(): FilterTodosUndoneAction {
    return {
        type: FILTER_TODOS_UNDONE,
        data: {
            filter: 'undone',
        },
    };
}

type TodosActions =
    | AddTodoAction
    | DeleteTodoAction
    | ToggleTodoAction
    | RequestTodosAction
    | RequestTodosSuccessAction
    | RequestTodosFailureAction
    | FilterTodosAllAction
    | FilterTodosDoneAction
    | FilterTodosUndoneAction;

type TodosState = {
    todos: Todo[];
    loading: boolean;
    error: boolean;
    filter: 'all' | 'done' | 'undone';
};

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: false,
    filter: 'all',
};

function createTodo(title: string): Todo {
    return {
        id: uuidv4(),
        title,
        completed: false,
    };
}

const todosReducer = produce((draft: Draft<TodosState> = initialState, action: TodosActions) => {
    switch (action.type) {
        case ADD_TODO:
            draft.todos.push(createTodo(action.data.title));
            break;
        case DELETE_TODO:
            draft.todos = draft.todos.filter((todo) => todo.id !== action.data.id);
            break;
        case TOGGLE_TODO:
            draft.todos = draft.todos.map((todo) => {
                if (todo.id === action.data.id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                } else {
                    return todo;
                }
            });
            break;
        case FETCH_TODOS_REQUEST:
            draft.loading = true;
            break;
        case FETCH_TODOS_SUCCESS:
            draft.todos = draft.todos.concat(action.data.todos);
            draft.loading = false;
            draft.error = false;
            break;
        case FETCH_TODOS_FAILURE:
            draft.loading = false;
            draft.error = true;
            break;
        case FILTER_TODOS_ALL:
            draft.filter = action.data.filter;
            break;
        case FILTER_TODOS_DONE:
            draft.filter = action.data.filter;
            break;
        case FILTER_TODOS_UNDONE:
            draft.filter = action.data.filter;
            break;
    }
    return draft;
});

export const selectTodosData = ({ todos }: ApplicationState) => {
    let derivedState: TodosState;
    switch (todos.filter) {
        case 'all':
            derivedState = todos;
            break;
        case 'done':
            derivedState = {
                ...todos,
                todos: doneTodos(todos.todos),
            };
            break;
        case 'undone':
            derivedState = {
                ...todos,
                todos: undoneTodos(todos.todos),
            };
            break;
        default:
            derivedState = todos;
    }
    return derivedState;
};

const doneTodos = (todos: Todo[]) => todos.filter((todo) => todo.completed);
const undoneTodos = (todos: Todo[]) => todos.filter((todo) => !todo.completed);

export default todosReducer;
