// Auth.jsx
import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import './Auth.css'; // Custom styles for book animation

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="auth-container">
      <div className={`book-animation ${isSignup ? 'open-signup' : 'open-signin'}`}>
        <div className="book-page signin-page">
          <Signin toggleForm={toggleForm} />
        </div>
        <div className="book-page signup-page">
          <Signup toggleForm={toggleForm} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
