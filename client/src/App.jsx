import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  // Link
} from 'react-router-dom'

/**
 * Importing other components
 */
import TaskList from './pages/TaskList';
import Task from './pages/Task';
import TaskListIndex from './pages/TaskListIndex';
import LoginPage from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/taskManagerReducer';
import browserService from './services/browser-service';

const App = () => {
  
  const user = useSelector(state => state.taskManager.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const logout = () => {
    browserService.removeUser();
    dispatch(setUser(null));
    // navigate('/');
    window.location = '/';
  }

  if (!user) {
    const loadedUser = browserService.getUser();
    if (loadedUser) {
      dispatch(setUser(loadedUser));
    }
  }

  return (
    <Router>
      <div className="tm-container">

        <div className='flex flex-row justify-between items-center mb-8'>

          <h1 className="tm-title-1">
            Task Manager
          </h1>

          {
            user &&
            <span>
              Logged in as <strong>{user.username}</strong>.
              <a onClick={logout} href="#" className="font-medium text-blue-600 dark:text-blue-500 ms-3">Logout</a>
            </span>
          }
          
        </div>


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
            {
              !user
              ? <Route path="/" element={<LoginPage />} />
              : <>
                <Route path="/" element={<TaskListIndex />} />
                <Route path="/task-list/:id?" element={<TaskList />} />
                <Route path="/task-list/:taskListId/task/:taskId" element={<Task />} />
              </>
            }
        </Routes>
      </div>
    </Router>
  );
}

export default App
