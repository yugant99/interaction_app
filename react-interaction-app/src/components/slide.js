import React, { useState, useEffect } from "react";

const Slide = ({
  slideId,
  images,
  grandmaInitialPosition,
  youngPersonInitialPosition,
  targetPosition,
  onMoveGrandma,
  onNext,
  showArrow,
  isYoungPerson,
  isTargetRight
}) => {
  const initialPosition = isYoungPerson ? youngPersonInitialPosition : grandmaInitialPosition;
  const [characterPosition, setCharacterPosition] = useState(initialPosition);

  // Get target position based on whether target is on right or left
  const getTargetPosition = () => ({
    x: isTargetRight ? 53.5: 28,
    y: 23.5
  });

  const moveCharacter = () => {
    setCharacterPosition(getTargetPosition());
    if (onMoveGrandma) onMoveGrandma(slideId);
  };

  const handleNextFunc = () => {
    reset();
    onNext();
  };

  const reset = () => {
    setCharacterPosition(initialPosition);
  };
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        moveCharacter();
      } else if (event.code === 'Enter') {
        event.preventDefault();
        handleNextFunc();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (showArrow) {
      const arrowElement = document.getElementById(`arrow-next-slide-${slideId}`);
      const targetImageElement = document.getElementById(
        isTargetRight ? images[1].id : images[0].id
      );

      if (arrowElement && targetImageElement) {
        const rect = targetImageElement.getBoundingClientRect();
        arrowElement.style.left = `${rect.left + window.scrollX}px`;
        arrowElement.style.top = `${rect.top + window.scrollY}px`;
      }
    }
  }, [showArrow, images, slideId, isTargetRight]);

  useEffect(() => {
    setCharacterPosition(initialPosition);
  }, [isYoungPerson, initialPosition]);

  // Reorder images if target should be on the right
  const orderedImages = isTargetRight ? [...images].reverse() : images;

  return (
    <div id={`slide-${slideId}`} className="slide" style={{ display: "block" }}>
      <div className="image-container">
        {orderedImages.map((img, i) => (
          <div className="image-group" key={img.id}>
            {((isTargetRight && i === 1) || (!isTargetRight && i === 0)) && showArrow && (
              <div id={`arrow-next-slide-${slideId}`} className="arrow">
                <img src="/images/arrow_black.jpg" alt="arrow" style={{ width: "60px" }} />
              </div>
            )}
            <img 
              id={img.id} 
              className="images" 
              src={img.src} 
              alt={img.alt} 
            />
          </div>
        ))}
      </div>
      <div
        id={`character-${slideId}`}
        className="character"
        style={{
          left: `${characterPosition.x}%`,
          top: `${characterPosition.y}%`,
          position: "absolute",
          transition: "all 1s ease",
          transform: "translate(-50%,-50%)"
        }}
      >
        <img
          src={isYoungPerson ? "/images/young-person.png" : "/images/granny-trans.png"}
          alt={isYoungPerson ? "young person" : "granny"}
          width="100px"
        />
      </div>
      <div className="button-group">
        <button onClick={moveCharacter}>Move Character</button>
        <button onClick={handleNextFunc}>Next</button>
      </div>
    </div>
  );
};

export default Slide;