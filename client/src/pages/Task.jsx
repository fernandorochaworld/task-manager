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

    return (
        <div className="flex flex-wrap gap-5">
            <h1 className="tm-title">
                Task { testValue || 'NoValue' }
            </h1>
            <Input type="text" name="name" title="List Name"  />
            <Button title="Act" className="flex-1" onClick={handleClick} />
            {/* <Button title="Save" className="flex-1" onClick={() => navigate('/')} /> */}
            <Button title="Delete" className="flex-1" onClick={() => navigate('/')} />
        </div>
    )
};

export default Task;