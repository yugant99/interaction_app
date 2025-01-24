import React, { useState, useEffect } from "react";
import Slide from "./components/slide";
import db from "./DB/db.json";
import Home from "./components/Home";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contestant, setContestant] = useState('');
  const [isList2, setIsList2] = useState(false);
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    const initializeSlidesData = (startWithYoung = false) => {
      const listData = startWithYoung ? db["List2"] : db.List1;
      
      // Filter and randomize slides
      const youngSlides = listData.filter(item => item.isYoung).sort(() => 0.5 - Math.random());
      const oldSlides = listData.filter(item => !item.isYoung).sort(() => 0.5 - Math.random());
      
      // Combine based on start character
      const combinedSlides = startWithYoung ? [...youngSlides, ...oldSlides] : [...oldSlides, ...youngSlides];

      return combinedSlides.map((item) => ({
        slideId: item.id,
        images: [
          { id: `target-${item.id}`, src: item.target, alt: `Target Image ${item.id}` },
          { id: `competitor-${item.id}`, src: item.competitor, alt: `Competitor Image ${item.id}` },
        ],
        grandmaInitialPosition: { x: 50, y: 75 },
        youngPersonInitialPosition: { x: 50, y: 75 },
        targetPosition: { x: 10, y: 20 },
        isYoungPerson: item.isYoung
      }));
    };

    setSlidesData(initializeSlidesData(isList2));
  }, [isList2]);

  const handleNext = () => {
    if (currentIndex < slidesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Game Over!");
    }
  };

  const handleSwitchList = () => {
    setIsList2(!isList2);
    setCurrentIndex(0);
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
          {slidesData.length > 0 && currentIndex < slidesData.length && (
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
                  isYoungPerson={slidesData[currentIndex].isYoungPerson}
                />
              </CSSTransition>
            </TransitionGroup>
          )}
          <button onClick={handleSwitchList}>
            Switch to List {isList2 ? '1' : '2'}
          </button>
        </>
      )}
    </div>
  );
};

export default App;