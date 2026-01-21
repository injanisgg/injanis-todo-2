import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onAdd: (text: string) => void;
}

const AddTodoForm = ({ onAdd }: Props) => {
  const [value, setValue] = useState('');

  const submit = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        className="flex-1 px-4 py-2 border rounded-lg"
        placeholder="Add a new task..."
      />
      <button
        onClick={submit}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add
      </button>
    </div>
  );
};

export default AddTodoForm;