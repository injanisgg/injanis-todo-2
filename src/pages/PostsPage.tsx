import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { fetchPosts, searchPostById } from "../store/slices/postsSlice";
import PostSearch from "../components/posts/PostSearch";
import SelectedPost from "../components/posts/SelectedPost";
import PostList from "../components/posts/PostsList";
import PostError from "../components/posts/PostsError";

function PostPage() {
  const dispatch = useAppDispatch();

  const { 
    posts, 
    selectedPost, 
    comments, 
    isLoadingPosts, 
    isLoadingComments, 
    error, 
    commentError} = useAppSelector(state => state.posts);

    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>

        {error && <PostError message={error} onRetry={() => dispatch(fetchPosts())} />}

        {!error && (
          <>
            <PostSearch
              isLoading={isLoadingComments}
              error={commentError}
              onSearch={id => dispatch(searchPostById(id))}
            />

            <SelectedPost
              post={selectedPost}
              comments={comments}
              isLoading={isLoadingComments}
            />

            <PostList posts={posts} isLoading={isLoadingPosts} />
          </>
        )}
      </div>
    );
};

export default PostPage;