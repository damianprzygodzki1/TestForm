import { configureStore } from '@reduxjs/toolkit';
import { formReducer, updateFormAction } from './store';

describe('Redux Store and Reducers', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        form: formReducer,
      },
    });
  });

  it('should update fields in the form store', () => {
    store.dispatch(updateFormAction({ field: 'firstName', value: 'John' }));
    store.dispatch(updateFormAction({ field: 'lastName', value: 'Doe' }));
    store.dispatch(updateFormAction({ field: 'email', value: 'john@example.com' }));
    store.dispatch(updateFormAction({ field: 'message', value: 'Hello, Redux!' }));

    const state = store.getState().form;
    console.log(store.getState());
    expect(state.firstName).toEqual('John');
    expect(state.lastName).toEqual('Doe');
    expect(state.email).toEqual('john@example.com');
    expect(state.message).toEqual('Hello, Redux!');
  });
});