import type { Todo } from "../../types";
import { ClipboardList, CheckCircle, Clock } from "lucide-react";

interface Props {
  filter: "All" | "Completed" | "Pending";
  todos: Todo[];
  onChange: (filter: Props["filter"]) => void;
}

const TodoFilters = ({ filter, todos, onChange }: Props) => {
  const counts = {
    All: todos.length,
    Completed: todos.filter((t) => t.completed).length,
    Pending: todos.filter((t) => !t.completed).length,
  };

  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
      {/* all */}
      <button
        onClick={() => onChange("All")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer flex items-center gap-1.5 ${
          filter === "All"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <ClipboardList className="w-4 h-4" />
        All ({counts.All})
      </button>

      {/* pending */}
      <button
        onClick={() => onChange("Pending")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer flex items-center gap-1.5 ${
          filter === "Pending"
            ? "bg-white text-yellow-600 shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <Clock className="w-4 h-4" />
        Pending ({counts.Pending})
      </button>

      {/* completed */}
      <button
        onClick={() => onChange("Completed")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer flex items-center gap-1.5 ${
          filter === "Completed"
            ? "bg-white text-green-600 shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <CheckCircle className="w-4 h-4" />
        Completed ({counts.Completed})
      </button>
    </div>
  );
};

export default TodoFilters;