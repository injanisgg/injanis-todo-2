import type { Todo } from "../../types";

interface Props {
    filter: string;
    todos: Todo[];
    onChange: (filter: 'All' | 'Completed' | 'Pending') => void;
}

const TodoFilters = ({ filter, todos, onChange }: Props) => {
    const counts = {
        All: todos.length,
        Completed: todos.filter(t => t.completed).length,
        Pending: todos.filter(t => !t.completed).length
    };

    return (
        <div className="flex gap-2 mb-6">
            {(['All', 'Completed', 'Pending'] as const).map(f => (
                <button
                 key={f}
                 onClick={() => onChange(f)}
                 className={`px-4 py-2 rounded-lg ${filter === f 
                    ? 'bg-blue-500 text-white'
                    :'bg-gray-200'
                 }`}>
                    {f} ({counts[f]})
                 </button>
            ))}
        </div>
    );
};

export default TodoFilters;