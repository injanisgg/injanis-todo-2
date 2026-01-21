import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo, TodosState, FilterType } from '../../types';

const initialState: TodosState = {
  items: [],
  filter: 'All',
  isLoading: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadFromStorage(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
      state.isLoading = false;
    },

    addTodo(state, action: PayloadAction<string>) {
      if (!action.payload.trim()) return;

      state.items.unshift({
        id: Date.now().toString(),
        text: action.payload.trim(),
        completed: false,
        createdAt: Date.now(),
      });
    },

    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload);
    },

    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;