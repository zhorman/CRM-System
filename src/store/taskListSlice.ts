import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MetaResponse, TaskFilters, Todo, TodoInfo } from '../types/todos';

interface taskListState {
  data: Todo[];
  info: TodoInfo;
  activeFilter: TaskFilters;
}

const initialState: taskListState = {
  data: [],
  info: { all: 0, completed: 0, inWork: 0 },
  activeFilter: TaskFilters.All,
};

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setTaskList: (state, action: PayloadAction<MetaResponse>) => {
      state.data = action.payload.data;
      state.info = action.payload.info;
    },
    setActiveFilter: (state, action: PayloadAction<TaskFilters>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const taskListActions = taskListSlice.actions;

export default taskListSlice;
