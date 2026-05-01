import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';  // 👈 adjust path if needed
import { useCustomerAuth } from '../context/CustomerAuthContext';
import '../styles/MyAccount.css';

interface MyAccountProps {
  onNavigate: (page: string) => void;
}

const MyAccount: React.FC<MyAccountProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, customerProfile } = useCustomerAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [resetLoading, setResetLoading] = useState(false);

    const handleForgotPassword = async () => {
      if (!resetEmail) {
        setResetMessage('Please enter your email address.');
        return;
      }

      setResetLoading(true);
      setResetMessage('');

      try {
        await sendPasswordResetEmail(auth, resetEmail);
        setResetMessage('✅ Reset email sent! Check your inbox and follow the link to reset your password.');
      } catch (err: any) {
        switch (err.code) {
          case 'auth/user-not-found':
            setResetMessage('❌ No account found with this email address.');
            break;
          case 'auth/invalid-email':
            setResetMessage('❌ Please enter a valid email address.');
            break;
          default:
            setResetMessage('❌ Something went wrong. Please try again.');
        }
      } finally {
        setResetLoading(false);
      }
    };

  // If customer is already logged in show their account page
  if (currentUser && customerProfile) {
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
            <div style={{ padding: "2rem 0" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>
                Welcome back, {customerProfile.name}! 👋
              </h2>
              <p style={{ color: "#888", marginBottom: "2rem" }}>
                {customerProfile.email}
              </p>

              <button
                onClick={() => onNavigate('orders')}
                style={{
                  padding: "0.75rem 1.5rem", backgroundColor: "#1a1a1a",
                  color: "white", border: "none", borderRadius: "8px",
                  cursor: "pointer", fontSize: "0.95rem", marginRight: "1rem",
                }}
              >
                View My Orders
              </button>

              <button
                onClick={async () => {
                  await signOut(auth);
                  onNavigate('home');
                }}
                style={{
                  padding: "0.75rem 1.5rem", backgroundColor: "white",
                  color: "#333", border: "1px solid #ddd", borderRadius: "8px",
                  cursor: "pointer", fontSize: "0.95rem",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    try {
      if (isLogin) {
        // Log in existing customer
        await signInWithEmailAndPassword(auth, email, password);
        onNavigate('home');

      } else {
        // Register new customer
        const name = (form.querySelector('#reg-name') as HTMLInputElement).value;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save customer profile to Firestore
        await setDoc(doc(db, 'customers', user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          createdAt: serverTimestamp(),
        });

        alert('Account created successfully! Welcome to Shiz Perfumes 🎉');
        onNavigate('home');
      }

    } catch (err: any) {
      // Show friendly error messages
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists. Please log in.');
          break;
        case 'auth/weak-password':
          setError('Password must be at least 6 characters long.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Login
            </button>
            <button
              className={!isLogin ? 'active' : ''}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Register
            </button>
          </div>

          <div className="account-form-wrapper">
            <form className="account-form" onSubmit={handleSubmit}>
              <h2 className="form-title">{isLogin ? 'Login' : 'Register'}</h2>

              {/* Error Message */}
              {error && (
                <div style={{
                  backgroundColor: '#fef2f2', color: '#ef4444',
                  padding: '0.75rem 1rem', borderRadius: '8px',
                  marginBottom: '1rem', fontSize: '0.88rem',
                }}>
                  {error}
                </div>
              )}

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
                  <a href="#"
                      className="forgot-password"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPassword(true);
                        setResetEmail('');
                        setResetMessage('');
                      }}
                    >
                      Lost your password?
                    </a>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary account-submit-btn"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Please wait...' : isLogin ? 'LOG IN' : 'REGISTER'}
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
      {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
          }}>
            <div style={{
              backgroundColor: 'white', borderRadius: '12px',
              padding: '2rem', width: '100%', maxWidth: '420px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)', margin: '0 1rem',
            }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
                Reset Password
              </h3>
              <p style={{ color: '#888', fontSize: '0.88rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {/* Reset Message */}
              {resetMessage && (
                <div style={{
                  padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem',
                  backgroundColor: resetMessage.startsWith('✅') ? '#f0fdf4' : '#fef2f2',
                  color: resetMessage.startsWith('✅') ? '#16a34a' : '#ef4444',
                  fontSize: '0.85rem', lineHeight: 1.5,
                }}>
                  {resetMessage}
                </div>
              )}

              {/* Email Input */}
              {!resetMessage.startsWith('✅') && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{
                    display: 'block', marginBottom: '0.4rem',
                    fontSize: '0.85rem', fontWeight: 500,
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%', padding: '0.65rem', border: '1px solid #ddd',
                      borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box',
                    }}
                  />
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {!resetMessage.startsWith('✅') && (
                  <button
                    onClick={handleForgotPassword}
                    disabled={resetLoading}
                    style={{
                      flex: 1, padding: '0.7rem', backgroundColor: '#1a1a1a',
                      color: 'white', border: 'none', borderRadius: '8px',
                      cursor: resetLoading ? 'not-allowed' : 'pointer',
                      fontSize: '0.9rem', opacity: resetLoading ? 0.7 : 1,
                    }}
                  >
                    {resetLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetMessage('');
                    setResetEmail('');
                  }}
                  style={{
                    flex: 1, padding: '0.7rem', backgroundColor: 'white',
                    color: '#555', border: '1px solid #ddd', borderRadius: '8px',
                    cursor: 'pointer', fontSize: '0.9rem',
                  }}
                >
                  {resetMessage.startsWith('✅') ? 'Done' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default MyAccount;
