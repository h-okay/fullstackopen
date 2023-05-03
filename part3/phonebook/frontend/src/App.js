import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Header from "./components/Header";
import Form from "./components/Form";
import Search from "./components/Search";
import Display from "./components/Display";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [exists, setExists] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notifType, setNotifType] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const changeHandlers = {
    handleNameChange: (event) => {
      setNewName(event.target.value);
    },
    handleNumberChange: (event) => {
      setNewNumber(event.target.value);
    },
    handleSearchChange: (event) => {
      setSearch(event.target.value);
    },
  };

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3500);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (exists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Update number?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        updateNumber(person.id);
        setNotifType("notification");
        handleNotification(`Updated ${newName}`);
      }
    } else {
      phonebookService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotifType("notification");
          handleNotification(`Added ${newName}`);
        })
        .catch((error) => {
          setNotifType("error");
          handleNotification(error.response.data.error);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .delete(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotifType("notification");
          handleNotification(`${person.name} deleted`);
        })
        .catch((error) => {
          setNotifType("error");
          handleNotification(
            `The person '${person.name}' was already deleted from the server`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const updateNumber = (id) => {
    const person = persons.find((person) => person.id === id);
    const changedPerson = { ...person, number: newNumber };
    phonebookService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        setNotifType("notification");
        handleNotification(`Number for ${person.name} updated`);
      })
      .catch((error) => {
        setNotifType("error");
        handleNotification(error.response.data.error);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const checkIfExists = () => {
    if (newName !== "") {
      persons
        .map((person) => JSON.stringify({ name: person.name }))
        .includes(JSON.stringify({ name: newName }))
        ? setExists(true)
        : setExists(false);
    }
  };

  const peopleToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={notification} notifType={notifType} />
      <Search
        text="filter shown for"
        value={search}
        changeHandler={changeHandlers.handleSearchChange}
      />
      <Header text="Add" />
      <Form
        name={newName}
        number={newNumber}
        submitHandler={addPerson}
        changeHandlers={changeHandlers}
        clickHandler={checkIfExists}
      />
      <Header text="Numbers" />
      <Display persons={peopleToShow} clickHandler={deletePerson} />
    </div>
  );
};

export default App;
