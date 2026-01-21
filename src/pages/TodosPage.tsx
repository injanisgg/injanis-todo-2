import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { todosActions } from '../store/slices/todosSlice';

import AddTodoForm from '../components/todos/AddTodoForm';
import TodoFilters from '../components/todos/TodoFilter';
import TodoList from '../components/todos/TodoList';

function TodosPage() {
  const dispatch = useAppDispatch();
  const { items, filter, isLoading } = useAppSelector(state => state.todos);

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      dispatch(todosActions.loadFromStorage(JSON.parse(saved)));
    }
  }, [dispatch]);

  const handleAddTodo = (text: string) => {
    dispatch(todosActions.addTodo(text));
    toast.success('Todo added');
  };

  const handleToggle = (id: string) => {
    dispatch(todosActions.toggleTodo(id));
  };

  const handleDelete = (id: string) => {
    dispatch(todosActions.deleteTodo(id));
    toast.success('Todo deleted');
  };

  const handleFilterChange = (filter: 'All' | 'Completed' | 'Pending') => {
    dispatch(todosActions.setFilter(filter));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Todos</h1>

      <AddTodoForm onAdd={handleAddTodo} />
      <TodoFilters
        filter={filter}
        todos={items}
        onChange={handleFilterChange}
      />
      <TodoList
        todos={items}
        filter={filter}
        isLoading={isLoading}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TodosPage;