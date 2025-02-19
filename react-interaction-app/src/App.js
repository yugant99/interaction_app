import React, { useState, useEffect } from "react";
import Papa from 'papaparse';
import Slide from "./components/slide";
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
    if (activeList) {
      setShowInstructions(true);
    }
  }, [activeList]);

  useEffect(() => {
    const loadCSVData = async () => {
      if (!activeList) return;
      
      try {
        console.log('Loading CSV for', activeList);
        const response = await fetch('/game_modal.csv');
        const csvData = await response.text();
        
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: false, // Keep as strings to match exact format
          skipEmptyLines: true,
          complete: (results) => {
            const listNumber = parseInt(activeList.replace('List', ''));
            console.log('Looking for list number:', listNumber);
            
            // Filter by List column matching the number
            const listData = results.data.filter(item => parseInt(item.List) === listNumber);
            console.log(`Found ${listData.length} items for List ${listNumber}`);
  
            const youngSlides = listData
              .filter(item => item.isYoung.trim().toUpperCase() === 'TRUE')
              .sort(() => 0.5 - Math.random());
            
            const oldSlides = listData
              .filter(item => item.isYoung.trim().toUpperCase() === 'FALSE')
              .sort(() => 0.5 - Math.random());
  
            console.log('Young slides:', youngSlides.length);
            console.log('Old slides:', oldSlides.length);
  
            const combinedSlides = listNumber % 2 === 0 
              ? [...oldSlides, ...youngSlides]
              : [...youngSlides, ...oldSlides];
  
            const formattedSlides = combinedSlides.map(item => ({
              slideId: parseInt(item.id),
              images: [
                { id: `target-${item.id}`, src: item.target, alt: `Target Image ${item.id}` },
                { id: `competitor-${item.id}`, src: item.competitor, alt: `Competitor Image ${item.id}` },
              ],
              grandmaInitialPosition: { x: 50, y: 75 },
              youngPersonInitialPosition: { x: 50, y: 75 },
              targetPosition: { x: 10, y: 20 },
              isYoungPerson: item.isYoung.trim().toUpperCase() === 'TRUE',
              isTargetRight: Math.random() < 0.5
            }));
  
            console.log('Sample formatted slide:', formattedSlides[0]);
            setSlidesData(formattedSlides);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
          }
        });
      } catch (error) {
        console.error('Error loading CSV:', error);
      }
    };
  
    loadCSVData();
  }, [activeList]);

  const handleNext = () => {
    if (currentIndex < slidesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Game Over!");
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
            <h2>Welcome to {activeList}!</h2>
            <img 
              src={parseInt(activeList.replace('List', '')) % 2 === 0 ? 
                "/images/granny-trans.png" : 
                "/images/young-person.png"} 
              alt="Character" 
              style={{ width: "100px", marginBottom: "20px" }}
            />
            <p>Use the SPACEBAR to move the character</p>
            <p>Press ENTER to go to the next image</p>
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