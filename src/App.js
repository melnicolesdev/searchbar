import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = props => {
  const [people, setPeople] = useState([
    { name: 'Alan Turing', number: '040-123456', id: 1, counter: 0 },
    { name: 'Barbara Liskov', number: '12-43-234345', id: 2, counter: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 3, counter: 0 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, counter: 0 },
  ]);

  const [search, setNewSearch] = useState('');
  const [newPersonName, setNewPersonName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedNumber, setEditedNumber] = useState('');
  const [sortBy, setSortBy] = useState(null); //sort
  const [count, setCount] = useState(0); // Add state for count

  const handleSearchChange = e => {
    setNewSearch(e.target.value);
  };
  /*search filter*/
  const filtered = !search
    ? people
    : people.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );
  /*change name*/
  const handleNameChange = e => {
    setNewPersonName(e.target.value);
  };

  const handleEditNameChange = e => {
    setEditedName(e.target.value);
  };

  const handleEditNumberChange = e => {
    setEditedNumber(e.target.value);
  };
  /*sorting list*/
  const handleSort = key => {
    if (sortBy === key) {
      // Toggle between ascending and descending
      setPeople(prevPeople => [...prevPeople].reverse());
    } else {
      // Sort by the selected key in ascending order
      setSortBy(key);
      setPeople(prevPeople =>
        [...prevPeople].sort((a, b) => a[key].localeCompare(b[key]))
      );
    }
  };

  /*add new person*/
  const handleAddPerson = () => {
    if (newPersonName.trim() !== '') {
      setPeople(prevPeople => [
        ...prevPeople,
        {
          name: newPersonName,
          number: 'New Number',
          id: prevPeople.length + 1,
          counter: 0, // Add counter property
        },
      ]);
      setNewPersonName('');
    }
  };
  /*open edit person*/
  const handleEditPerson = (id, name, number) => {
    setEditId(id);
    setEditedName(name);
    setEditedNumber(number);
  };
  /*save editing person*/
  const handleSaveEdit = () => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === editId
          ? { ...person, name: editedName, number: editedNumber }
          : person
      )
    );
    setEditId(null);
    setEditedName('');
    setEditedNumber('');
  };
  /*cancel editing person */
  const handleCancelEdit = () => {
    setEditId(null);
    setEditedName('');
    setEditedNumber('');
  };
  /*remove from list */
  const handleRemovePerson = id => {
    setPeople(prevPeople => prevPeople.filter(person => person.id !== id));
  };

  /* increment and decrement counters */
  const handleIncrementCounter = id => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === id ? { ...person, counter: person.counter + 1 } : person
      )
    );
  };

  const handleDecrementCounter = id => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === id ? { ...person, counter: person.counter - 1 } : person
      )
    );
  };
  /* total of increment and decrements */
  const getTotalCounter = () => {
    return people.reduce((total, person) => total + person.counter, 0);
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      <h1>List search</h1>
      <input type='text' value={search} onChange={handleSearchChange} />
      <h2>Numbers</h2>
      <div>
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('number')}>Sort by Number</button>
      </div>
      {filtered.map(person => {
        return (
          <div key={person.id}>
            {editId === person.id ? (
              <>
                <input
                  type='text'
                  value={editedName}
                  onChange={handleEditNameChange}
                />
                <input
                  type='text'
                  value={editedNumber}
                  onChange={handleEditNumberChange}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <p>
                  {person.name} - {person.number} - Counter: {person.counter}
                </p>
                <button
                  onClick={() =>
                    handleEditPerson(person.id, person.name, person.number)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleRemovePerson(person.id)}>
                  Remove
                </button>
                <button onClick={() => handleIncrementCounter(person.id)}>
                  +
                </button>
                <button onClick={() => handleDecrementCounter(person.id)}>
                  -
                </button>
              </>
            )}
          </div>
        );
      })}
      <div>
        <input
          type='text'
          value={newPersonName}
          onChange={handleNameChange}
          placeholder='Enter new person'
        />
        <button onClick={handleAddPerson}>Add person</button>
      </div>
      {/* Add a button to display count */}
      <button onClick={() => setCount(filtered.length)}>Count</button>
      {/* Display the count */}
      <p>Total Objects: {count}</p>
      {/* increment count */} <p>Total Increment count: {getTotalCounter()}</p>
    </div>
  );
};

export default App;
