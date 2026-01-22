import { useState } from "react";
import { Trash2, Check, Calendar, Loader2 } from "lucide-react";
import type { Todo } from "../../types";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(todo.id);
    setIsDeleting(false);
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-5 border-l-4 ${
          todo.completed
            ? "border-green-500 bg-green-50/30"
            : "border-blue-500"
        }`}
      >
        <div className="flex items-start gap-4">
          {/* toggle */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-1 hover:cursor-pointer ${
              todo.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300 hover:border-blue-500"
            }`}
          >
            {todo.completed && <Check className="h-4 w-4 text-white" />}
          </button>

          {/* content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold ${
                todo.completed
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {todo.title}
            </h3>

            {todo.description && (
              <p
                className={`mt-2 text-sm ${
                  todo.completed ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {todo.description}
              </p>
            )}

            <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
              {todo.createdAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(todo.createdAt).toLocaleDateString()}
                </span>
              )}

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  todo.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </div>
          </div>

          {/* delete */}
          <button
            onClick={() => setShowConfirm(true)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors hover:cursor-pointer"
            title="Delete todo"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* delete confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Delete this todo?
            </h2>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium transition hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-50 hover:cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;