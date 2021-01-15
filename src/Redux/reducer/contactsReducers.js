import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import contactActions from '../actions/contactActions';

const initialState = () => {
  if (localStorage.getItem('contacts')) {
    return JSON.parse(localStorage.getItem('contacts')).phoneBookReducer;
  } else {
    return [];
  }
};

const addContact = (state, action) => {
  return [...state, action.payload];
};
const deleteContact = (state, action) => {
  return state.filter(contact => contact.id !== action.payload.id);
};

const phoneBookReducer = createReducer(initialState(), {
  [contactActions.addContact]: addContact,
  [contactActions.deleteContact]: deleteContact,
});

export default combineReducers({
  phoneBookReducer,
});
