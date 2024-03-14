import { useDispatch } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import { setUser } from "../reducers/taskManagerReducer";
import loginService from "../services/login-service";
import userService from "../services/user-service";
import browserService from "../services/browser-service";
import { useState } from "react";


const LoginPage = () => {

    const dispatch = useDispatch();

    const [error, setError] = useState();

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

    const onLogin = (user) => {
        loginService.loginUser(user)
            .then( user => {
                browserService.storeUser(user);
                dispatch(setUser(user));
            })
            .catch(error => setErrorMessage(error));
    }

    const onCreate = (user) => {
        userService.createUser(user)
            .then( user => {
                browserService.storeUser(user);
                dispatch(setUser(user))
            })
            .catch(error => setErrorMessage(error));
    }

    const setErrorMessage = (error) => {
        setError(error?.response?.data?.error || 'Error to execute the opperation.');
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-5">
            <h1 className="tm-title-2 text-start">
                Login
            </h1>

            <Input type="text" name="username" title="User Name" />
            <Input type="password" name="password" title="Password" />

            { error && <div className="w-full text-sm text-red-500">{error}</div>}

            <Button title="Login" type="submit" styleType="primary" value="login" />
            <Button title="Create" type="submit" styleType="primary" value="create" />
        </form>
    )
};

export default LoginPage;