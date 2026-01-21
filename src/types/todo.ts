export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'All' | 'Completed' | 'Pending';

export interface TodosState {
  items: Todo[];
  filter: FilterType;
  isLoading: boolean;
}