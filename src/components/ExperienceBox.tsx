interface ExperienceBoxProps {
    id?: number;
    company: string;
    title: string;
    startYear: number;
    endYear?: number;
    details?: { en: string; de: string };
    skills?: string[];
}
function ExperienceBox({ company, title, startYear, endYear, details, skills }: ExperienceBoxProps) {
    const language = (localStorage.getItem("language") || "en") as "en" | "de";
    let detail = details?.[language];
    return (
        <div className="education-box">
            <h3>{company}</h3>
            <h4>{title}</h4>
            <p>{startYear} - {endYear ? endYear : "Present"}</p>
            <p>{detail}</p>
            <h5>{skills && skills.length > 0 ? (language === "en" ? "Skills obtained:" : "Erhaltene Fähigkeiten:") : ""}</h5>
            <ul>
                {skills?.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}
export { ExperienceBox };