import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {contactsReducer} from './contactsReducer';

let reducers = combineReducers({
    contacts: contactsReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));


