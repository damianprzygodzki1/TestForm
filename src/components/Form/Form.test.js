import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { listReducer } from "../../store/store";
import Form from "./Form";

describe("Form Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        list: listReducer,
      },
    });
  });

  it("should validate form successfully", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "Message with 10 characters" },
    });

    const submitButton = screen.getByText("Submit");
    expect(!!submitButton.disabled).toEqual(false);
  });

  it("should validate form with errors", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "notValidEmail" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "Too short" },
    });

    const errors = screen.getAllByTestId("error");
    expect(errors).toHaveLength(4);
  });
});
