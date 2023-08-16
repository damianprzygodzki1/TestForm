import { configureStore } from "@reduxjs/toolkit";
import { addItem, listReducer } from "./store";

describe("Redux Store and Reducers", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        list: listReducer,
      },
    });
  });

  it("should update fields in the form store", () => {
    store.dispatch(
      addItem({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        message: "Hello, Redux!",
      })
    );

    const state = store.getState().list;
    expect(state.list).toHaveLength(1);
  });
});
