import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

const addItem = (payload) => ({
  type: "ADD_ITEM",
  payload,
});

export { store, listReducer, addItem };
