import reducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;