import { Trash2, CheckCircle2 } from "lucide-react";
import type { Todo } from "../../types";

interface Props {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: Props) => (
    <div className="flex items-center gap-3 p-4 bg-white border rounded-lg">
        <input 
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? 'line-through text-gray-400 flex-1' : 'flex-1'}>
            {todo.text}
        </span>
        {todo.completed && <CheckCircle2 className="text-green-500 w-5 h-5" />}
        <button onClick={() => onDelete(todo.id)}>
            <Trash2 className="text-red-500 w-5 h-5" />
        </button>
    </div>
);

export default TodoItem;