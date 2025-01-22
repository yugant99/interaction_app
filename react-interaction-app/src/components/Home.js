import React, { useState } from "react";

const Home = ({ setContestant }) => {
  const [name, setName] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false); // Track if name is submitted
  const [isList2, setIsList2] = useState(false); // New state to track if we are on List 2

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setIsNameSubmitted(true); // Set name submitted flag
      setContestant(name); // Set the contestant's name
    } else {
      alert("Please enter your name.");
    }
  };

  const handleGoToList2 = () => {
    setIsList2(true); // Change state to indicate we are now on List 2
    setContestant("Young Person"); // Set the contestant to "young person"
  };

  return (
    <div id="home-screen">
      <h1>Welcome to the Game!</h1>
      {!isNameSubmitted ? (
        // If name isn't submitted, show the name input form
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
        // After name is submitted, show List 1 (with Grandma) and a button to go to List 2
        <div>
          <h2>Hi, {name}! You are starting with List 1 (Grandma):</h2>
          <button onClick={handleGoToList2}>Go to List 2 (Young Person)</button>
        </div>
      )}
    </div>
  );
};

export default Home;