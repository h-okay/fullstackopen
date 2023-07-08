const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({});
      }

      const filter = {};
      if (args.author) {
        filter["author.name"] = args.author;
      }
      if (args.genre) {
        filter["genres"] = { $in: [args.genre] };
      }
      return Book.find(filter);
    },
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    },
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    genres: (root) => root.genres,
    author: async (root) => {
      return Author.findById(root.author);
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.author });

        if (author) {
          const newBook = new Book({ ...args, author: author._id });
          await newBook.save();
          return newBook;
        }
      } catch (authorError) {
        const errorInfo = Object.values(authorError.errors)[0];
        const errorMessage = `Author ${errorInfo.path} must be at least ${errorInfo.properties.minlength} characters long`;
        throw new GraphQLError(errorMessage, {
          code: "BAD_USER_INPUT",
          invalidArgs: errorInfo.path,
        });
      }

      try {
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();
        const bookWithNewAuthor = new Book({ ...args, author: newAuthor._id });
        await bookWithNewAuthor.save();
        return bookWithNewAuthor;
      } catch (bookError) {
        const errorInfo = Object.values(bookError.errors)[0];
        const errorMessage = `Book ${errorInfo.path} must be at least ${errorInfo.properties.minlength} characters long`;
        throw new GraphQLError(errorMessage, {
          code: "BAD_USER_INPUT",
          invalidArgs: errorInfo.path,
        });
      }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) return null;

        author.born = args.setBornTo;
        await author.save();

        return author;
      } catch (error) {
        if (error.name === "ValidationError") {
          const validationErrors = Object.values(error.errors).reduce(
            (errors, err) => {
              errors[err.path] = err.message;
              return errors;
            },
            {}
          );
          throw new GraphQLError("Validation Error", {
            code: "BAD_USER_INPUT",
            validationErrors,
            invalidArgs: args,
          });
        }
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
