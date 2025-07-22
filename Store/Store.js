import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userslice";
import todoReducer from "../Features/todoslice";

export const store = configureStore(
  {
    reducer: {
      user: userReducer,
      Todos: todoReducer, 
    },
  },
  // window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
