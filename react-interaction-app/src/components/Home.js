import React, { useState } from "react";

const Home = ({ setContestant, setActiveList }) => {
  const [name, setName] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setIsNameSubmitted(true);
      setContestant(name);
    } else {
      alert("Please enter your name.");
    }
  };

  const handleListSelection = (listName) => {
    setActiveList(listName); // Set the active list
    if (listName === 'List1') {
      setContestant("Grandma");
  } else if (listName === 'List2') {
    setContestant("Young Person");
  }
  };

  return (
    <div id="home-screen">
      <h1>Welcome to the Game!</h1>
      {!isNameSubmitted ? (
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Hi, {name}! Choose a list to start:</h2>
          <button onClick={() => handleListSelection('List1')}>List 1 (Grandma)</button>
          <button onClick={() => handleListSelection('List2')}>List 2 (Young Person)</button>
          <button onClick={() => handleListSelection('List3')}>List 3 (Grandma)</button>
          <button onClick={() => handleListSelection('List4')}>List 4 (Young Person)</button>
          <button onClick={() => handleListSelection('List5')}>List 5 (Grandma)</button>
          <button onClick={() => handleListSelection('List6')}>List 6 (Young Person)</button>
          <button onClick={() => handleListSelection('List7')}>List 7 (Grandma)</button>
          <button onClick={() => handleListSelection('List8')}>List 8 (Young Person)</button>
        </div>
      )}
    </div>
  );
};

export default Home;