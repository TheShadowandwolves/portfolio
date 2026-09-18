import SiteLayout from '../components/SiteLayout';
import { schools } from '../data/education.json';
import { usePreferences } from '../lib/preferences';
export default function Education() {
 const { language,t }=usePreferences();
 return <SiteLayout title={t('Education','Bildung')}><div className="page-heading"><p className="eyebrow">{t('ACADEMIC BACKGROUND','AKADEMISCHER HINTERGRUND')}</p><h1>{t('Education','Bildung')}<span>.</span></h1><p>{t('Studies in computer science and liberal arts, complemented by practical project work.','Studien in Informatik und Liberal Arts, ergänzt durch praktische Projektarbeit.')}</p></div><div className="timeline">{schools.map(s=><article className="timeline-entry" key={s.id}><p className="timeline-date">{s.startYear} — {s.endYear||t('Present','Heute')}</p><div className="timeline-content"><p className="eyebrow">{s.name}</p><h2>{language==='de'&&s.degreeDe?s.degreeDe:s.degree||t(s.fieldOfStudy,'Jüdische Studien')}</h2><p>{s.description[language]}</p></div></article>)}</div></SiteLayout>;
}
