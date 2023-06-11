import { Link } from "react-router-dom";

const NavMenu = ({ user, logout }) => {
  const style = {
    display: "flex",
    justifyContent: "flex-start",
    gap: "5px",
    backgroundColor: "lightgray",
    padding: "5px",
  };

  return (
    <div className="nav-menu" style={style}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default NavMenu;
