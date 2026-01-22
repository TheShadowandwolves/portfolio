
interface ProjectPrompts {
    id?: number;
    name: string;
    startYear: number;
    endYear?: number | undefined;
    description?: { en: string; de: string };
    skills?: string[];
    link?: string;
}
function ProjectShow({ name, startYear, endYear, description, skills, link }: ProjectPrompts) {
    const language = (localStorage.getItem("language") || "en") as "en" | "de";
    let detail = description?.[language];
    // split \n into paragraphs
    let detailParagraphs = detail ? detail.split('\n').map((para, index) => <p key={index}>{para}</p>) : null;
    
    // const base = import.meta.env.BASE_URL;
    // const imgUrl = imageUrl ? `${base}${imageUrl}` : `${base}default-company.png`;
    return (
        <div className="education-box">
            {/* <img src={imgUrl} alt={`${company} logo`} className="company-logo"/> */}
            <h3>{name}</h3>
            
            <p>{startYear} - {endYear ? endYear : "Present"}</p>
            <div>{detailParagraphs}</div>
            <h5>{skills && skills.length > 0 ? (language === "en" ? "Skills obtained:" : "Erhaltene Fähigkeiten:") : ""}</h5>
            <ul>
                {skills?.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
                  {/* ✅ Only render link if it exists */}
            {link && (
                <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                >
                {language === "en" ? "View project" : "Projekt ansehen"}
                </a>
            )}
        </div>
    );
}
export default ProjectShow ;