import { useState, useMemo } from "react";
import skillsData from "../data/skills.json";

function Skills() {
    let language = (localStorage.getItem("language") || "en") as "en" | "de";
    let skillsTitle = language === "de" ? "Fähigkeiten" : "Skills";
    const [sortOrder, setSortOrder] = useState<'level' | 'alpha'>('level');
    const [, setSelectedIndex] = useState<number | null>(null);
    const [filterText, setFilterText] = useState('');

    const allItems = useMemo(() => {
        return skillsData.skills.map(skill => ({
            name: skill.name[language],
            level: skill.level
        }));
    }, [language]);

    const filteredItems = useMemo(() => {
        let items = [...allItems];

        // Apply sort
        if (sortOrder === 'level') {
            items.sort((a, b) => b.level - a.level);
        } else if (sortOrder === 'alpha') {
            items.sort((a, b) => a.name.localeCompare(b.name));
        }

        // Apply filter
        if (filterText.trim()) {
            const q = filterText.toLowerCase();
            items = items.filter(item => item.name.toLowerCase().includes(q));
        }

        return items;
    }, [filterText, allItems, sortOrder]);

    return (
        <section id="skills">
            <h2>{skillsTitle}</h2>
            <div className="filterJobs">
                <small className="job-count">{filteredItems.length} {language === "de" ? "Einträge" : "items"}</small>        
                <div className="sort-items">
                    <button onClick={() => setSortOrder('alpha')} className={sortOrder === 'alpha' ? 'active' : ''}>A-Z</button>
                    <button onClick={() => setSortOrder('level')} className={sortOrder === 'level' ? 'active' : ''}>LVL</button>
                </div>
                <div className="job-search">
                    <input
                        aria-label="Search skills"
                        type="search"
                        placeholder={language === "de" ? "Suche..." : "Search..."}
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                    />
                </div>
            </div>
            { filteredItems.length === 0 && <p>{language === "de" ? "Keine Fähigkeiten verfügbar." : "No skills available."}</p> }
            <ul className="list-group">
                {filteredItems.map((item, index) => {
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