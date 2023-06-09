import { useQuery } from "@apollo/client";
import EditAuthor from "./EditAuthor";
import { ALL_AUTHORS } from "../graphql/queries";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
    skip: !props.show,
  });

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <EditAuthor setError={props.setError} />
    </div>
  );
};

export default Authors;
