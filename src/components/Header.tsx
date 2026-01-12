import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/public/logo.jpg";

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

function Header() {
  const navigate = useNavigate();

  // ----- language labels -----
  const language = localStorage.getItem("language") || "en";
    const signupl = language === "de" ? "Register" : "Sign up";
    const loginl = language === "de" ? "Anmelden" : "Login";
    const logoutl = language === "de" ? "Abmelden" : "Logout";
    const profilel = language === "de" ? "Profil" : "Profile";
    const labels = useMemo(() => {
    const education = language === "de" ? "Bildung" : "Education";
    const experience = language === "de" ? "Berufserfahrung" : "Professional Experience";
    const projects = language === "de" ? "Projekte" : "Projects";
    const skills = language === "de" ? "Fähigkeiten" : "Skills";
    const certificates = language === "de" ? "Zertifikate" : "Certificates";
    const languages = language === "de" ? "Sprachen" : "Languages";
    const contact = language === "de" ? "Kontakt" : "Contact";

    return [education, experience, projects, skills, certificates, languages, contact];
  }, [language]);

  const sections = useMemo(
    () => ["education", "experience", "projects", "skills", "certificates", "languages", "contact"],
    []
  );

  // ----- auth state -----
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("log") === "true");

  // Optional: keep state in sync if another tab changes localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "log") setIsLoggedIn(e.newValue === "true");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ----- selected nav -----
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

  // ----- Auth function you asked for -----
  function Auth(action: "Profile" | "Login" | "Sign up" | "Logout") {
    // If not logged in → send to auth page for Login/Signup (and also for Profile)
    if (!isLoggedIn) {
      if (action === "Sign up") navigate("/auth?mode=signup");
      else navigate("/auth?mode=login"); // Profile or Login or Logout goes to login
      return;
    }

    // If logged in:
    if (action === "Logout") {
      // Clear whatever you store for auth
      localStorage.setItem("log", "false");
      // localStorage.removeItem("token"); // if you have one
      // localStorage.removeItem("user");  // if you have one
      setIsLoggedIn(false);

      // Optional: go home after logout
      navigate("/");
      return;
    }

    if (action === "Profile") {
      navigate("/profile");
      return;
    }

    // Logged in and clicking "Login"/"Sign up" (shouldn’t happen if you hide them)
    navigate("/profile");
  }

  return (
    <header>
      <nav>
        <img className="logo-img" src={logo} alt="logo" />
        <a href="/">Leonard Blam</a>

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
                <a href="#" onClick={() => setLanguageMode("en")}>
                  English
                </a>
                <a href="#" onClick={() => setLanguageMode("de")}>
                  Deutsch
                </a>
              </div>
            </div>
          </li>

          <li>
            <div className="dropdown">
              <button className="dropbtn">🧾</button>

              {/* ✅ Dropdown switches based on isLoggedIn */}
              <div className="dropdown-content">
                {isLoggedIn ? (
                  <>
                    <a  onClick={() => Auth("Profile")}>{profilel}</a>
                    <a  onClick={() => Auth("Logout")}>{logoutl}</a>
                  </>
                ) : (
                  <>
                    <a  onClick={() => Auth("Login")}>{loginl}</a>
                    <a  onClick={() => Auth("Sign up")}>{signupl}</a>
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
