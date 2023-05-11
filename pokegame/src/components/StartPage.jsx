import React, { useEffect, useRef } from 'react';
import Button from "react-bootstrap/Button";

function Intro(props) {
    const handleNext = props.handleNext;

    const videoRef = useRef(null);
    
     const handleButtonClick = () => {
    if (videoRef.current && document.fullscreenEnabled) {
      videoRef.current.requestFullscreen().then(() => {
        videoRef.current.play();
      });
    }
  };


  return (
    <div>
      <video ref={videoRef} src="https://static.moewalls.com/videos/preview/2022/pikachu-drinking-coffee-detective-pikachu-preview.mp4" autoPlay controls />
        <Button className="mx-1 mt-3" size="lg" variant="warning" onClick={handleButtonClick}>
        Fullscreen
          </Button>
          <Button className="mx-1 mt-3" size="lg" variant="danger" onClick={ handleNext}>Go, fight!</Button>
    </div>
  );
}

export default Intro;