import React from 'react';
import '../PagesCSS/LandingPage.css';
import Slideshow from '../ReusableComponents/Slideshow';
import { Typography } from '@mui/material';

const LandingPage = () => {
  const slides = [
    {url: 'https://cit.edu/wp-content/uploads/2024/02/Welcome-Week-1024x684.jpg'},
    {url: 'https://cit.edu/wp-content/uploads/2024/02/Petnoy-1024x684.jpg'},
    {url: 'https://cit.edu/wp-content/uploads/2024/03/Parade-1024x575.jpg'},
  ];

  return (
    <div>
      <div className="landing-wrapper">

        <div className="section-wrapper">

          <div className="first-section">

            <div className="first-section-desc">
              <h1 style={{color: '#faaa0a'}}>CIT-U Event Hub</h1>
              <p>
                Event management is an intricate dance of coordination, creativity, and precision. It's like conducting a symphony where every instrument plays a crucial role in creating a harmonious melody. From meticulously planning the logistics to igniting the spark of innovation in the theme and design, every aspect requires careful attention.
              </p>
            </div>

            <div className="first-section-img">
              <Slideshow slides={slides} />
            </div>

          </div>
          <h2 style={{color: '#8a252c', marginTop:'10%', marginBottom:'2.5%'}}>HOW IT STARTED 🚀</h2>
          <div className="second-section">
            <div className='second-section-content'>
              <div className='second-section-img'>
                <img src="https://pbs.twimg.com/media/Ceh4YjeWIAEh3Mq.jpg"/>
              </div>
              <p>This project is made with</p>
              <div className='second-section-tech-stack'>
                  <img src='https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-48.png'/>
                  <img src='https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-html-5-48.png'/>
                  <img src='https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-css-3-48.png'/>
                  <img src='https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-52.png'/>
              </div>
            </div>
            <div className='second-section-desc'>
              <p>
                As part of our <span style={{color: '#34b4eb'}}>Systems Integration and Architecture</span> project, 
                we've created a centralized platform for accessing events from various college 
                departments and university organizations.
              </p>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default LandingPage;