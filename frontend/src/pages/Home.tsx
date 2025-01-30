import React from "react";
import { Link } from "react-router-dom"
import "./LandingPage.css"

const Home: React.FC = () => (
    <div className="landing-page">

        <h1>Welcome to Real-Time Chat App</h1>
        <p>Experience real-time conversations like never before</p>
        <div className="button-container">
          <Link to="/signup" className="button primary">
            Sign Up
          </Link>
          <Link to="/signin" className="button secondary">
            Sign In
          </Link>
        </div>
    </div>

);



export default Home;