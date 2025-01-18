import React, { useState } from "react";

const Home = ({ setContestant }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setContestant(name);
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div id="home-screen">
      <h1>Welcome to the Game!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;