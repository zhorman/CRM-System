export interface TodoRequest {
  title: string;
  isDone: boolean;
}

export interface Todo {
  id: number;
  title: string;
  created?: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export enum TaskFilters {
  All = "all",
  Completed = "completed",
  InWork = "inWork"
}
export interface MetaResponse {
  data: Todo[];
  info: TodoInfo;
}