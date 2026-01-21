import type { Comment, Post } from '../../types';

interface Props {
  post: Post | null;
  comments: Comment[];
  isLoading: boolean;
}

const SelectedPost = ({ post, comments, isLoading }: Props) => {
  if (!post || isLoading) return null;

  return (
    <div className="mb-10">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-lg">{post.title}</h3>
        <p className="text-gray-600">{post.body}</p>
      </div>

      <h4 className="font-semibold mb-3">Comments ({comments.length})</h4>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {comments.map(c => (
            <div key={c.id} className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-sm">{c.name}</p>
              <p className="text-xs text-gray-500">{c.email}</p>
              <p className="text-sm mt-2">{c.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedPost;