import { Loader2, ClipboardList, CheckCircle, Clock } from "lucide-react";
import type { Todo } from "../../types";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  filter: "All" | "Pending" | "Completed";
  isLoading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({
  todos,
  filter,
  isLoading,
  onToggle,
  onDelete,
}: Props) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Pending") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

//   loading
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
          <p className="text-gray-600 font-medium">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-blue-600" />
          Your Todos
        </h2>
      </div>

      {/* empty state */}
      {filteredTodos.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            {filter === "Completed" ? (
              <CheckCircle className="h-8 w-8 text-green-400" />
            ) : (
              <Clock className="h-8 w-8 text-gray-400" />
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {filter === "All" && "No todos yet"}
            {filter === "Pending" && "No pending todos"}
            {filter === "Completed" && "No completed todos"}
          </h3>

          <p className="text-gray-500">
            {filter === "All" && "Create your first todo to get started!"}
            {filter === "Pending" && "All todos are completed. Great job!"}
            {filter === "Completed" && "Complete some todos to see them here."}
          </p>
        </div>
      ) : (
        // lists
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;