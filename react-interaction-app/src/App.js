import React, { useState, useEffect } from "react";
import Slide from "./components/slide";
import db from "./DB/db.json";
import Home from "./components/Home";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contestant, setContestant] = useState('');
  const [activeList, setActiveList] = useState('List1');
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    const initializeSlidesData = () => {
      const listData = db[activeList];
      const listNumber = parseInt(activeList.replace('List', ''));

      // Filter young and old slides
      const youngSlides = listData.filter(item => item.isYoung).sort(() => 0.5 - Math.random());
      const oldSlides = listData.filter(item => !item.isYoung).sort(() => 0.5 - Math.random());

      // For even-numbered lists (2,4,6,8), show old first
      // For odd-numbered lists (1,3,5,7), show young first
      const combinedSlides = listNumber % 2 === 0 
        ? [...oldSlides, ...youngSlides]  // Even lists: old first
        : [...youngSlides, ...oldSlides]; // Odd lists: young first

      return combinedSlides.map((item) => ({
        slideId: item.id,
        images: [
          { id: `target-${item.id}`, src: item.target, alt: `Target Image ${item.id}` },
          { id: `competitor-${item.id}`, src: item.competitor, alt: `Competitor Image ${item.id}` },
        ],
        grandmaInitialPosition: { x: 50, y: 75 },
        youngPersonInitialPosition: { x: 50, y: 75 },
        targetPosition: { x: 10, y: 20 },
        isYoungPerson: item.isYoung,
        isTargetRight: Math.random() < 0.5
      }));
    };

    setSlidesData(initializeSlidesData());
  }, [activeList]);

  const handleNext = () => {
    if (currentIndex < slidesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Game Over!");
    }
  };

  const handleSwitchList = (listName) => {
    setActiveList(listName);
    setCurrentIndex(0);
    // Update contestant based on list number
    const listNumber = parseInt(listName.replace('List', ''));
    setContestant(listNumber % 2 === 0 ? "Grandma" : "Young Person");
  };

  return (
    <div id="game-screen">
      <div className="welcome-header">
        <h4>Welcome {contestant}!</h4>
      </div>
      {contestant === '' ? (
        <Home setContestant={setContestant} setActiveList={setActiveList} />
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
                  isTargetRight={slidesData[currentIndex].isTargetRight}
                />
              </CSSTransition>
            </TransitionGroup>
          )}
          <div className="list-buttons">
            <button onClick={() => handleSwitchList('List1')}>Switch to List 1</button>
            <button onClick={() => handleSwitchList('List2')}>Switch to List 2</button>
            <button onClick={() => handleSwitchList('List3')}>Switch to List 3</button>
            <button onClick={() => handleSwitchList('List4')}>Switch to List 4</button>
            <button onClick={() => handleSwitchList('List5')}>Switch to List 5</button>
            <button onClick={() => handleSwitchList('List6')}>Switch to List 6</button>
            <button onClick={() => handleSwitchList('List7')}>Switch to List 7</button>
            <button onClick={() => handleSwitchList('List8')}>Switch to List 8</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;