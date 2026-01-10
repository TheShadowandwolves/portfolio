interface EducationBoxProps {
    id?: number;
    school: string;
    degree?: string;
    fieldOfStudy: string;
    startDate: number;
    endDate?: number;
    details: { en: string; de: string };
}

function EducationBox({ school, degree, fieldOfStudy, startDate, endDate, details }: EducationBoxProps) {
    const language = (localStorage.getItem("language") || "en") as "en" | "de";
    let detail = details[language];
    return (
        <div className="education-box">
            <h3>{school}</h3>
            <h4>{degree} in {fieldOfStudy}</h4>
            <p>{startDate} - {endDate ? endDate : "Present"}</p>
            <p>{detail}</p>
        </div>
    );
}
export { EducationBox };