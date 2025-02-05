import React, { useState } from "react";

const Home = ({ setContestant, setActiveList }) => {
  const [name, setName] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "" && selectedList) {
      setIsNameSubmitted(true);
      setContestant(selectedList.includes('2') || selectedList.includes('4') || 
                   selectedList.includes('6') || selectedList.includes('8') ? 
                   "Grandma" : "Young Person");
      setActiveList(selectedList);
    } else {
      alert("Please enter your name and select a list.");
    }
  };

  return (
    <div id="home-screen">
      <h1>Welcome to the Game!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select 
            value={selectedList} 
            onChange={(e) => setSelectedList(e.target.value)}
            required
          >
            <option value="">Select a List</option>
            <option value="List1">List 1</option>
            <option value="List2">List 2</option>
            <option value="List3">List 3</option>
            <option value="List4">List 4</option>
            <option value="List5">List 5</option>
            <option value="List6">List 6</option>
            <option value="List7">List 7</option>
            <option value="List8">List 8</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default Home;