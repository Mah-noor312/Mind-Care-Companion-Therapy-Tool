// src/components/ReviewsSection.js
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser) {
          setUser(currentUser);
          setNewReview(prev => ({
            ...prev,
            email: currentUser.email || ""
          }));
          await loadUserReviews(currentUser.uid);
        }
        await loadAllReviews();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserReviews = async (userId) => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const userReviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUserReviews(userReviewsData);
    } catch (error) {
      console.error("Error loading user reviews:", error);
    }
  };

  const loadAllReviews = async () => {
    try {
      const q = query(
        collection(db, "reviews"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const allReviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(allReviews);
    } catch (error) {
      console.error("Error loading all reviews:", error);
      alert("Failed to load reviews. Please refresh the page.");
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.email.trim() || !newReview.comment.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    if (!newReview.email.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    
    try {
      const reviewData = {
        user: newReview.name,
        email: user ? user.email : "",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        userId: user ? user.uid : null,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "reviews"), reviewData);
      const review = { id: docRef.id, ...reviewData };
      
      setReviews(prev => [review, ...prev]);
      if (user) {
        setUserReviews(prev => [review, ...prev]);
      }
      
      setNewReview(prev => ({ 
        ...prev,
        name: "",
        comment: "",
        rating: 5
      }));
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReviewSubmit(e);
    }
  };

  return (
    <div className="reviews-section">
      <h2 className="section-title">What Our Users Say</h2>
      <p className="section-subtitle">Share your experience with our mental health chatbot</p>
      
      {loading ? (
        <div className="loading-message">
          <ion-icon name="refresh-circle" className="loading-icon"></ion-icon>
          <p>Loading reviews...</p>
        </div>
      ) : (
        <>
          {user && userReviews.length > 0 && (
            <>
              <h3 className="review-subsection-title">Your Review History</h3>
              <div className="reviews-container">
                {userReviews.map(review => (
                  <div key={review.id} className="review-card your-review">
                    <div className="review-header">
                      <div className="user-info">
                        <span className="review-user">{review.user}</span>
                        <span className="review-email">{review.email}</span>
                      </div>
                      <span className="review-rating">
                        {Array(review.rating).fill().map((_, i) => (
                          <ion-icon key={i} name="star"></ion-icon>
                        ))}
                      </span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <span className="review-date">{review.date}</span>
                  </div>
                ))}
              </div>
              <h3 className="review-subsection-title">All Reviews</h3>
            </>
          )}
          
          {reviews.length > 0 ? (
            <div className="reviews-container">
              {reviews.map(review => (
                <div key={review.id} className={`review-card ${user && review.userId === user.uid ? 'your-review' : ''}`}>
                  <div className="review-header">
                    <div className="user-info">
                      <span className="review-user">{review.user}</span>
                      <span className="review-email">{review.email}</span>
                    </div>
                    <span className="review-rating">
                      {Array(review.rating).fill().map((_, i) => (
                        <ion-icon key={i} name="star"></ion-icon>
                      ))}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <span className="review-date">{review.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reviews">
              <ion-icon name="chatbubbles-outline" size="large"></ion-icon>
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </>
      )}
      
      <form className="review-form" onSubmit={handleReviewSubmit}>
        <h3>Share Your Experience</h3>
        
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newReview.name}
            onChange={handleReviewChange}
            required
            placeholder="Enter your name"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newReview.email}
            onChange={handleReviewChange}
            required
            placeholder="Enter your email"
            readOnly={!!user}
            disabled={loading}
          />
        </div>
        
        <div className="form-group rating-group">
          <label>Your Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star-${star}`}
                  name="rating"
                  value={star}
                  checked={newReview.rating === star}
                  onChange={handleReviewChange}
                  disabled={loading}
                />
                <label htmlFor={`star-${star}`}>
                  <ion-icon name={newReview.rating >= star ? "star" : "star-outline"}></ion-icon>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="comment">Your Thoughts:</label>
          <textarea
            id="comment"
            name="comment"
            placeholder="How was your experience with our chatbot? Share your thoughts..."
            value={newReview.comment}
            onChange={handleReviewChange}
            onKeyDown={handleKeyDown}
            required
            rows="4"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-review-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <ion-icon name="refresh-circle" className="loading-icon"></ion-icon>
              Submitting...
            </>
          ) : (
            <>
              <ion-icon name="send"></ion-icon> Submit Review
            </>
          )}
        </button>
        
        {submitted && (
          <div className="submission-message">
            <ion-icon name="checkmark-circle"></ion-icon>
            Thank you for your review!
          </div>
        )}
      </form>
    </div>
  );
};

export default ReviewsSection;