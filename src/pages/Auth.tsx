import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Mode = "login" | "signup";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Auth() {
  const navigate = useNavigate();
  const query = useQuery();

  const initialMode: Mode = (query.get("mode") === "signup" ? "signup" : "login");
  const [mode, setMode] = useState<Mode>(initialMode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // keep mode in sync with URL
  useEffect(() => {
    const m: Mode = (query.get("mode") === "signup" ? "signup" : "login");
    setMode(m);
  }, [query]);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError("Please enter an email.");
    if (!password) return setError("Please enter a password.");
    if (isSignup && password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      // ✅ Replace this fake auth with your real API later
      await new Promise((r) => setTimeout(r, 400));

      // mark user as logged in
      localStorage.setItem("log", "true");
      // optionally store some minimal profile info
      localStorage.setItem("userEmail", email);

      // go somewhere after login/signup
      navigate("/"); // or "/profile"
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(next: Mode) {
    setError(null);
    setPassword("");
    setConfirm("");
    navigate(`/auth?mode=${next}`);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{isSignup ? "Create account" : "Welcome back"}</h1>
        <p className="auth-subtitle">
          {isSignup ? "Sign up to continue." : "Log in to continue."}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => switchMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {isSignup && (
            <label>
              Confirm password
              <input
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
              />
            </label>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Create account" : "Login"}
          </button>

          <div className="auth-footer">
            {isSignup ? (
              <span>
                Already have an account?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); switchMode("login"); }}>
                  Login
                </a>
              </span>
            ) : (
              <span>
                No account yet?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); switchMode("signup"); }}>
                  Sign up
                </a>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
