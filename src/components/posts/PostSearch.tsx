import { useState } from 'react';
import { Search, Loader } from 'lucide-react';

interface Props {
  isLoading: boolean;
  error: string | null;
  onSearch: (id: string) => void;
}

const PostSearch = ({ isLoading, error, onSearch }: Props) => {
  const [value, setValue] = useState('');

  const submit = () => {
    if (value.trim()) onSearch(value);
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Search Post by ID</h2>

      <div className="flex gap-2">
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          className="flex-1 px-4 py-2 border rounded-lg"
          placeholder="Enter post ID"
        />
        <button
          onClick={submit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center mt-4">
          <Loader className="animate-spin mr-2" />
          Loading...
        </div>
      )}

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default PostSearch;
