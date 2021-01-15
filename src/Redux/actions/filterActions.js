import { createAction } from '@reduxjs/toolkit';

const filterContactByName = createAction('contact/filter', value => {
  return {
    payload: {
      value,
    },
  };
});
export default filterContactByName;
