import { useState } from 'react';
import { languages } from '../data/languages.json';


function LanguageGroup() {
    let language = (localStorage.getItem("language") || "en") as "en" | "de";
    let langTitle = language === "de" ? "Sprachen" : "Languages";
    const items = languages.map(lang => ({
        name: lang.name[language],
        level: lang.level
    }));
    const [, setSelectedIndex] = useState<number | null>(null);
    return (
        <section id="languages">
            <h2>{langTitle}</h2>
            { items.length === 0 && <p>{language === "de" ? "Keine Fähigkeiten verfügbar." : "No skills available."}</p> }
            <ul className="list-group">
                {items.map((item, index) => {
                    return (
                        <li key={index} className="list-group-item" title={`${item.name}`} aria-label={`${item.name}, level ${item.level}`} onClick={() => setSelectedIndex(index)}>
                            {item.name}
                            <span className="language-level">{item.level}</span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
export default LanguageGroup;