// store.js
import { createStore,applyMiddleware } from 'redux';
import {thunk } from 'redux-thunk';
import root from './reducers/root'; // store';just the path as necessary

const store = createStore(root, applyMiddleware(thunk));

export default store;
