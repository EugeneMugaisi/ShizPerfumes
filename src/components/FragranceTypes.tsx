import React from 'react';
import '../styles/FragranceTypes.css';

const fragranceCategories = [
  {
    title: 'Fresh Fragrances',
    description: 'Clean, bright and uplifting scents often featuring citrus, green notes and water accords for an energetic feel.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M32 10C32 10 15 25 15 40C15 49.3888 22.6112 57 32 57C41.3888 57 49 49.3888 49 40C49 25 32 10 32 10Z" />
        <path d="M32 20C32 20 20 30 20 40C20 46.6274 25.3726 52 32 52" />
      </svg>
    )
  },
  {
    title: 'Floral Fragrances',
    description: 'The most popular family, ranging from single flower notes to complex bouquets of jasmine, rose and lily.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="32" cy="32" r="6" />
        <path d="M32 26C32 18 40 10 48 18C40 26 32 26 32 26Z" />
        <path d="M38 32C46 32 54 40 46 48C38 40 38 32 38 32Z" />
        <path d="M32 38C32 46 24 54 16 46C24 38 32 38 32 38Z" />
        <path d="M26 32C18 32 10 24 18 16C26 24 26 32 26 32Z" />
      </svg>
    )
  },
  {
    title: 'Oceanic Fragrances',
    description: 'Modern, crisp scents that evoke the sea breeze, salt water and fresh coastal air for ultimate clarity.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 40C15 35 20 35 25 40C30 45 35 45 40 40C45 35 50 35 54 40" />
        <path d="M10 30C15 25 20 25 25 30C30 35 35 35 40 30C45 25 50 25 54 30" />
        <path d="M10 50C15 45 20 45 25 50C30 55 35 55 40 50C45 45 50 45 54 50" />
      </svg>
    )
  },
  {
    title: 'Woody Fragrances',
    description: 'Warm, mysterious and earthy scents based on sandalwood, cedarwood, amber and vetiver for deep character.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M32 10L45 50H19L32 10Z" />
        <path d="M32 50V57" />
        <path d="M25 30L15 40" />
        <path d="M39 30L49 40" />
      </svg>
    )
  }
];

const FragranceTypes: React.FC = () => {
  return (
    <section className="fragrance-types section-padding">
      <div className="container">
        <div className="section-title">
          <span>Category</span>
          <h2>FRAGRANCE TYPES</h2>
          <p>The stylish and organized cosmetic products</p>
        </div>
        
        <div className="fragrance-grid">
          {fragranceCategories.map((category, index) => (
            <div key={index} className="fragrance-item">
              <div className="fragrance-icon">
                {category.icon}
              </div>
              <h3 className="fragrance-item-title">{category.title}</h3>
              <p className="fragrance-item-desc">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FragranceTypes;
