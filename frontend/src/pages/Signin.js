import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/Mind Care (1).png';
import './Signup.css';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes('@')) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (!user.emailVerified) {
                    setErrorMessage('Please verify your email before logging in.');
                    return;
                }
                navigate('/main');
            })
            .catch(() => setErrorMessage('Invalid email or password.'));
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes('@')) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => alert('Password reset link sent to your email.'))
            .catch(() => setErrorMessage('Failed to send password reset email.'));
    };

    return (
        <div className="auth-wrapper">
            {/* Abstract Background Elements */}
            <div className="abstract-bg">
                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>
                <div className="floating-circle circle-3"></div>
                <div className="geometric-shape shape-1"></div>
                <div className="geometric-shape shape-2"></div>
                <div className="gradient-blob"></div>
            </div>

            <div className="auth-container">
                {/* Left Illustration Section */}
                <div className="illustration-section">
                    <div className="illustration-content">
                        <img src={logo} alt="Mind Care Logo" className="main-logo" />
                        <h1 className="brand-title">Mind Care</h1>
                        <p className="brand-tagline">Welcome Back to Your Mental Wellness Journey</p>
                        
                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-icon">🧠</div>
                                <span>Continue Your Progress</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🌟</div>
                                <span>Access Your Resources</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🔒</div>
                                <span>Your Data is Secure</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="form-section">
                    <div className="form-container">
                        <div className="form-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to your account</p>
                        </div>

                        {errorMessage && (
                            <div className="error-alert">
                                <div className="alert-icon">⚠️</div>
                                <div className="alert-message">{errorMessage}</div>
                            </div>
                        )}

                        <form className="auth-form" onSubmit={handleLogin}>
                            <div className="input-row">
                                <div className="input-group">
                                    <label className="input-label">Email Address</label>
                                    <div className="input-wrapper">
                                        <div className="input-icon">📧</div>
                                        <input 
                                            type="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            className="modern-input" 
                                            placeholder="your.email@example.com"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label className="input-label">Password</label>
                                    <div className="input-wrapper">
                                        <div className="input-icon">🔒</div>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            className="modern-input" 
                                            placeholder="Enter your password"
                                            required 
                                        />
                                        <button 
                                            type="button" 
                                            className="password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="forgot-password">
                                <a className="forgot-password-link" onClick={handleForgotPassword}>
                                    Forgot your password?
                                </a>
                            </div>

                            <button type="submit" className="submit-button">
                                <span className="button-text">Sign In</span>
                                <div className="button-arrow">→</div>
                            </button>
                        </form>

                        <div className="form-footer">
                            <p>Don't have an account? <span className="auth-link" onClick={() => navigate('/Signup')}>Sign up</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;