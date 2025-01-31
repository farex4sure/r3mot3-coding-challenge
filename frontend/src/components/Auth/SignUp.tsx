import type React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../services/auth";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp({ username, email, password });
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-page">
      <main>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {loading && <div className="loader"></div>}
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="link">
            Sign In
          </Link>
        </p>
      </main>
    </div>
  );
};

export default SignUp;
