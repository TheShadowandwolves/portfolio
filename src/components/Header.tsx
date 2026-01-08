// Header

import { useState } from "react";

let selectedIndex = -1;

function LinkToSection(sectionId: string) {
    // open to specific page
    window.location.href = `/${sectionId}`;

}

function Header({language}: {language: string}) {
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
                    <li className={selectedIndex === 0 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[0], 0); }}>{about}</li>
                    <li className={selectedIndex === 1 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[1], 1); }}>{education}</li>
                    <li className={selectedIndex === 2 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[2], 2); }}>{experience}</li>
                    <li className={selectedIndex === 3 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[3], 3); }}>{projects}</li>
                    <li className={selectedIndex === 4 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[4], 4); }}>{skills}</li>
                    <li className={selectedIndex === 5 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[5], 5); }}>{certificates}</li>
                    <li className={selectedIndex === 6 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[6], 6); }}>{languages}</li>
                    <li className={selectedIndex === 7 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[7], 7); }}>{blog}</li>
                    <li className={selectedIndex === 8 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[8], 8); }}>{contact}</li>
                </ul>
                <ul className="preferences">
                    <li><button>🌙</button></li>
                    <li><button>🌐</button></li>
                </ul>
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className={menuOpen ? "active" : ""}></span>
                    <span className={menuOpen ? "active" : ""}></span>
                    <span className={menuOpen ? "active" : ""}></span>
                </button>
            </nav>
            {menuOpen && (
                <ul className="mobile-menu">
                    <li className={selectedIndex === 0 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[0], 0); }}>{about}</li>
                    <li className={selectedIndex === 1 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[1], 1); }}>{education}</li>
                    <li className={selectedIndex === 2 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[2], 2); }}>{experience}</li>
                    <li className={selectedIndex === 3 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[3], 3); }}>{projects}</li>
                    <li className={selectedIndex === 4 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[4], 4); }}>{skills}</li>
                    <li className={selectedIndex === 5 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[5], 5); }}>{certificates}</li>
                    <li className={selectedIndex === 6 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[6], 6); }}>{languages}</li>
                    <li className={selectedIndex === 7 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[7], 7); }}>{blog}</li>
                    <li className={selectedIndex === 8 ? "nav-item active" : "nav-item"} onClick={() => { handleNavClick(arr[8], 8); }}>{contact}</li>
                </ul>
            )}
        </header>
    );
}
export default Header;