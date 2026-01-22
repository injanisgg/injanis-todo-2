import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { addTodoAsync } from "../../store/slices/todosSlice";
import { toastSuccess, toastError } from "../../utils/toast";

const AddTodoForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.todos);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toastError("Title is required");
      return;
    }

    try {
      await dispatch(
        addTodoAsync({
          title,
          description,
        })
      ).unwrap();

      toastSuccess("Todo created successfully");
      setTitle("");
      setDescription("");
    } catch (err: any) {
      toastError(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Create New Todo
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter todo title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add Todo
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;