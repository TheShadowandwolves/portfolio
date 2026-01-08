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
    selectedIndex = arr.indexOf(selectedItem);
    return (
        <header>
            <nav>
                <img src="logo.png" alt="Logo" />
                <a href="#home">Leonard Blam</a>
                <ul className="navigation-links desktop-only">
                    <li className={selectedIndex === 0 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[0]); LinkToSection("about"); }}>{about}</li>
                    <li className={selectedIndex === 1 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[1]); LinkToSection("education"); }}>{education}</li>
                    <li className={selectedIndex === 2 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[2]); LinkToSection("experience"); }}>{experience}</li>
                    <li className={selectedIndex === 3 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[3]); LinkToSection("projects"); }}>{projects}</li>
                    <li className={selectedIndex === 4 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[4]); LinkToSection("skills"); }}>{skills}</li>
                    <li className={selectedIndex === 5 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[5]); LinkToSection("certificates"); }}>{certificates}</li>
                    <li className={selectedIndex === 6 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[6]); LinkToSection("languages"); }}>{languages}</li>
                    <li className={selectedIndex === 7 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[7]); LinkToSection("blog"); }}>{blog}</li>
                    <li className={selectedIndex === 8 ? "nav-item active" : "nav-item"} onClick={() => { setSelectedItem(arr[8]); LinkToSection("contact"); }}>{contact}</li>
                </ul>
                <ul className="preferences">
                    <li><button>🌙</button></li>
                    <li><button>🌐</button></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;