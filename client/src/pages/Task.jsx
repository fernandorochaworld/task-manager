import { redirect, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { setTest } from "../reducers/testReducer";


const Task = () => {
    const navigate = useNavigate();

    const testValue = useSelector(state => state.test);
    const dispatch = useDispatch();

    const handleClick = () => {
        // const action = {
        //     type: 'test',
        //     payload: 'ABCD'
        // };

        // dispatch(action);
        // alert('here');
        dispatch(setTest('ABCDEFG'));
    }

    function handleGoBack() {
        navigate('/task-list');
    }

    return (
        <form className="flex flex-wrap gap-5">
            <div className="flex flex-1 justify-between">
                <h1 className="tm-title text-start">
                    Task
                </h1>
                <Button title="x" className="w-12" color="white" onClick={handleGoBack} />
            </div>

            <Input type="text" name="name" title="List Name"  />

            <Button title="Delete" className="flex-1" styleType="danger" onClick={handleGoBack} />
            <Button title="Act" className="flex-1" onClick={handleClick} />
            <Button title="Save" type="submit" className="flex-1" styleType="primary" onClick={handleGoBack} />
        </form>
    )
};

export default Task;