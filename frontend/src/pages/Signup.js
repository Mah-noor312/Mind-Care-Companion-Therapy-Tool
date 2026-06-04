import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";
import logo from '../assets/Mind Care (1).png';
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!name.trim()) return setErrorMessage("Name is required.");
        if (!email.trim() || !email.includes("@")) return setErrorMessage("Please enter a valid email.");
        if (!city.trim()) return setErrorMessage("City is required.");
        if (password.length < 6) return setErrorMessage("Password must be at least 6 characters.");
        if (password !== confirmPassword) return setErrorMessage("Passwords do not match.");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            alert("Verification email sent! Please verify before logging in.");
            navigate("/login");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="signup-wrapper">
            {/* Abstract Background Elements */}
            <div className="abstract-bg">
                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>
                <div className="floating-circle circle-3"></div>
                <div className="geometric-shape shape-1"></div>
                <div className="geometric-shape shape-2"></div>
                <div className="gradient-blob"></div>
            </div>

            <div className="signup-container">
                {/* Left Illustration Section */}
                <div className="illustration-section">
                    <div className="illustration-content">
                        <img src={logo} alt="Mind Care Logo" className="main-logo" />
                        <h1 className="brand-title">Mind Care</h1>
                        <p className="brand-tagline">Your Journey to Mental Wellness Begins Here</p>
                        
                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-icon">🧠</div>
                                <span>Professional Support</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🌟</div>
                                <span>Personalized Care</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🔒</div>
                                <span>Secure & Private</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="form-section">
                    <div className="form-container">
                        <div className="form-header">
                            <h2>Create Account</h2>
                            <p>Join our community of mental wellness</p>
                        </div>

                        {errorMessage && (
                            <div className="error-alert">
                                <div className="alert-icon">⚠️</div>
                                <div className="alert-message">{errorMessage}</div>
                            </div>
                        )}

                        <form className="signup-form" onSubmit={handleSignup}>
                            <div className="input-row">
                                <div className="input-group">
                                    <label className="input-label">Full Name</label>
                                    <div className="input-wrapper">
                                        <div className="input-icon">👤</div>
                                        <input 
                                            type="text" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            className="modern-input" 
                                            placeholder="Enter your full name"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

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
                                    <label className="input-label">City</label>
                                    <div className="input-wrapper">
                                        <div className="input-icon">🏙️</div>
                                        <input 
                                            type="text" 
                                            value={city} 
                                            onChange={(e) => setCity(e.target.value)} 
                                            className="modern-input" 
                                            placeholder="Your city"
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
                                            placeholder="At least 6 characters"
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

                            <div className="input-row">
                                <div className="input-group">
                                    <label className="input-label">Confirm Password</label>
                                    <div className="input-wrapper">
                                        <div className="input-icon">✅</div>
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                            className="modern-input" 
                                            placeholder="Re-enter your password"
                                            required 
                                        />
                                        <button 
                                            type="button" 
                                            className="password-toggle"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="submit-button">
                                <span className="button-text">Create Account</span>
                                <div className="button-arrow">→</div>
                            </button>
                        </form>

                        <div className="form-footer">
                            <p>Already have an account? <a href="/Signin" className="login-link">Sign in</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;