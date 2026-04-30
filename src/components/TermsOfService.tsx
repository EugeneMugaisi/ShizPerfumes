import React from 'react';
import '../styles/globals.css';

interface TermsOfServiceProps {
  onNavigate: (page: string) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  return (
    <div className="terms-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Terms of Service</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>Terms of Service</span>
          </div>
        </div>
      </div>

      <div className="container section-padding">
        <div className="legal-content" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          <section style={{ marginBottom: '30px' }}>
            <h2>1. Agreement to Terms</h2>
            <p>By accessing or using the ShizPerfumes website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on ShizPerfumes' website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>3. Disclaimer</h2>
            <p>The materials on ShizPerfumes' website are provided on an 'as is' basis. ShizPerfumes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>4. Limitations</h2>
            <p>In no event shall ShizPerfumes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ShizPerfumes' website.</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>5. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of Kenya and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2>6. Changes to Terms</h2>
            <p>ShizPerfumes reserves the right, at its sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
