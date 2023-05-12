import { useDispatch } from "react-redux";
import { filtering } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(filtering(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <>
      <div style={style}>
        Search:{" "}
        <input type="text" name="search" onChange={handleChange}></input>
      </div>
    </>
  );
};

export default Filter;
