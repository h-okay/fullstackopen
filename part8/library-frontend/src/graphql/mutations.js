import { gql } from "@apollo/client";

const EDIT_AUTHOR = gql`
  mutation editAuthorYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export { EDIT_AUTHOR, CREATE_BOOK };
