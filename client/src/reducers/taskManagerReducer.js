/**
 * Below is an example of a simple reducer, just added it to get the redux toolkit setup going
 * You'll need to make your own reducers, with actions as well to facilitate redux-toolkit
 */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedTask: null,
  selectedTaskList: null,
  taskListIndex: [
    {
      id: 'sprint1',
      name: 'Sprint 1',
      tasks: [
        {
          id: 'task1',
          name: 'task1',
          description: 'My task 1',
          priority: 'high',
          status: 'todo',
          dueDate: new Date(),
        }
      ]
    }
  ],
}

const slice = createSlice({
  name: 'taskManager',
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      console.log('received action: ', action)
      console.log('updating state to ...', action.payload)
      state.selectedTask = [...state.selectedTask, action.payload];
      return state;
    },
    setSelectedTaskList(state, action) {
      state.selectedTaskList = action.payload;
    },
    setTaskList: (state, action) => {
      console.log('received action: ', action)
      console.log('updating state to ...', action.payload)

      
      return action.payload
    },
    addTaskList(state, action) {
      console.log('received action: ', action)
      console.log('updating state to ...', action.payload)
      const taskList = action.payload;
      if (taskList.id) {
        state.taskListIndex = state.taskListIndex.filter(item => item.id !== taskList.id);
      }
      state.taskListIndex.push(taskList);
    }
  }
})

export const { setSelectedTask, addTaskList, setSelectedTaskList } = slice.actions
export default slice.reducer
