import React, { useState } from "react";
import Slide from "./components/slide";
import db from "./DB/db.json";
import Home from "./components/Home";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css"; // Ensure your CSS transitions are defined here

const App = () => {
  const initializeSlidesData = () => {
    return db.data.map((item) => ({
      slideId: item.id,
      images: [
        { id: `target-${item.id}`, src: item.target, alt: `Target Image ${item.id}` },
        { id: `competitor-${item.id}`, src: item.competitor, alt: `Competitor Image ${item.id}` },
        { id: `control-${item.id}`, src: item.control, alt: `Control Image ${item.id}` },
      ],
      grandmaInitialPosition: { x: 50, y: 75 },
      youngPersonInitialPosition: { x: 50, y: 75 },
      targetPosition: { x: 10, y: 20 },
    }));
  };

  const [slidesData, setSlidesData] = useState(initializeSlidesData());
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * db.data.length));
  const [contestant, setContestant] = useState('');
  const [isList2, setIsList2] = useState(false);

  const handleNext = () => {
    if (slidesData.length > 1) {
      const newSlidesData = [...slidesData];
      newSlidesData.splice(currentIndex, 1);
      setSlidesData(newSlidesData);
      const randomIndex = Math.floor(Math.random() * newSlidesData.length);
      setCurrentIndex(randomIndex);
    } else {
      alert("Game Over!");
    }
  };

  const handleSwitchList = () => {
    setIsList2(!isList2);
    setSlidesData(initializeSlidesData());
    setCurrentIndex(Math.floor(Math.random() * db.data.length));
  };

  return (
    <div id="game-screen">
      <div className="welcome-header">
        <h4>Welcome {contestant}!</h4>
      </div>
      {contestant === '' ? (
        <Home setContestant={setContestant} />
      ) : (
        <>
          <TransitionGroup>
            <CSSTransition
              key={slidesData[currentIndex].slideId}
              timeout={500}
              classNames="slide"
            >
              <Slide
                slideId={slidesData[currentIndex].slideId}
                images={slidesData[currentIndex].images}
                grandmaInitialPosition={slidesData[currentIndex].grandmaInitialPosition}
                youngPersonInitialPosition={slidesData[currentIndex].youngPersonInitialPosition}
                targetPosition={slidesData[currentIndex].targetPosition}
                onNext={handleNext}
                showArrow={true}
                isList2={isList2}
              />
            </CSSTransition>
          </TransitionGroup>
          <button onClick={handleSwitchList}>
            Switch to List {isList2 ? '1' : '2'}
          </button>
        </>
      )}
    </div>
  );
};

export default App;