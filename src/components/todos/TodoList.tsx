import { Loader } from "lucide-react";
import type { Todo } from "../../types";
import TodoItem from "./TodoItem";

interface Props {
    todos: Todo[];
    filter: string;
    isLoading: boolean;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoList = ({ todos, filter, isLoading, onToggle, onDelete }: Props) => {
    if (isLoading) {
        return <Loader className="animate-spin mx-auto mt-10" />;
    }

    const filteredTodos = filter === 'All' 
        ? todos 
        : todos.filter(t => filter === 'Completed' ? t.completed : !t.completed);

    if (!filteredTodos.length) {
        return <p className="text-center text-gray-500">No todos found.</p>;
    }

    return (
        <div className="space-y-2">
            {filteredTodos.map(t => (
                <TodoItem 
                  key={t.id}
                  todo={t}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default TodoList;