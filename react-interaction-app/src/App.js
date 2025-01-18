import React, { useState } from "react";
import Slide from "./components/slide";
import db from "./DB/db.json";
import Home from "./components/Home";

const App = () => {
  const [slidesData, setSlidesData] = useState(
    db.data.map((item) => ({
      slideId: item.id,
      images: [
        { id: `target-${item.id}`, src: item.target, alt: `Target Image ${item.id}` },
        { id: `competitor-${item.id}`, src: item.competitor, alt: `Competitor Image ${item.id}` },
        { id: `control-${item.id}`, src: item.control, alt: `Control Image ${item.id}` },
      ],
      grandmaInitialPosition: { x: 50, y: 75 },
      targetPosition: { x: 20, y: 30 },
    }))
  );
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * db.data.length));

  const [contestant, setContestant] = useState('');

  const handleNext = () => {
    if (slidesData.length > 1) {
      const newSlidesData = [...slidesData];
      newSlidesData.splice(currentIndex, 1); // Remove the current slide from the array
      setSlidesData(newSlidesData);

      const randomIndex = Math.floor(Math.random() * newSlidesData.length);
      setCurrentIndex(randomIndex);
    } else {
      alert("Game Over!");
    }
  };

  return (
    <div id="game-screen">
      <div className="welcome-header">
        <h4>
          Welcome {contestant}!
        </h4>
      </div>
      {slidesData.length > 0 && contestant != ''  ? (
        <Slide
          key={slidesData[currentIndex].slideId}
          slideId={slidesData[currentIndex].slideId}
          images={slidesData[currentIndex].images}
          grandmaInitialPosition={slidesData[currentIndex].grandmaInitialPosition}
          targetPosition={slidesData[currentIndex].targetPosition}
          onNext={handleNext}
          showArrow={true} // Always show arrow since only one slide is displayed
        />
      ) : <Home setContestant={setContestant}/>}
    </div>
  );
};

export default App;