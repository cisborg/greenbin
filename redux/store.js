// store.js
import { createStore } from 'redux';
import root from './reducers/rootReducer'; // store';just the path as necessary

const store = createStore(root);

export default store;
