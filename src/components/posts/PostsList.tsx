import { Loader } from 'lucide-react';
import type { Post } from '../../types';

interface Props {
  posts: Post[];
  isLoading: boolean;
}

const PostsList = ({ posts, isLoading }: Props) => {
  if (isLoading) {
    return <Loader className="animate-spin mx-auto mt-10" />;
  }

  if (!posts.length) {
    return <p className="text-center text-gray-500">No posts available</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-5 rounded-lg border">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
                #{post.id}
              </span>
            </div>
            <p className="text-sm text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostsList;