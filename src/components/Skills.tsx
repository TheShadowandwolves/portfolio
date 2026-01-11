import { useState } from "react";
import skillsData from "../data/skills.json";

function Skills() {
    let language = (localStorage.getItem("language") || "en") as "en" | "de";
    let skillsTitle = language === "de" ? "Fähigkeiten" : "Skills";
    const items = skillsData.skills.map(skill => ({
        name: skill.name[language],
        level: skill.level
    }));
    const [,setSelectedIndex] = useState<number | null>(null);
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