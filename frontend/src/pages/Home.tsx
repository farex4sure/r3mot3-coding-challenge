import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div className="home">
    <h1>Welcome to Real-Time Chat App</h1>
    <div>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
);

export default Home;
