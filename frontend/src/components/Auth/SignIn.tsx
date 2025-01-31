import type React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../../services/auth";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signIn({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/rooms");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-page">
      <main>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {loading && <div className="loader"></div>}
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </main>
    </div>
  );
};

export default SignIn;