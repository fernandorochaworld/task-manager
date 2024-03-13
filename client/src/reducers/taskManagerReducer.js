/**
 * Below is an example of a simple reducer, just added it to get the redux toolkit setup going
 * You'll need to make your own reducers, with actions as well to facilitate redux-toolkit
 */

import { createSlice } from '@reduxjs/toolkit';

const orderTaskFn = (a, b) => a.title.localeCompare(b.title);

const initialState = {
  user: null,
  taskListIndex: null,
  // taskListIndex: [
  //   {
  //     id: 'sprint1',
  //     name: 'Sprint 1',
  //     tasks: [
  //       {
  //         id: 'task1',
  //         title: 'task1',
  //         description: 'My task 1',
  //         priority: 'high',
  //         status: 'todo',
  //         dueDate: new Date().toJSON(),
  //       }
  //     ]
  //   }
  // ],
}

const slice = createSlice({
  name: 'taskManager',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setTaskListIndex(state, action) {
      state.taskListIndex = action.payload;
    },
    
    addTaskList(state, action) {
      console.log('received action: ', action)
      console.log('updating state to ...', action.payload)
      const taskList = { ...action.payload };
      taskList.tasks = [...taskList.tasks];
      if (taskList.id) {
        state.taskListIndex = state.taskListIndex.filter(item => item.id !== taskList.id);
      }
      taskList.tasks.sort(orderTaskFn);
      state.taskListIndex.push(taskList);
      return state;
    },
    
    deleteTaskList(state, action) {
      console.log('received action: ', action)
      console.log('updating state to ...', action.payload)
      if (action.payload.id) {
        state.taskListIndex = state.taskListIndex.filter(item => item.id !== action.payload.id);
      }
      return state;
    },

    addTask(state, action) {
      console.log('received action: ', action)
      console.log('updating state to ...', action.payload)
      const task = action.payload;
      const taskList = state.taskListIndex.filter(item => item.id === task.taskListId)?.[0];
      state.taskListIndex = state.taskListIndex.filter(item => item.id !== task.taskListId);
      if (taskList) {
        taskList.tasks = taskList.tasks.filter(item => item.id !== task.id);
      }
      delete task.taskListId;
      taskList.tasks.push(task);
      taskList.tasks.sort(orderTaskFn);
      state.taskListIndex.push(taskList);
      return state;
    },

    deleteTask(state, action) {
      console.log('received action: ', action)
      console.log('updating state to ...', action.payload)
      const task = {...action.payload};
      const taskList = state.taskListIndex.filter(item => item.id === task.taskListId)?.[0];
      state.taskListIndex = state.taskListIndex.filter(item => item.id !== task.taskListId);
      if (taskList) {
        taskList.tasks = taskList.tasks.filter(item => item.id !== task.id);
      }
      taskList.tasks.sort(orderTaskFn);
      state.taskListIndex.push(taskList);
      return state;
    }
  }
})

export const {
  setUser,
  setTaskListIndex,
  addTaskList,
  deleteTaskList,
  addTask,
  deleteTask,
} = slice.actions
export default slice.reducer
