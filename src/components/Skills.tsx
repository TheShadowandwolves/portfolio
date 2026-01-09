import { useState } from "react";

function Skills() {
    let language = localStorage.getItem("language") || "en";
    let skillsTitle = language === "de" ? "Fähigkeiten" : "Skills";
    const items = [
        {name: language === "de" ? "Programmieren" : "Programming", level: 4},
        {name: language === "de" ? "Webentwicklung" : "Web Development", level: 5},
        {name: language === "de" ? "Datenanalyse" : "Data Analysis", level: 2},
        {name: language === "de" ? "Maschinelles Lernen" : "Machine Learning", level: 0},
        {name: language === "de" ? "Projektmanagement" : "Project Management", level: 1},
        {name: language === "de" ? "Teamarbeit" : "Teamwork", level: 3},
    ];
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    return (
        <section id="skills">
            <h2>{skillsTitle}</h2>
            { items.length === 0 && <p>{language === "de" ? "Keine Fähigkeiten verfügbar." : "No skills available."}</p> }
            <ul className="list-group">
                {items.map((item, index) => {
                    const level = Math.max(0, Math.min(5, item.level));
                    return (
                        <li key={index} className={`list-group-item level-${level}`} title={`${item.name} — Level ${level}`} aria-label={`${item.name}, level ${level}`} onClick={() => setSelectedIndex(index)}>{item.name}</li>
                    );
                })}
            </ul>
        </section>
    );
}
export default Skills;