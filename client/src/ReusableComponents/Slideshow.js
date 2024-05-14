import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SlideShowContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.currentSlide === props.index ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  border-radius: 10px;
`;

const Slideshow = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <SlideShowContainer>
      {slides.map((slide, index) => (
        <Slide
          key={index}
          index={index}
          currentSlide={currentSlide}
          style={{ backgroundImage: `url(${slide.url})` }}
        />
      ))}
    </SlideShowContainer>
  );
};

export default Slideshow;