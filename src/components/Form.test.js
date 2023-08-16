import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from '../store/store';
import Form from './Form';

describe('Form Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        form: formReducer,
      },
    });
  });

  it('should update form fields correctly', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Message'), {
      target: { value: 'Hello, Redux!' },
    });

    const state = store.getState().form;
    expect(state.firstName).toEqual('John');
    expect(state.lastName).toEqual('Doe');
    expect(state.email).toEqual('john@example.com');
    expect(state.message).toEqual('Hello, Redux!');
  });
});