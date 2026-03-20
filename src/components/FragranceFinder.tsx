import React, { useState } from 'react';
import { products, Product } from '../data/products';
import '../styles/FragranceFinder.css';

interface FragranceFinderProps {
  onNavigate: (page: string) => void;
}

const steps = [
  {
    id: 1,
    question: "Who are you shopping for?",
    options: ["Myself", "Partner", "Friend", "Family Member"]
  },
  {
    id: 2,
    question: "What is your preferred scent family?",
    options: ["Floral", "Woody", "Citrus", "Oriental", "Aquatic", "Spicy"]
  },
  {
    id: 3,
    question: "When will this fragrance be worn mostly?",
    options: ["Everyday Wear", "Date Night", "Work/Office", "Special Occasions"]
  },
  {
    id: 4,
    question: "How intense do you like your fragrance?",
    options: ["Light & Subtle", "Moderate", "Strong & Bold"]
  }
];

const FragranceFinder: React.FC<FragranceFinderProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Product | null>(null);

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      findMatch(newAnswers);
    }
  };

  const findMatch = (finalAnswers: string[]) => {
    const preferredCategory = finalAnswers[1];
    
    // Find a product that matches the category, or default to a random one
    const matchedProduct = products.find(p => p.category === preferredCategory) || products[0];
    
    setTimeout(() => {
      setResult(matchedProduct);
    }, 1000); // Simulate processing time
  };

  const resetFinder = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="fragrance-finder-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Fragrance Finder</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>Fragrance Finder</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="finder-container">
          {!result && answers.length === steps.length ? (
            <div className="finder-loading">
              <div className="loader"></div>
              <h2>Finding your perfect signature scent...</h2>
              <p>Analyzing your preferences...</p>
            </div>
          ) : result ? (
            <div className="finder-result">
              <span className="result-subtitle">Your Perfect Match</span>
              <h2 className="result-title">We found it!</h2>
              
              <div className="result-card">
                <div className="result-image">
                  <img src={result.image} alt={result.name} />
                </div>
                <div className="result-info">
                  <div className="result-category">{result.category}</div>
                  <h3>{result.name}</h3>
                  <div className="result-price">Ksh. {result.price.toLocaleString()}</div>
                  <p className="result-desc">
                    Based on your preference for a <strong>{answers[3].toLowerCase()}</strong>, <strong>{answers[1].toLowerCase()}</strong> fragrance for <strong>{answers[2].toLowerCase()}</strong>, we highly recommend {result.name}.
                  </p>
                  <div className="result-actions">
                    <button className="btn-primary" onClick={() => onNavigate(`product-${result.id}`)}>
                      VIEW PRODUCT
                    </button>
                    <button className="btn-secondary retake-btn" onClick={resetFinder}>
                      RETAKE QUIZ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="finder-quiz">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentStep) / steps.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="quiz-header">
                <span className="step-indicator">Step {currentStep + 1} of {steps.length}</span>
                <h2 className="question-text">{steps[currentStep].question}</h2>
              </div>

              <div className="options-grid">
                {steps[currentStep].options.map((option, index) => (
                  <button 
                    key={index} 
                    className="option-btn"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button 
                  className="back-btn"
                  onClick={() => {
                    setCurrentStep(prev => prev - 1);
                    setAnswers(prev => prev.slice(0, -1));
                  }}
                >
                  ← Back to previous question
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FragranceFinder;
