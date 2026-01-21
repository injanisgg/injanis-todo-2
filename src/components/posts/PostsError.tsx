import { AlertCircle } from 'lucide-react';

interface Props {
  message: string;
  onRetry: () => void;
}

const PostsError = ({ message, onRetry }: Props) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <AlertCircle className="w-10 h-10 mx-auto text-red-500 mb-3" />
    <p className="text-red-600 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-red-500 text-white rounded-lg"
    >
      Retry
    </button>
  </div>
);

export default PostsError;