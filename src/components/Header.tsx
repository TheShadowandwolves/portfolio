import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/public/logo.jpg";

import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function LinkToSection(sectionId: string) {
  window.location.href = `/portfolio/#${sectionId}`;
}

function setLanguageMode(lang: string) {
  localStorage.setItem("language", lang);
  window.location.reload();
}

function applyTheme(theme: "light" | "dark") {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

function toggleDarkMode() {
  const current = localStorage.getItem("theme") === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

async function logout() {
  await signOut(auth);
}

function Header() {
  const navigate = useNavigate();

  const language = localStorage.getItem("language") || "en";
  const signupl = language === "de" ? "Registrieren" : "Sign up";
  const loginl = language === "de" ? "Anmelden" : "Login";
  const logoutl = language === "de" ? "Abmelden" : "Logout";
  const profilel = language === "de" ? "Profil" : "Profile";

  const labels = useMemo(() => {
    const education = language === "de" ? "Bildung" : "Education";
    const experience = language === "de" ? "Berufserfahrung" : "Professional Experience";
    const projects = language === "de" ? "Projekte" : "Projects";
    const skills = language === "de" ? "Fähigkeiten" : "Skills";
    const certificates = language === "de" ? "Zertifikate" : "Certificates";
    const contact = language === "de" ? "Kontakt" : "Contact";
    return [education, experience, projects, skills, certificates, contact];
  }, [language]);

  const sections = useMemo(
    () => ["education", "experience", "projects", "skills", "certificates", "contact"],
    []
  );

  // ✅ No "User" import needed. Infer from auth.currentUser.
  type AuthUser = typeof auth.currentUser; // (User | null) internally
  const [user, setUser] = useState<AuthUser>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const isLoggedIn = !!user;

  const [selectedItem, setSelectedItem] = useState(() => {
    const sectionId = window.location.pathname.slice(1);
    const index = sections.findIndex(
      (item) => item.toLowerCase().replace(" ", "") === sectionId.toLowerCase()
    );
    return index !== -1 ? sections[index] : "";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const selectedIndex = sections.indexOf(selectedItem);

  const handleNavClick = (section: string) => {
    setSelectedItem(section);
    LinkToSection(section);
    setMenuOpen(false);
  };

  async function Auth(action: "Profile" | "Login" | "Sign up" | "Logout") {
    if (!isLoggedIn) {
      if (action === "Sign up") navigate("/auth?mode=signup");
      else navigate("/auth?mode=login");
      return;
    }

    if (action === "Logout") {
      try {
        await logout();
        navigate("/#");
      } catch (err) {
        console.error(err);
      }
      return;
    }

    if (action === "Profile") {
      navigate("/profile");
      return;
    }

    navigate("/profile");
  }

  const base = import.meta.env.BASE_URL;

  return (
    <header>
      <nav>
        <img className="logo-img" src={logo} alt="logo" />
        <a href={base}>Leonard Blam</a>

        <ul className="navigation-links desktop-only">
          {sections.map((section, i) => (
            <li
              key={section}
              className={`nav-item ${selectedIndex === i ? "active" : ""}`}
              onClick={() => handleNavClick(section)}
            >
              {labels[i]}
            </li>
          ))}
        </ul>

        <ul className="preferences">
          <li>
            <button onClick={toggleDarkMode}>🌙</button>
          </li>

          <li>
            <div className="dropdown">
              <button className="dropbtn">🌐</button>
              <div className="dropdown-content">
                <button type="button" onClick={() => setLanguageMode("en")}>
                  English
                </button>
                <button type="button" onClick={() => setLanguageMode("de")}>
                  Deutsch
                </button>
              </div>
            </div>
          </li>

          <li>
            <div className="dropdown">
              <button className="dropbtn">🧾</button>
              <div className="dropdown-content">
                {isLoggedIn ? (
                  <>
                    <a type="button" onClick={() => Auth("Profile")}>
                      {profilel}
                    </a>
                    <a type="button" onClick={() => Auth("Logout")}>
                      {logoutl}
                    </a>
                  </>
                ) : (
                  <>
                    <a type="button" onClick={() => Auth("Login")}>
                      {loginl}
                    </a>
                    <a type="button" onClick={() => Auth("Sign up")}>
                      {signupl}
                    </a>
                  </>
                )}
              </div>
            </div>
          </li>
        </ul>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "active" : ""}></span>
          <span className={menuOpen ? "active" : ""}></span>
          <span className={menuOpen ? "active" : ""}></span>
        </button>
      </nav>

      {menuOpen && (
        <ul className="mobile-menu">
          {sections.map((section, i) => (
            <li
              key={section}
              className={`nav-item ${selectedIndex === i ? "active" : ""}`}
              onClick={() => handleNavClick(section)}
            >
              {labels[i]}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Header;
