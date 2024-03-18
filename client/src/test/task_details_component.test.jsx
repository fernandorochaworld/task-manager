/**
 * Before we begin, we need to setup the environment to run React tests:
 * 1- run the following command: npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react
 * 2- In the root directory of the client folder, create a new file and name it ".babelrc"
 * 3- Add the following content to the file: 
 *      {
            "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
 * 4- In package.json, add the following at the end of the file (before the last } bracket):
        ,"jest": {
            "testEnvironment": "jsdom"
        }
 *******       
 * Necessary import:
 */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/**
 * Import all the related component(s) here:
 * 
 * 
 */
import TaskDetails from '../components/TaskDetails';
import tasks from '../utils/mock-data-task.json';


/**
 * We will test the tasks details component of the TaskList:
 * - Check if it list the tasks of the selected status.
 * - Check the number of records in the list.
 * - Check if the button clicked send the correct task to the callback function.
 */
// Mock internal environment variables

describe('<TaskDetails />', () => {

  let [selectedTask, selectedProperty, newSelectedValue] = [null, null, null];

  const handleSelectedTask = (task, property, newValue) => {
    selectedTask = task;
    selectedProperty = property;
    newSelectedValue = newValue;
  }

  it('Tasks maintenance test.', async () => {

    // Mock task Details
    const user = userEvent.setup();
    render(
      <TaskDetails
        tasks={tasks}
        status="todo"
        handleClickUpdateTask={handleSelectedTask}
        handleSelectTask={handleSelectedTask}
        handleClickDeleteTask={handleSelectedTask}
      />
    );


    // Check for List of Tasks Todo
    const element = screen.getByText('Tasks Todo');
    expect(element).toHaveTextContent('Tasks Todo');


    // Check if the UI has the right list of records, the first li is for the title + 2 tasks
    const lis = screen.getAllByRole('listitem');
    expect(lis.length).toBe(3);

    // Click the button to active the related task
    const startBtns = screen.getAllByTitle('Start task');
    await user.click(startBtns[1]);
    expect(selectedTask?.title).toBe('Task 3');

  });
});
