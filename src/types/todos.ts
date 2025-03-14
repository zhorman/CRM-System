export interface TodoRequest {
  title: string;
  isDone: boolean;
}

export interface TaskObj {
  id: number;
  title: string;
  isDone: boolean;
}

export interface TaskCounts  {
  all: number;
  completed: number;
  inWork: number;
}

export type TaskFilters = 'all' | 'completed' | 'inWork';
