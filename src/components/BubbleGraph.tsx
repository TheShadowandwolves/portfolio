import type { BubbleNode } from '../lib/textAnalysis';
import { usePreferences } from '../lib/preferences';
export default function BubbleGraph({tree}:{tree:BubbleNode|null}){
 const {t}=usePreferences();
 const nodes:{id:string;letter:string;count:number;x:number;y:number}[]=[];
 const edges:{x1:number;y1:number;x2:number;y2:number}[]=[];
 let nextLeaf=0;let depthMax=0;
 function walk(node:BubbleNode,path:string,depth:number):{x:number;y:number}{
  depthMax=Math.max(depthMax,depth);const children=Object.values(node.children);const points=children.map(child=>walk(child,path+child.letter,depth+1));
  const x=points.length?points.reduce((sum,p)=>sum+p.x,0)/points.length:50+nextLeaf++*90;const y=50+depth*95;
  nodes.push({id:path,letter:node.letter,count:node.count,x,y});points.forEach(p=>edges.push({x1:x,y1:y,x2:p.x,y2:p.y}));return {x,y};
 }
 if(tree)Object.values(tree.children).forEach(child=>walk(child,child.letter,0));
 return <div className="bubble-graph-outer" tabIndex={0} role="region" aria-label={t('Scrollable word-prefix diagram','Scrollbares Diagramm der Wortanfänge')}><div className="bubble-graph-wrapper"><svg role="img" aria-label={t('Word prefixes with occurrence counts','Wortanfänge mit Häufigkeiten')} width={Math.max(300,nextLeaf*90+20)} height={(depthMax+1)*95+25}><title>{t('Word-prefix tree','Baum der Wortanfänge')}</title>{edges.map((e,i)=><line key={i} {...e} stroke="var(--line)" strokeWidth="2"/>)}{nodes.map(n=><g key={n.id}><circle cx={n.x} cy={n.y} r="21" fill="var(--accent)"/><text x={n.x} y={n.y+5} textAnchor="middle" fill="var(--surface)" fontSize="14" fontWeight="600">{n.letter}</text><text x={n.x} y={n.y+38} textAnchor="middle" fill="var(--muted)" fontSize="11">{n.count}</text></g>)}</svg></div></div>;
}
