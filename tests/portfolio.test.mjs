import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { analyzeText } from '../src/lib/textAnalysis.ts';
const read = name => JSON.parse(fs.readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), 'utf8'));
test('all original projects, education entries, and skills remain', () => {
 const p=read('projects').projects, s=read('skills').skills, e=read('education').schools;
 for(let id=1;id<=14;id++) assert.ok(p.some(item=>item.id===id),`Missing project ${id}`);
 for(let id=1;id<=46;id++) assert.ok(s.some(item=>item.id===id),`Missing skill ${id}`);
 for(let id=0;id<=2;id++) assert.ok(e.some(item=>item.id===id),`Missing school ${id}`);
 assert.equal(new Set(p.map(x=>x.id)).size,p.length);
 assert.equal(new Set(s.map(x=>x.id)).size,s.length);
});
test('confirmed new job and live FridgeTracker link are present', () => {
 const job=read('experience').experiences.find(x=>x.id===5);
 assert.equal(job.company,'Miral Immobilien AG');assert.equal(job.startYear,2026);assert.equal(job.startMonth,5);
 assert.equal(read('projects').projects.find(x=>x.name==='FridgeTracker').link,'https://fridgetracker-58869.web.app/home.html');
});
test('every skill has a displayed category and bilingual names', () => {
 const categories=['web','languages','systems','testing','hardware','fundamentals','creative','collaboration'];
 for(const skill of read('skills').skills){assert.ok(categories.includes(skill.category));assert.ok(skill.name.en);assert.ok(skill.name.de);}
});
test('word counts normalize case and separate punctuation', () => {
 const a=analyzeText('Hello,world! HELLO.');
 assert.equal(a.totalWords,3);assert.equal(a.uniqueWords,2);assert.deepEqual(a.words,[['hello',2],['world',1]]);
 assert.equal(new Map(a.letters).get('l'),5);
});
test('prefix counts reflect shared prefixes and repeated words', () => {
 const a=analyzeText('car cart cat car');
 assert.equal(a.tree.children.c.count,4);
 assert.equal(a.tree.children.c.children.a.children.r.count,3);
 assert.equal(a.tree.children.c.children.a.children.r.children.t.count,1);
});
test('Unicode words are preserved and empty input is safe', () => {
 const a=analyzeText('Grüsse Привет שלום');assert.equal(a.uniqueWords,3);
 assert.equal(analyzeText('123 -- !!!').totalWords,0);
});
