// Header

function LinkToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
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
    return (
        <header>
            <nav>
                <img src="logo.png" alt="Logo" />
                <a href="#home">Leonard Blam</a>
                <ul className="navigation-links desktop-only list-group">
                    <li className="list-group-item" onClick={() => LinkToSection("about")}>{about}</li>
                    <li className="list-group-item" onClick={() => LinkToSection("education")}>{education}</li>
                    <li className="list-group-item" onClick={() => LinkToSection("experience")}>{experience}</li>
                    <li className="list-group-item" onClick={() => LinkToSection("projects")}>{projects}</li>
                    <li className="list-group-item" onClick={() => LinkToSection("skills")}>{skills}</li>
                    <li className="list-group-item" onClick={() => LinkToSection("certificates")}>{certificates}</li>
                    <li className="list-group-item" onClick={() => LinkToSection("languages")}>{languages}</li>
                    <li className="list-group-item" onClick={() => LinkToSection("blog")}>{blog}</li>
                    <li className="list-group-item" onClick={() => LinkToSection("contact")}>{contact}</li>
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