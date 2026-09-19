(function(root){
'use strict';
const DAY=86400000;
const clean=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toUpperCase().replace(/\s+/g,' ');
function date(s){
 if(s instanceof Date&&!isNaN(s)) return new Date(Date.UTC(s.getFullYear(),s.getMonth(),s.getDate()));
 let a=String(s??'').trim(),m,y,mo,d;
 if(m=a.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)) [,y,mo,d]=m;
 else if(m=a.match(/^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$/)) [,d,mo,y]=m;
 else throw Error('Data inválida. Use DD/MM/AAAA ou AAAA-MM-DD.');
 y=+y;mo=+mo;d=+d;const v=new Date(Date.UTC(y,mo-1,d));
 if(y<1900||y>2200||v.getUTCMonth()!==mo-1||v.getUTCDate()!==d) throw Error('Data inexistente ou fora de 1900–2200.');
 return v;
}
function unit(u){const n=clean(u);if(['D','DIA','DIAS','DAY','DAYS'].includes(n))return 'DIA';if(['S','SEM','SEMANA','SEMANAS','W','WEEK','WEEKS'].includes(n))return 'SEMANA';if(['M','MES','MESES','MONTH','MONTHS'].includes(n))return 'MES';if(['A','ANO','ANOS','Y','YEAR','YEARS'].includes(n))return 'ANO';throw Error('Unidade não reconhecida: '+u+'. Horas/contadores exigem outra lógica.');}
function interval(v,u,fortnight='15'){
 const words={DIARIO:[1,'DIA'],DIARIA:[1,'DIA'],SEMANAL:[1,'SEMANA'],QUINZENAL:[Number(fortnight),'DIA'],MENSAL:[1,'MES'],BIMESTRAL:[2,'MES'],TRIMESTRAL:[3,'MES'],QUADRIMESTRAL:[4,'MES'],SEMESTRAL:[6,'MES'],ANUAL:[1,'ANO']};
 let val,un,n=clean(v),m;
 if(String(u??'').trim()){val=Number(String(v).replace(',','.'));un=unit(u);}
 else if(words[n]) [val,un]=words[n];
 else if(m=n.match(/^(\d+)\s*([A-Z]+)$/)){val=Number(m[1]);un=unit(m[2]);}
 else throw Error('Periodicidade não reconhecida: '+v+'. Informe ciclo + unidade ou cadastre a estratégia.');
 if(!Number.isSafeInteger(val)||val<=0||val>10000) throw Error('O ciclo deve ser um inteiro positivo até 10.000.');
 return {value:val,unit:un};
}
function add(anchor,rule,n){
 if(rule.unit==='DIA'||rule.unit==='SEMANA')return new Date(+anchor+n*rule.value*(rule.unit==='SEMANA'?7:1)*DAY);
 const months=n*rule.value*(rule.unit==='ANO'?12:1),idx=anchor.getUTCFullYear()*12+anchor.getUTCMonth()+months;
 const y=Math.floor(idx/12),mo=idx%12,last=new Date(Date.UTC(y,mo+1,0)).getUTCDate();
 return new Date(Date.UTC(y,mo,Math.min(anchor.getUTCDate(),last)));
}
function start(year){const d=new Date(Date.UTC(year,0,4));return new Date(+d-((d.getUTCDay()+6)%7)*DAY);}
function period(year){const from=start(year),to=start(year+1);return {from,to,weeks:Math.round((to-from)/(7*DAY))};}
function occurrences(anchor,rule,year,last=false){
 const {from,to}=period(year);let n=last?1:0;
 if(anchor<from){
  const gap=rule.unit==='DIA'||rule.unit==='SEMANA'?(from-anchor)/(DAY*rule.value*(rule.unit==='SEMANA'?7:1)):((from.getUTCFullYear()-anchor.getUTCFullYear())*12+from.getUTCMonth()-anchor.getUTCMonth())/(rule.value*(rule.unit==='ANO'?12:1));
  n=Math.max(n,Math.floor(gap)-1);
 }
 const out=[];for(let i=0;i<400;i++,n++){let d=add(anchor,rule,n);if(d>=to)break;if(d>=from)out.push({date:d,week:Math.floor((d-from)/(7*DAY))+1});}return out;
}
function strategies(s){const map=new Map();String(s).split(/\r?\n/).forEach((line,i)=>{if(!line.trim())return;const p=line.split(';').map(x=>x.trim());if(p.length!==4||!p[0]||!p[1])throw Error('Estratégias, linha '+(i+1)+': use código;pacote;ciclo;unidade.');const k=clean(p[0]);if(!map.has(k))map.set(k,[]);if(map.get(k).some(x=>x.label===p[1]))throw Error('Pacote repetido na estratégia '+p[0]);map.get(k).push({...interval(p[2],p[3]),label:p[1]});});return map;}
const api={clean,date,interval,add,period,occurrences,strategies,DAY};root.MapEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
