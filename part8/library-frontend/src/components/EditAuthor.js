import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS } from "../graphql/queries";
import { EDIT_AUTHOR } from "../graphql/mutations";

const EditAuthor = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthorYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    editAuthorYear({ variables: { name, setBornTo: born } });
    setName("");
    setBorn("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {authors.data.allAuthors.map((author, index) => (
            <option key={"author_" + index} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        born
        <input
          type="number"
          value={born}
          onChange={({ target }) => setBorn(target.valueAsNumber)}
        />
      </div>
      <button type="submit">update author</button>
    </form>
  );
};

export default EditAuthor;
