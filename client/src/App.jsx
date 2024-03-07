import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from 'react-router-dom'

/**
 * Importing other components
 */
import TaskList from './pages/TaskList';
import Task from './pages/Task';
import TaskListIndex from './pages/TaskListIndex';

const App = () => {
  return (
    <Router>
      <div className="tm-container">
        <h1 className="tm-title">
          Task Manager
        </h1>


        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav> */}


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.
            Furthermore, notice how the content above always renders? On each page? */}
        <Routes>
          <Route path="/" element={<TaskListIndex />} />
          <Route path="/task-list/:id?" element={<TaskList />} />
          <Route path="/task-list/:taskListId/task/:taskId" element={<Task />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
