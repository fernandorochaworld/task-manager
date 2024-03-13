import Button from "../components/Button";
import Input from "../components/Input";


const LoginPage = ({ user, onLogin, onCreate, onLogout }) => {

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

    function handleGoBack() {
        navigate(`/task-list/${taskListId}`);
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
                        <div className="flex flex-1 justify-between">
                            <h1 className="tm-title text-start">
                                Login
                            </h1>
                            <Button title="x" className="w-12" styleType="transparent" onClick={handleGoBack} />
                        </div>

                        <Input type="text" name="username" title="User Name" />
                        <Input type="password" name="password" title="Password" />

                        <Button title="Login" type="submit" styleType="primary" value="login" />
                        <Button title="Create" type="submit" styleType="primary" value="create" />
                    </form>
            }
        </div>
    )
};

export default LoginPage;