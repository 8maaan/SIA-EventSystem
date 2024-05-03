import React from 'react';
import "../PagesCSS/LandingPage.css";
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';


const LandingPage = () => {

   
    return (
        <div>
            <div className='landing-wrapper'>
                <div className='section-wrapper'>
                    <div className='first-section'>
                        <div className='first-section-desc'>
                            <h1>CIT-U Event Hub</h1>
                            <p>
                                Event management is an intricate dance of cooridation, creativity, and precision.
                                It's like conducting a symphony where every instrument plays a crucial role in creating
                                a haromonious melody. From meticulously planning the logistics to igniting the spark of 
                                innovation in the theme and design, every aspect requires careful attention.
                            </p>
                        </div>
                        <div className='first-section-img'>
                            {/* TO BE ADDED */}
                        </div>
                    </div>
                    <div className='second-section'>
                        <h1>TO BE ADDED LATER 🥰</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage