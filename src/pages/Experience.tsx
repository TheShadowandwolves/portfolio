import SiteLayout from '../components/SiteLayout';
import { experiences } from '../data/experience.json';
import { usePreferences } from '../lib/preferences';
export default function Experience() {
 const { language,t }=usePreferences();
 const entries=[...experiences].sort((a,b)=>b.startYear-a.startYear||((b.startMonth||0)-(a.startMonth||0)));
 const date=(year:number,month?:number)=>month?new Intl.DateTimeFormat(language==='de'?'de-CH':'en-GB',{month:'short',year:'numeric'}).format(new Date(year,month-1,1)):String(year);
 return <SiteLayout title={t('Experience','Berufserfahrung')}><div className="page-heading"><p className="eyebrow">{t('EXPERIENCE & CONTRIBUTION','ERFAHRUNG & BEITRAG')}</p><h1>{t('Experience','Berufserfahrung')}<span>.</span></h1><p>{t('Development, quality assurance and the operational work that supports reliable outcomes.','Entwicklung, Qualitätssicherung und operative Arbeit für verlässliche Ergebnisse.')}</p></div><div className="timeline">{entries.map(e=><article className="timeline-entry" key={e.id}><div className="timeline-date">{date(e.startYear,e.startMonth)} — {e.endYear?date(e.endYear,e.endMonth):t('Present','Heute')}<span>{e.place.replace('Switzerland',t('Switzerland','Schweiz')).replace('Remote',t('Remote','Remote'))}</span></div><div className="timeline-content"><p className="eyebrow">{e.company}</p><h2>{language==='de' && e.positionDe ? e.positionDe : e.position}</h2><ul className="feature-list">{e.description[language].split('\n').filter(Boolean).map(line=><li key={line}>{line.replace(/^[- ]+/,'')}</li>)}</ul>{e.skills.length>0&&<ul className="tags">{e.skills.map(s=><li key={s}>{s}</li>)}</ul>}</div></article>)}</div></SiteLayout>;
}
