import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type ApplicationState = ReturnType<typeof rootReducer>;

export default store;
