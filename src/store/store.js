import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

const updateFormAction = ({field, value}) => ({
  type: 'UPDATE_FIELD',
  payload: {
    field,
    value
  }
})

export {store, formReducer, updateFormAction};