import { createAction } from '@reduxjs/toolkit';
import { v4 as uuid_v4 } from 'uuid';

const addContact = createAction('contact/add', ({ name, number }) => ({
  payload: {
    id: uuid_v4(),
    name,
    number,
  },
}));

const deleteContact = createAction('contact/delete', id => ({
  payload: {
    id,
  },
}));
export default { addContact, deleteContact };
