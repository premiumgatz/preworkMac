import fs from 'fs';
const names=['waves','book-open','music','utensils','mountain','palette','calendar','map-pin','users','check','bell','plus','sparkles','clock','ticket','camera','mail','cloud-sun','image','message-circle','settings','phone','compass','notebook-pen','wallet','heart','bookmark','languages','bike','search','minus','circle-check'];
const out={};
for(const n of names){const f=`node_modules/lucide-static/icons/${n}.svg`; if(!fs.existsSync(f)){console.log('missing',n);continue;}
 const s=fs.readFileSync(f,'utf8'); out[n]=s.slice(s.indexOf('>',s.indexOf('<svg'))+1, s.lastIndexOf('</svg>')).trim();}
fs.writeFileSync('icons.js','window.ICONS='+JSON.stringify(out)+';');
console.log(Object.keys(out).length);
