import data from '../data/projects.json';
export interface Project {
 id: number; name: string; originalName?: string; startYear: number; endYear: number | null;
 desc: { en: string; de: string }; Skills: string[]; link: string; category: string; featured: boolean;
 status: { en: string; de: string }; features?: { en: string[]; de: string[] }; architecture?: string[]; note?: { en: string; de: string };
}
export const projects: Project[] = data.projects;
export const featuredProjects = [15,5,2].map(id => projects.find(p => p.id === id)!);
