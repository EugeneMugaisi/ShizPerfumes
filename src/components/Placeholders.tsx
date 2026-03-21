import React from 'react';

const Placeholder: React.FC<{ name: string }> = ({ name }) => (
  <div style={{ padding: '40px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
    <h3>{name} Placeholder</h3>
  </div>
);

export const PromoCards = () => <Placeholder name="PromoCards" />;
export const FragranceTypes = () => <Placeholder name="FragranceTypes" />;
export const AboutSection = () => <Placeholder name="AboutSection" />;
export const CTABanner = () => <Placeholder name="CTABanner" />;
export const ProductGrid = () => <Placeholder name="ProductGrid" />;
export const FeatureSection = () => <Placeholder name="FeatureSection" />;
export const Gallery = () => <Placeholder name="Gallery" />;
export const NewArrivals = () => <Placeholder name="NewArrivals" />;
export const Testimonials = () => <Placeholder name="Testimonials" />;
export const Footer = () => <Placeholder name="Footer" />;
