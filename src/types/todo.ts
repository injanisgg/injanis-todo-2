export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'All' | 'Completed' | 'Pending';

export interface TodosState {
  items: Todo[];
  filter: FilterType;
  loading: boolean;
  error: string | null;
}