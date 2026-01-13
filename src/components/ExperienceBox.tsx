interface ExperienceBoxProps {
    id?: number;
    company: string;
    title: string;
    startYear: number;
    endYear?: number;
    details?: { en: string; de: string };
    skills?: string[];
    place: string;
    imageUrl?: string;
}
function ExperienceBox({ company, title, startYear, endYear, details, skills, place, imageUrl }: ExperienceBoxProps) {
    const language = (localStorage.getItem("language") || "en") as "en" | "de";
    let detail = details?.[language];
    // split \n into paragraphs
    let detailParagraphs = detail ? detail.split('\n').map((para, index) => <p key={index}>{para}</p>) : null;
    
    const base = import.meta.env.BASE_URL;
    const imgUrl = imageUrl ? `${base}${imageUrl}` : `${base}default-company.png`;
    return (
        <div className="education-box">
            <img src={imgUrl} alt={`${company} logo`} className="company-logo"/>
            <h3>{company}</h3>
            <h4>{title}</h4>
            <p>{startYear} - {endYear ? endYear : "Present"} , {place}</p>
            <div>{detailParagraphs}</div>
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