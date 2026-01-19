import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:5119/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        setError("Invalid login");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      navigate("/dashboard");

    } catch {
      setError("Server error");
    }
  };

  return (
  <div className="card">
    <h2>Login</h2>

    <input
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>Login</button>

    {error && <p className="error">{error}</p>}
  </div>
);

}

export default Login;
