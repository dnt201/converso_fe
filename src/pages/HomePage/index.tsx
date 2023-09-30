import React from 'react';
import videoDemo from '@assets/video/chatbot-home-app.mp4';
import './style.less';
import { Button, Input } from 'antd';
const HomePage = () => {
   return (
      <div className="home-page">
         {/* left */}
         <div className="layer-sign-up">
            <div className="left-container">
               <h1>
                  With ChatBot, automating customer service is a{' '}
                  <span className="text-mark">breeze</span>
               </h1>
               <span>
                  An all-in-one platform to build and launch conversational chatbots without coding.
               </span>
               <div className="contact-container">
                  <Input placeholder="Enter your business mail" />
                  <Button type="primary"> Sign Up Free</Button>
               </div>
            </div>
            {/* right */}
            <div className="right-container">
               <video preload="none" autoPlay loop muted src={videoDemo} />
            </div>
         </div>
      </div>
   );
};

export default HomePage;
