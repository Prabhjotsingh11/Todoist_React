import { createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: "Todos",
  initialState: {
    Todos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.Todos.push(action.payload);
    },
    setTodo(state, action) {
      state.Todos = action.payload;
    },
    deleteTodo: (state, action) => {
      state.Todos = state.Todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action) => {
      const updatedTodo = action.payload;
      
      // Find the todo by id and update its status
      state.Todos = state.Todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
    },
  },
});

export const { addTodo, setTodo, deleteTodo, completeTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
