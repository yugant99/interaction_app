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
}) => {
  const initialPosition = isYoungPerson ? youngPersonInitialPosition : grandmaInitialPosition;
  const [characterPosition, setCharacterPosition] = useState(initialPosition);

  const moveCharacter = () => {
    setCharacterPosition(targetPosition);
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
    if (showArrow) {
      const arrowElement = document.getElementById(`arrow-next-slide-${slideId}`);
      const targetImageElement = document.getElementById(images[0].id);

      if (arrowElement && targetImageElement) {
        const rect = targetImageElement.getBoundingClientRect();
        arrowElement.style.left = `${rect.left + window.scrollX}px`;
        arrowElement.style.top = `${rect.top + window.scrollY}px`;
      }
    }
  }, [showArrow, images, slideId]);

  useEffect(() => {
    setCharacterPosition(initialPosition);
  }, [isYoungPerson, initialPosition]);

  return (
    <div id={`slide-${slideId}`} className="slide" style={{ display: "block" }}>
      <div className="image-container">
        {images.map((img, i) => (
          <div className="image-group" key={img.id}>
            {i === 0 && showArrow && (
              <div id={`arrow-next-slide-${slideId}`} className="arrow">➡️</div>
            )}
            <img id={img.id} className="images" src={img.src} alt={img.alt} />
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
          width="70px"
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