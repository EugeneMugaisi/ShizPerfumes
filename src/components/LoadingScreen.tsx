import React from 'react';
import '../styles/LoadingScreen.css';
import logo from '../assets/Logo/ShizPerfumesLogo.png';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-wrapper">
          <img src={logo} alt="Loading..." className="loading-logo" />
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
