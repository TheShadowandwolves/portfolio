// Header

import { useState } from "react";

let selectedIndex = -1;
let enabled = localStorage.getItem("theme") === "dark" ? true : false;

function LinkToSection(sectionId: string) {
    // open to specific page
    window.location.href = `/${sectionId}`;

}

function setLanguageMode(lang: string) {
    console.log("Setting language to", lang);
    localStorage.setItem("language", lang);
    window.location.reload();
}

function setDarkMode() {
    console.log("Toggling dark mode");
    if (!enabled){
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        enabled = true;
    } else {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        enabled = false;
    }
}

function Header() {
    let language = localStorage.getItem("language") || "en";
    let about = language === "de" ? "Über" : "About";
    let education = language === "de" ? "Bildung" : "Education";
    let experience = language === "de" ? "Berufserfahrung" : "Professional Experience";
    let projects = language === "de" ? "Projekte" : "Projects";
    let skills = language === "de" ? "Fähigkeiten" : "Skills";
    let certificates = language === "de" ? "Zertifikate" : "Certificates";
    let languages = language === "de" ? "Sprachen" : "Languages";
    let blog = "Blog";
    let contact = language === "de" ? "Kontakt" : "Contact";



    const arr = ['about', 'education', 'experience', 'projects', 'skills', 'certificates', 'languages', 'blog', 'contact'];
    const [selectedItem, setSelectedItem] = useState(() => {
        // search what index is sectionId in arr and return that item, if not found return none
        const sectionId = window.location.pathname.slice(1); // remove leading slash
        const index = arr.findIndex(item => item.toLowerCase().replace(" ", "") === sectionId.toLowerCase());
        return index !== -1 ? arr[index] : '-1';
    });
    const [menuOpen, setMenuOpen] = useState(false);
    selectedIndex = arr.indexOf(selectedItem);

    const handleNavClick = (section: string, index: number) => {
        setSelectedItem(section);
        LinkToSection(section);
        setMenuOpen(false);
    };
    return (
        <header>
            <nav>
                <img src="logo.png" alt="Logo" />
                <a href="#home">Leonard Blam</a>
                <ul className="navigation-links desktop-only">
                    {(() => {
                        const labels = [about, education, experience, projects, skills, certificates, languages, blog, contact];
                        return arr.map((section, i) => {
                            return (
                                <li key={section} className={`nav-item ${selectedIndex === i ? 'active' : ''}`} onClick={() => { handleNavClick(arr[i], i); }}>{labels[i]}</li>
                            );
                        });
                    })()}
                </ul>
                <ul className="preferences">
                    <li><button onClick={() => setDarkMode()}>🌙</button></li>
                    <li>
                        <div className="dropdown">
                            <button className="dropbtn">🌐</button>
                            <div className="dropdown-content">
                                <a href="#" onClick={() => setLanguageMode("en")}>English</a>
                                <a href="#" onClick={() => setLanguageMode("de")}>Deutsch</a>
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
                    {(() => {
                        const labels = [about, education, experience, projects, skills, certificates, languages, blog, contact];
                        return arr.map((section, i) => {
                            return (
                                <li key={section} className={`nav-item ${selectedIndex === i ? 'active' : ''}`} onClick={() => { handleNavClick(arr[i], i); }}>{labels[i]}</li>
                            );
                        });
                    })()}
                </ul>
            )}
        </header>
    );
}
export default Header;