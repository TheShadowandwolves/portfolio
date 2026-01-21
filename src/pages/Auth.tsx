import { useEffect, useMemo, useRef, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {auth} from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

type Mode = "login" | "signup";
type SignupStep = 1 | 2 | 3 | 4 | 5;

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}


/**
 * Wordle-like 8-char password input.
 * - Each box maxLength=1
 * - Auto-advance on input
 * - Backspace goes back
 * - Paste fills forward
 * - Emits full string via onChange
 */
function Password8({
  label,
  value,
  onChange,
  masked = true,
}: {
  label: string;
  value: string; // length 0..8
  onChange: (next: string) => void;
  masked?: boolean;
}) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const chars = useMemo(() => {
    const arr = Array(8).fill("");
    for (let i = 0; i < 8; i++) arr[i] = value[i] ?? "";
    return arr;
  }, [value]);

  const focusIndex = (i: number) => {
    inputsRef.current[i]?.focus();
    inputsRef.current[i]?.select();
  };

  const setCharAt = (index: number, char: string) => {
    const next = chars.slice();
    next[index] = char;
    onChange(next.join("").slice(0, 8));
  };

  const handleChange = (index: number, raw: string) => {
    if (!raw) {
      setCharAt(index, "");
      return;
    }

    // handle paste or multi-character input
    const incoming = raw.replace(/\s+/g, "").slice(0, 8 - index);
    if (incoming.length > 1) {
      const next = chars.slice();
      for (let k = 0; k < incoming.length; k++) {
        next[index + k] = incoming[k];
      }
      onChange(next.join("").slice(0, 8));
      const nextFocus = Math.min(index + incoming.length, 7);
      focusIndex(nextFocus);
      return;
    }

    // single char
    const ch = incoming[0];
    setCharAt(index, ch);

    if (index < 7) focusIndex(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (chars[index]) {
        // clear current
        setCharAt(index, "");
        return;
      }
      // move back and clear previous
      if (index > 0) {
        setCharAt(index - 1, "");
        focusIndex(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) focusIndex(index - 1);
    } else if (e.key === "ArrowRight") {
      if (index < 7) focusIndex(index + 1);
    }
  };

  return (
    <label>
      {label}
      <div className="entry">
        {chars.map((ch, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            className="entry-box"
            type={masked ? "password" : "text"}
            inputMode="text"
            autoComplete="off"
            maxLength={8} // we handle multi-char paste ourselves
            value={ch}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.currentTarget.select()}
            aria-label={`${label} character ${i + 1}`}
          />
        ))}
      </div>
    </label>
  );
}

