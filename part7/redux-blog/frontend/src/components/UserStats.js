import { Link } from "react-router-dom";

const Users = ({ stats, users }) => {
  return (
    <>
      <h2>User Stats</h2>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{stats[user.name]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
