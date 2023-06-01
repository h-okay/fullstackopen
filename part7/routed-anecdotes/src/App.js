import { useState } from "react";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import { useField } from "./hooks/index";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <p style={{ fontWeight: "bold" }}>{anecdote.content}</p>
      <p>Author: {anecdote.author}</p>
      <p>Info: {anecdote.info}</p>
      <p>Votes: {anecdote.votes}</p>
      <button onClick={() => handleVote(anecdote.id)}>vote</button>
    </div>
  );
};

const AnecdoteList = ({ anecdotes, handleVote }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <div>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            <p
              style={{
                display: "inline-block",
                padding: "0 5px",
                fontSize: "10px",
              }}
            >
              has {anecdote.votes} votes
            </p>
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
    props.handleNotification(`a new anecdote ${content.value} created!`);
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name={content.name}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name={author.name}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input name={info.name} value={info.value} onChange={info.onChange} />
        </div>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
        <br />
        <button>create</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const handleVote = (id) => {
    const anecdote = anecdoteById(id);
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((n) => n.id === Number.parseInt(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
          }}
        >
          {notification}
        </div>
      )}
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} handleVote={handleVote} />}
        />
        <Route
          path="/"
          element={
            <AnecdoteList anecdotes={anecdotes} handleVote={handleVote} />
          }
        />
        <Route
          path="/create"
          element={
            <CreateNew
              addNew={addNew}
              handleNotification={handleNotification}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
