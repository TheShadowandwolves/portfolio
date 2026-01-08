
function Skills({language}: {language: string}) {
    let skillsTitle = language === "de" ? "Fähigkeiten" : "Skills";
    const items = [
        language === "de" ? "Programmieren" : "Programming",
        language === "de" ? "Webentwicklung" : "Web Development",
        language === "de" ? "Datenanalyse" : "Data Analysis",
        language === "de" ? "Maschinelles Lernen" : "Machine Learning",
        language === "de" ? "Projektmanagement" : "Project Management",
    ];
    return (
        <section id="skills">
            <h2>{skillsTitle}</h2>
            { items.length === 0 && <p>{language === "de" ? "Keine Fähigkeiten verfügbar." : "No skills available."}</p> }
            <ul className="list-group">
                {items.map((item, index) => (
                    <li key={index} className="list-group-item">{item}</li>
                ))}
            </ul>
        </section>
    );
}
export default Skills;