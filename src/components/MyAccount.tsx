import React, { useState } from 'react';
import '../styles/MyAccount.css';

interface MyAccountProps {
  onNavigate: (page: string) => void;
}

const MyAccount: React.FC<MyAccountProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isLogin ? 'Successfully logged in!' : 'Successfully registered!');
    onNavigate('home');
  };

  return (
    <div className="account-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">My Account</h1>
          <div className="breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a> / <span>My Account</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="account-container">
          <div className="account-tabs">
            <button 
              className={isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={!isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <div className="account-form-wrapper">
            <form className="account-form" onSubmit={handleSubmit}>
              <h2 className="form-title">{isLogin ? 'Login' : 'Register'}</h2>
              
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="reg-name">Full Name *</label>
                  <input type="text" id="reg-name" required />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email address *</label>
                <input type="email" id="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input type="password" id="password" required />
              </div>

              {isLogin && (
                <div className="form-actions-row">
                  <div className="checkbox-group">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#" className="forgot-password">Lost your password?</a>
                </div>
              )}

              <button type="submit" className="btn-primary account-submit-btn">
                {isLogin ? 'LOG IN' : 'REGISTER'}
              </button>

              <div className="social-login">
                <span>Or sign in with:</span>
                <div className="social-btns">
                  <button type="button" className="social-btn google">G</button>
                  <button type="button" className="social-btn facebook">F</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
