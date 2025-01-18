import React, { useState, useEffect } from "react";

const Slide = ({
  slideId,
  images,
  grandmaInitialPosition,
  targetPosition,
  onMoveGrandma,
  onNext,
  showArrow,
}) => {
  const [grandmaPosition, setGrandmaPosition] = useState(grandmaInitialPosition);

  const moveGrandma = () => {
    setGrandmaPosition(targetPosition);
    if (onMoveGrandma) onMoveGrandma(slideId);
  };

  const handleNextFunc = () => {
    reset();
    onNext();
  }

  const reset = () => {
    setGrandmaPosition(grandmaInitialPosition);
  }

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

  return (
    <div id={`slide-${slideId}`} className="slide" style={{ display: "block" }}>
      <div className="image-container">
        {images.map((img, i) => (
            <div className="image-group">
                {i==0 ?         
                <div id={`arrow-next-slide-${slideId}`} className="arrow">
                    ➡️
                </div> : ""}
                <img
                    key={img.id}
                    id={img.id}
                    className="images"
                    src={img.src}
                    alt={img.alt}
                />
            </div>
        ))}
      </div>
      <div
        id={`grandma-${slideId}`}
        className="character"
        style={{
          left: `${grandmaPosition.x}%`,
          top: `${grandmaPosition.y}%`,
          position: "absolute",
          transition: "all 1s ease",
          transform: "translate(-50%,-50%)"
        }}
      >
            <img
                src="/images/granny-trans.png"
                alt="granny"
                width="70px"
            />
      </div>

      {/* {showArrow && (
        <div id={`arrow-next-slide-${slideId}`} className="arrow">
          ➡️
        </div>
      )} */}

        <div className="button-group">
            <button onClick={moveGrandma}>Move Grandma</button>
            <button onClick={handleNextFunc}>Next</button>
        </div>
    </div>
  );
};

export default Slide;