import React from 'react';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Eugene Mugaisi",
    role: "Regular Customer",
    text: "The fragrance selection here is unparalleled. I found my signature scent and haven't looked back. The shipping was incredibly fast!",
    rating: 5
  },
  {
    id: 2,
    name: "Rickaard Musoga",
    role: "Fragrance Enthusiast",
    text: "I've been collecting perfumes for years, and the quality of the 'Royal Oud' I purchased is top-tier. Highly recommend this shop to all collectors.",
    rating: 5
  },
  {
    id: 3,
    name: "Keiko Musoga",
    role: "Lifestyle Blogger",
    text: "Beautifully packaged and even better than described. The 'Floral Notes' collection is perfect for spring. Will definitely be ordering more.",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-title">
          <span>Testimonials</span>
          <h2>What Our Customers say</h2>
          <p>Don't just take our word for it—hear from our satisfied customers around the globe.</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="rating-stars">
                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <h4 className="author-name">{testimonial.name}</h4>
                <span className="author-role">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
