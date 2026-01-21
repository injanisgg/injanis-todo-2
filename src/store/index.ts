import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todosSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;