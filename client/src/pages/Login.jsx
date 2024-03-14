import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import { setUser, setTaskListIndex } from "../reducers/taskManagerReducer";
import loginService from "../services/login-service";
import userService from "../services/user-service";
import tasklistService from "../services/tasklist-service";
import browserService from "../services/browser-service";


const LoginPage = () => {

    const user = useSelector(state => state.taskManager.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        const clickType = e.nativeEvent.submitter.value;
        console.log('clickType: ', clickType);

        if (clickType === 'login') {
            onLogin(newUser);
        } else {
            onCreate(newUser);
        }
    }

    const handleGoBack = () => {
        navigate(`/task-list/${taskListId}`);
    }

    const onLogin = (user) => {
        loginService.loginUser(user)
            .then( user => {
                browserService.storeUser(user);
                dispatch(setUser(user));
            })
            .catch(error => console.log(error));
    }

    const onCreate = (user) => {
        userService.createUser(user)
            .then( user => {
                browserService.storeUser(user);
                dispatch(setUser(user))
            })
            .catch(error => console.log(error));
    }

    const onLogout = () => {
        dispatch(setUser(null));
    }

    const onTest = () => {
        dispatch(setUser({username: 'testaaa', id: 'aaa'}));
    }


    return (
        <div>
            {
                user
                    ? <div>
                        <p><strong>{user.username}</strong> is logged in</p>
                        <Button title="Logout" styleType="primary" onClick={onLogout} />
                    </div>
                    : <form onSubmit={handleSubmit} className="flex flex-wrap gap-5">
                        {
                            user && <p><strong>{user.username}</strong> is logged in</p>
                        }
                        <div className="flex flex-1 justify-between">
                            <h1 className="tm-title-2 text-start">
                                Login
                            </h1>
                            <Button title="x" className="w-12" styleType="transparent" onClick={handleGoBack} />
                        </div>

                        <Input type="text" name="username" title="User Name" />
                        <Input type="password" name="password" title="Password" />

                        <Button title="Set User" onClick={onTest} />
                        <Button title="Login" type="submit" styleType="primary" value="login" />
                        <Button title="Create" type="submit" styleType="primary" value="create" />
                    </form>
            }
        </div>
    )
};

export default LoginPage;