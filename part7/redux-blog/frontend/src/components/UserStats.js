import { Navigate } from "react-router-dom";

const Users = ({ users }) => {
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
          {Object.entries(users).map(([key, value]) => (
            <tr key={key}>
              <td>
                <Navigate to={`/users/${key}`} style={{ paddingRight: "5px" }}>
                  {key}
                </Navigate>
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
