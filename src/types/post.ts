export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  comments: Comment[];
  isLoadingPosts: boolean;
  isLoadingComments: boolean;
  error: string | null;
  commentError: string | null;
}