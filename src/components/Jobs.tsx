import { useState, Fragment, useMemo } from 'react';
import JobType from '../data/jobs.json'

type JobKeys = 'JobTitles' | 'Locations' | 'Field' | 'JobArt';

function Jobs() {
    const [active, setActive] = useState<JobKeys>('JobTitles');
    const [filterText, setFilterText] = useState('');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const language = (localStorage.getItem("language") || "en") as "en" | "de";

    const data = (JobType as any).JobType as Record<JobKeys, string[]>;

    const labels = useMemo(() => ({
        JobTitles: language === "de" ? "Jobtiteln" : "Job Titles",
        Locations: language === "de" ? "Regionen" : "Places",
        Field: language === "de" ? "Berusfeld" : "Job Field",
        JobArt: language === "de" ? "Anstellungsart" : "Job Art"
    }), [language]);

    const items = useMemo(() => {
        const list = data[active] ?? [];
        if (!filterText.trim()) return list;
        const q = filterText.toLowerCase();
        return list.filter(s => s.toLowerCase().includes(q));
    }, [active, filterText, data]);

    const handleNavClick = (key: JobKeys) => {
        setActive(key);
        setFilterText('');
        setSelectedItem(null);
    };

    return (
        <Fragment>
            <div className='about-title-div'>
                <h2 className='page-title about-title'>{language === "de" ? "Arbeitstellen die ich suche:" : "Job Applications I search for:"}</h2>
            </div>
            <div className="job-container">
                <div className="filterJobs">


                    <div id='job-nav' aria-label="job-filters">
                        <ul>
                            {(Object.keys(labels) as JobKeys[]).map(k => (
                                <li
                                    key={k}
                                    onClick={() => handleNavClick(k)}
                                    className={k === active ? 'active' : ''}
                                >
                                    {labels[k]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <small className="job-count">{items.length} {language === "de" ? "Einträge" : "items"}</small>        
                    <div className="job-search">
                        <input
                            aria-label="Search jobs"
                            type="search"
                            placeholder={language === "de" ? "Suche..." : "Search..."}
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                </div>

                <div className="job-list-group-container">
                    <ul className="job-list-group">
                        {items.length === 0 ? (
                            <li className="list-group-item">{
                                language === "de" ? "Keine Einträge" : "No items found"
                            }</li>
                        ) : items.map(item => (
                            <li
                                key={item}
                                className={`list-group-item ${selectedItem === item ? 'selected' : ''}`}
                                onClick={() => setSelectedItem(item)}
                                title={item}
                            >
                                <div className="item-row">
                                    <span className="item-title">{item}</span>
                                    <button
                                        className="copy-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard?.writeText(item);
                                        }}
                                        aria-label={language === "de" ? "Kopieren" : "Copy"}
                                    >⧉</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}
export default Jobs;