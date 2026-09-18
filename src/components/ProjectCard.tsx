import { Link } from 'react-router-dom';
import { usePreferences } from '../lib/preferences';
import type { Project } from '../lib/projects';
export function ProjectVisual({ project }: { project: Project }) {
  const { t } = usePreferences();
  return <div className={`project-visual visual-${project.id}`} aria-label={t('Technology overview', 'Technologieübersicht')}>
    <span className="visual-caption">{t('TECHNOLOGY OVERVIEW','TECHNOLOGIEÜBERSICHT')}</span>
    <div className="architecture-stack">{(project.architecture || project.Skills.slice(0,3)).map((step,i) => <div key={step}><span className="architecture-index">0{i+1}</span><span>{step}</span>{i<2 && <span className="architecture-arrow" aria-hidden="true">↘</span>}</div>)}</div>
  </div>;
}
export default function ProjectCard({ project, featured=false }: { project: Project; featured?: boolean }) {
  const { language,t } = usePreferences();
  return <article className={`project-card ${featured ? 'featured-card' : ''}`}>
    {featured && <ProjectVisual project={project}/>}
    <div className="project-card-content"><div className="card-meta"><span>{project.status[language]}</span><span>{project.startYear}{project.endYear && project.endYear!==project.startYear ? `–${project.endYear}` : ''}</span></div>
    <h3><Link to={`/projects/${project.id}`}>{project.name}</Link></h3><p>{project.desc[language]}</p>
    <ul className="tags" aria-label={t('Technologies','Technologien')}>{project.Skills.slice(0,featured ? 4 : 6).map(s => <li key={s}>{s}</li>)}{project.Skills.length > (featured ? 4 : 6) && <li>+{project.Skills.length-(featured ? 4 : 6)}</li>}</ul>
    <Link className="text-link" to={`/projects/${project.id}`}>{t('Explore project','Projekt ansehen')} <span aria-hidden="true">↗</span></Link></div>
  </article>;
}
