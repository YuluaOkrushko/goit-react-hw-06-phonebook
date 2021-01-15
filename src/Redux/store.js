// import { createStore, combineReducers } from "redux";
import contactsReducers from './reducer/contactsReducers';
import filterReducers from './reducer/filterReducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    contacts: contactsReducers,
    filter: filterReducers,
  },
});

export default store;
