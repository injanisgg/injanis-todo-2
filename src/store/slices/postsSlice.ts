import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PostsState } from '../../types';
import { postsApi } from '../../services/api';

// thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await postsApi.getAllPosts();
    } catch {
      return rejectWithValue('Failed to fetch posts');
    }
  }
);

export const searchPostById = createAsyncThunk(
  'posts/searchPostById',
  async (id: string, { rejectWithValue }) => {
    const postId = Number(id);
    if (isNaN(postId)) {
      return rejectWithValue('Invalid post ID');
    }

    try {
      const [post, comments] = await Promise.all([
        postsApi.getPostById(postId),
        postsApi.getCommentsByPostId(postId),
      ]);

      return { post, comments };
    } catch {
      return rejectWithValue('Post not found');
    }
  }
);

// slice
const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  comments: [],
  isLoadingPosts: false,
  isLoadingComments: false,
  error: null,
  commentError: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSearch(state) {
      state.selectedPost = null;
      state.comments = [];
      state.commentError = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetch posts
      .addCase(fetchPosts.pending, state => {
        state.isLoadingPosts = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoadingPosts = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoadingPosts = false;
        state.error = action.payload as string;
      })

      // search post
      .addCase(searchPostById.pending, state => {
        state.isLoadingComments = true;
        state.commentError = null;
      })
      .addCase(searchPostById.fulfilled, (state, action) => {
        state.selectedPost = action.payload.post;
        state.comments = action.payload.comments;
        state.isLoadingComments = false;
      })
      .addCase(searchPostById.rejected, (state, action) => {
        state.isLoadingComments = false;
        state.commentError = action.payload as string;
      });
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;