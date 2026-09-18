import { useState } from 'react';
import SiteLayout from '../components/SiteLayout';
import ProjectCard from '../components/ProjectCard';
import { projects, featuredProjects } from '../lib/projects';
import { usePreferences } from '../lib/preferences';
export default function Projects() {
 const { t } = usePreferences(); const [query,setQuery]=useState(''); const [category,setCategory]=useState('all');
 const filtered=projects.filter(p=>(category==='all'||p.category===category)&&`${p.name} ${p.originalName||''} ${p.Skills.join(' ')} ${p.desc.en} ${p.desc.de}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <SiteLayout title={t('Projects','Projekte')}><div className="page-heading"><p className="eyebrow">{t('BUILDING & EXPLORING','ENTWICKELN & ENTDECKEN')}</p><h1>{t('Projects','Projekte')}<span>.</span></h1><p>{t('Selected applications, technical experiments and academic work. Explore the complete collection below.','Ausgewählte Anwendungen, technische Experimente und Studienprojekte. Darunter finden Sie die vollständige Sammlung.')}</p></div>
 <section className="section-block"><h2>{t('Selected work','Ausgewählte Projekte')}</h2><div className="featured-grid">{featuredProjects.map(p=><ProjectCard key={p.id} project={p} featured/>)}</div></section>
 <section className="section-block"><div className="section-heading"><h2>{t('All projects','Alle Projekte')}</h2><span className="muted" role="status">{filtered.length} {t('projects','Projekte')}</span></div><div className="filter-bar"><label>{t('Search projects','Projekte suchen')}<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Project or technology…','Projekt oder Technologie…')}/></label><label>{t('Category','Kategorie')}<select value={category} onChange={e=>setCategory(e.target.value)}><option value="all">{t('All areas','Alle Bereiche')}</option><option value="web">Web & Apps</option><option value="hardware">Hardware & Systems</option><option value="software">{t('Software & foundations','Software & Grundlagen')}</option></select></label></div><div className="project-grid">{filtered.map(p=><ProjectCard key={p.id} project={p}/>)}</div>{!filtered.length&&<p className="empty-state">{t('No matching projects. Try a different search.','Keine passenden Projekte. Versuchen Sie einen anderen Suchbegriff.')}</p>}</section></SiteLayout>;
}