export default function Auth() {
  const language = localStorage.getItem("language") || "en";
  const navigate = useNavigate();
  const query = useQuery();

  const initialMode: Mode = query.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<Mode>(initialMode);

  // login + signup shared
  const [email, setEmail] = useState("");

  // wordle password strings
  const [password, setPassword] = useState(""); // 0..8
  const [confirm, setConfirm] = useState("");  // 0..8

  // signup wizard state
  const [step, setStep] = useState<SignupStep>(1);

  // signup fields
  const [name, setName] = useState("");
  const [ageDay, setAgeDay] = useState("");
  const [ageMonth, setAgeMonth] = useState("");
  const [ageYear, setAgeYear] = useState("");
  const [street, setStreet] = useState("");
  const [plz, setPLZ] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  // payment fields (note: do NOT do real payments like this; use Stripe/etc.)
  const [creditNumber, setCreditNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");

  // accepting terms & conditions
    const [acceptTos, setAcceptTos] = useState(false);
    const [acceptPrivateDataUse, setAcceptPrivateDataUse] = useState(false);
    const [recommendToOthers, setRecommendToOthers] = useState(false);
    const [acceptCookies, setAcceptCookies] = useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const m: Mode = query.get("mode") === "signup" ? "signup" : "login";
    setMode(m);

    // reset step when switching modes
    setStep(1);
    setError(null);
    setPassword("");
    setConfirm("");
  }, [query]);

  const isSignup = mode === "signup";

  function switchMode(next: Mode) {
    setError(null);
    navigate(`/auth?mode=${next}`);
  }

  // ---------- validation helpers ----------
  const isEmailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  function validateStep(current: SignupStep): string | null {
    if (!isEmailValid(email)) return "Please enter a valid email.";

    if (current === 1) {
      if (password.length !== 8) return "Password must be exactly 8 characters.";
      if (confirm.length !== 8) return "Confirm password must be exactly 8 characters.";
      if (password !== confirm) return "Passwords do not match.";
    }

    if (current === 2) {
      if (!name.trim()) return "Please enter your name.";
      const d = Number(ageDay), m = Number(ageMonth), y = Number(ageYear);
      if (!d || d < 1 || d > 31) return "Day must be 1-31.";
      if (!m || m < 1 || m > 12) return "Month must be 1-12.";
      if (!y || y < 1900 || y > new Date().getFullYear()) return "Year is not valid.";
      if (!gender) return "Please select a gender.";
    }

    if (current === 3) {
      if (!street.trim()) return "Please enter your street.";
      if (!plz.trim()) return "Please enter your postal code (PLZ).";
      if (!city.trim()) return "Please enter your city.";
      if (!country.trim()) return "Please enter your country.";
      if (!phone.trim()) return "Please enter your phone number.";
    }

    if (current === 4) {
      if (creditNumber.replace(/\s+/g, "").length < 12) return "Card number looks too short.";
      if (cvc.trim().length < 3) return "CVC must be at least 3 digits.";
      const mm = Number(cardMonth);
      const yy = Number(cardYear);
      if (!mm || mm < 1 || mm > 12) return "Card month must be 1-12.";
      if (!yy || cardYear.trim().length !== 2) return "Card year must be 2 digits (e.g. 28).";
    }
    if (current === 5) {
    if (!acceptTos) return "Bitte akzeptieren Sie die Terms & Conditions.";
    if (!acceptPrivateDataUse) return "Bitte bestätigen Sie die Nutzung der Daten für private Zwecke.";
    }


    return null;
  }

  function nextStep() {
    const msg = validateStep(step);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    setStep((s) => (s < 5 ? ((s + 1) as SignupStep) : s));
  }

  function prevStep() {
    setError(null);
    setStep((s) => (s > 1 ? ((s - 1) as SignupStep) : s));
  }

  async function signInFB(email: string, pass: string){
    try{
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (err){
        console.error(err);
    }
        
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // LOGIN FLOW
    if (!isSignup) {
      if (!isEmailValid(email)) return setError("Please enter a valid email.");
      if (password.length !== 8) return setError("Password must be exactly 8 characters.");

      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 400));
        localStorage.setItem("log", "true");
        localStorage.setItem("userEmail", email);
        signInFB(email, password);
        navigate("/");
      } catch {
        setError("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // SIGNUP FLOW: Continue until last step, then create account
    if (step < 5) {
      nextStep();
      return;
    }

    const msg = validateStep(5);
    if (msg) return setError(msg);

    setLoading(true);
    try {
      // ✅ Replace with real API call later
      await new Promise((r) => setTimeout(r, 600));

      localStorage.setItem("log", "true");
      localStorage.setItem("userEmail", email);

      // Optional: store profile info
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          name,
          dob: `${ageYear}-${ageMonth.padStart(2, "0")}-${ageDay.padStart(2, "0")}`,
          gender,
          phone,
          address: { street, plz, city, country },
        })
      );

      navigate("/"); // or "/profile"
    } catch {
      setError("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ---------- UI text ----------
  const t = {
    create: language === "de" ? "Konto erstellen" : "Create account",
    welcome: language === "de" ? "Willkommen zurück" : "Welcome back",
    signupHint: language === "de" ? "Melden Sie sich an, um fortzufahren." : "Sign up to continue.",
    loginHint: language === "de" ? "Anmelden, um fortzufahren." : "Log in to continue.",
    continue: language === "de" ? "Weiter" : "Continue",
    back: language === "de" ? "Zurück" : "Back",
    finish: language === "de" ? "Fertig" : "Finish",
    login: language === "de" ? "Anmelden" : "Login",
  };

  const signupProgressLabel = `${step}/5`;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{isSignup ? t.create : t.welcome}</h1>
        <p className="auth-subtitle">{isSignup ? t.signupHint : t.loginHint}</p>

        {isSignup && (
          <div className="signup-progress">
            <div className="signup-progress-row">
              <span>Step {signupProgressLabel}</span>
              <span className="muted">
                {step === 1 && "Account"}
                {step === 2 && "Personal"}
                {step === 3 && "Address"}
                {step === 4 && "Payment"}
                {step === 5 && "Validation"}
              </span>
            </div>
            <div className="signup-progress-bar">
              <div className="signup-progress-fill" style={{ width: `${(step / 5) * 100}%` }} />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* EMAIL always */}
          <label>
            Email
            <input
              type="email"
              autoComplete="email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          {/* LOGIN: show password only */}
          {!isSignup && (
            <Password8 label="Password" value={password} onChange={setPassword} masked />
          )}

          {/* SIGNUP STEPS */}
          {isSignup && (
            <Fragment>
              {step === 1 && (
                <Fragment>
                  <Password8 label="Password" value={password} onChange={setPassword} masked />
                  <Password8 label="Confirm password" value={confirm} onChange={setConfirm} masked />
                </Fragment>
              )}

              {step === 2 && (
                <Fragment>
                  <label>
                    Name
                    <input
                      type="text"
                      value={name}
                      className="email"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith"
                    />
                  </label>

                  <div className="grid-3">
                    <label>
                      Day
                      <input value={ageDay} onChange={(e) => setAgeDay(e.target.value)} placeholder="DD" className="date"/>
                    </label>
                    <label>
                      Month
                      <input value={ageMonth} onChange={(e) => setAgeMonth(e.target.value)} placeholder="MM" className="date"/>
                    </label>
                    <label>
                      Year
                      <input value={ageYear} onChange={(e) => setAgeYear(e.target.value)} placeholder="YYYY" className="Ydate"/>
                    </label>
                  </div>

                  <label>
                    Gender
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="gender">
                      <option value="">Select…</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="na">Prefer not to say</option>
                    </select>
                  </label>
                </Fragment>
              )}

              {step === 3 && (
                <Fragment>
                  <label>
                    Street
                    <input className="email" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Main St 12" />
                  </label>

                  <div className="grid-2">
                    <label>
                      PLZ
                      <input className="email" value={plz} onChange={(e) => setPLZ(e.target.value)} placeholder="4051" />
                    </label>
                    <label>
                      City
                      <input className="email" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Basel" />
                    </label>
                  </div>

                  <label>
                    Country
                    <input className="email" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Switzerland" />
                  </label>

                  <label>
                    Phone
                    <input className="email" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+41 79 123 45 67" />
                  </label>
                </Fragment>
              )}

              {step === 4 && (
                <Fragment>
                  <label>
                    Card number
                    <input
                      value={creditNumber}
                      className="email"
                      onChange={(e) => setCreditNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                    />
                  </label>

                  <div className="grid-3">
                    <label>
                      CVC
                      <input
                      className="email"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123"
                        inputMode="numeric"
                      />
                    </label>
                    <label>
                      Month
                      <input
                      className="email"
                        value={cardMonth}
                        onChange={(e) => setCardMonth(e.target.value)}
                        placeholder="MM"
                        inputMode="numeric"
                      />
                    </label>
                    <label>
                      Year
                      <input
                      className="email"
                        value={cardYear}
                        onChange={(e) => setCardYear(e.target.value)}
                        placeholder="YY"
                        inputMode="numeric"
                      />
                    </label>
                  </div>

                  <div className="auth-note">
                    ⚠️ For real payments, don't store card data yourself. Use Stripe/PayPal.
                  </div>
                </Fragment>
              )}
                {step === 5 && (
                <Fragment>
                    <div className="terms-box">
                    <p className="muted" style={{ marginTop: 0 }}>
                        Bitte lesen und akzeptieren Sie die folgenden Bedingungen, um Ihr Konto zu erstellen.
                    </p>

                    <ul className="terms-links">
                        <li>
                        <a href="/terms" target="_blank" rel="noreferrer">
                            Terms & Conditions öffnen
                        </a>
                        </li>
                        <li>
                        <a href="/privacy" target="_blank" rel="noreferrer">
                            Datenschutzerklärung öffnen
                        </a>
                        </li>
                        <li>
                        <a href="/cookies" target="_blank" rel="noreferrer">
                            Cookie-Richtlinie öffnen
                        </a>
                        </li>
                    </ul>

                    <label className="checkbox-row">
                        <input
                        type="checkbox"
                        checked={acceptTos}
                        onChange={(e) => setAcceptTos(e.target.checked)}
                        />
                        <span>
                        Ich akzeptiere die{" "}
                        <a href="/terms" target="_blank" rel="noreferrer">Terms & Conditions</a> <span className="req">*</span>
                        </span>
                    </label>

                    <label className="checkbox-row">
                        <input
                        type="checkbox"
                        checked={acceptPrivateDataUse}
                        onChange={(e) => setAcceptPrivateDataUse(e.target.checked)}
                        />
                        <span>
                        Ich erlaube die Nutzung meiner Daten für private Zwecke (z.B. Matching, Profilanzeige) <span className="req">*</span>
                        </span>
                    </label>

                    <label className="checkbox-row">
                        <input
                        type="checkbox"
                        checked={recommendToOthers}
                        onChange={(e) => setRecommendToOthers(e.target.checked)}
                        />
                        <span>
                        Empfehlen Sie mich anderen Job-Suchenden (bessere Sichtbarkeit)
                        </span>
                    </label>

                    <label className="checkbox-row">
                        <input
                        type="checkbox"
                        checked={acceptCookies}
                        onChange={(e) => setAcceptCookies(e.target.checked)}
                        />
                        <span>
                        Ich akzeptiere Cookies (Analytics & bessere User Experience)
                        </span>
                    </label>

                    <div className="terms-footnote muted">
                        <span className="req">*</span> Pflichtfeld
                    </div>
                    </div>
                </Fragment>
                )}

            </Fragment>
          )}

          {error && <div className="auth-error">{error}</div>}

          {/* Buttons */}
          <div className="auth-actions">
            {isSignup && step > 1 && (
              <button type="button" className="auth-secondary" onClick={prevStep} disabled={loading}>
                {t.back}
              </button>
            )}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : isSignup
                  ? (step < 5 ? t.continue : t.finish)
                  : t.login}
            </button>
          </div>

          <div className="auth-footer">
            {isSignup ? (
              <span>
                Already have an account?{" "}
                <a
                  href="#"
                  className="alreadyAcc"
                  onClick={(e) => {
                    e.preventDefault();
                    switchMode("login");
                  }}
                >
                  Login
                </a>
              </span>
            ) : (
              <span>
                No account yet?{" "}
                <a
                  href="#"
                  className="alreadyAcc"
                  onClick={(e) => {
                    e.preventDefault();
                    switchMode("signup");
                  }}
                >
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
