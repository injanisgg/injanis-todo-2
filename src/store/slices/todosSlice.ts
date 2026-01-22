import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodosState, FilterType } from "../../types";

const initialState: TodosState = {
  items: [],
  filter: "All",
  loading: false,
  error: null,
};

export const loadTodosFromStorage = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/loadFromStorage", async (_, { rejectWithValue }) => {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch {
    return rejectWithValue("Failed to load todos");
  }
});

export const addTodoAsync = createAsyncThunk<
  Todo,
  { title: string; description?: string },
  { rejectValue: string }
>("todos/addTodo", async ({ title, description }, { rejectWithValue }) => {
  if (!title.trim()) {
    return rejectWithValue("Title is required");
  }

  await new Promise((r) => setTimeout(r, 400));

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description?.trim(),
    completed: false,
    createdAt: Date.now(),
  };
});

// slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    loadFromStorage(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // load todos
      .addCase(loadTodosFromStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodosFromStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTodosFromStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // add todo
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);

        // sync ke localStorage
        localStorage.setItem("todos", JSON.stringify(state.items));
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add todo";
      });
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;