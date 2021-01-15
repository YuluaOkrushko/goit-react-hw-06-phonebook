import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import filterActions from '../actions/filterActions';

const filterContactReducer = createReducer('', {
  [filterActions]: (state, action) => action.payload.value,
});

export default combineReducers({
  filterContactReducer,
});
