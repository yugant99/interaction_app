import React, { useState, useEffect } from "react";
import Slide from "./components/slide";
import db from "./DB/db.json";
import Home from "./components/Home";
import Modal from "./components/Modal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contestant, setContestant] = useState('');
  const [activeList, setActiveList] = useState('');
  const [slidesData, setSlidesData] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const initializeSlidesData = () => {
      const listData = db[activeList];
      const listNumber = parseInt(activeList.replace('List', ''));

      const youngSlides = listData.filter(item => item.isYoung).sort(() => 0.5 - Math.random());
      const oldSlides = listData.filter(item => !item.isYoung).sort(() => 0.5 - Math.random());

      const combinedSlides = listNumber % 2 === 0 
        ? [...oldSlides, ...youngSlides]
        : [...youngSlides, ...oldSlides];

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

    if (activeList) {
      setSlidesData(initializeSlidesData());
    }
  }, [activeList]);

  const handleNext = () => {
    if (currentIndex < slidesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Game Over!");
      setShowInstructions(true);
    }
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
          <Modal isOpen={showInstructions} onClose={() => setShowInstructions(false)}>
            <div className="modal-content">
              <img 
                src={parseInt(activeList.replace('List', '')) % 2 === 0 ? 
                  "/images/granny-trans.png" : "/images/young-person.png"} 
                alt="Character" 
                width="150px" 
              />
              <h2>Welcome to {activeList}!</h2>
              <p>Press SPACEBAR to move the character</p>
              <p>Press ENTER for next image</p>
            </div>
          </Modal>
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
        </>
      )}
    </div>
  );
};

export default App;