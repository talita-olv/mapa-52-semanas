(function(root){
'use strict';
const clean=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toUpperCase().replace(/\s+/g,' ');
const str=v=>String(v??'').trim();
function split(v){return [...new Set(str(v).split(/[|/]/).map(str).filter(Boolean))];}
function parse(workbook,X){
 const find=name=>workbook.SheetNames.find(s=>clean(s)===name);
 const mapName=find('MAPA_52_SEMANAS');if(!mapName)throw Error('Não encontrei a aba MAPA_52_SEMANAS. Use o modelo por estratégia ou a ferramenta de ciclos e datas do hub.');
 const matrix=X.utils.sheet_to_json(workbook.Sheets[mapName],{header:1,raw:false,defval:'',blankrows:true}),h=(matrix.shift()||[]).map(str),norm=h.map(clean);
 const idx=(...names)=>{for(const n of names){const i=norm.indexOf(clean(n));if(i!==-1)return i;}return -1;};
 const cols={asset:idx('Equipamento','TAG','Ativo'),description:idx('Denominação do objeto técnico','Descrição','Descrição Equipamento'),plant:idx('Planta','Local'),area:idx('Sistema Agregador','Área','Superintendência'),plan:idx('Plano de manutenção','Plano'),item:idx('Item manutenção','Item de manutenção'),strategy:idx('Estratégia IP18','Estratégia'),strategy14:idx('Estratégia IP14'),status:idx('Status cruzamento'),cycles:idx('Ciclos da estratégia','Ciclos'),outside:idx('Fora do mapa','Fora do mapa 52 semanas'),center:idx('Centro planejamento'),type:idx('Tipo de ordem')};
 if(cols.asset<0||cols.strategy<0)throw Error('MAPA_52_SEMANAS precisa das colunas Equipamento e Estratégia IP18 (ou Estratégia).');
 const weekCols=[];for(let n=1;n<=53;n++){const i=norm.findIndex(x=>x==='S'+String(n).padStart(2,'0'));if(i>=0)weekCols.push({n,i});}
 if(weekCols.length<52||weekCols.some((w,i)=>w.n!==i+1))throw Error('As colunas semanais precisam formar S01 até S52, com S53 opcional.');
 if(matrix.length>100000)throw Error('Limite desta visualização: 100.000 linhas. Divida a base por área.');
 const rows=[],issues=[];matrix.forEach((v,i)=>{if(!v.some(x=>str(x)))return;const get=k=>cols[k]<0?'':str(v[cols[k]]);const row={id:i,line:i+2};Object.keys(cols).forEach(k=>row[k]=get(k));row.strategy18=row.strategy;row.strategy=row.strategy||row.strategy14;row.weeks=weekCols.map(w=>str(v[w.i]));
 if(!row.asset)issues.push({line:row.line,reason:'Equipamento sem identificador. Registro preservado.'});if(!row.strategy)issues.push({line:row.line,reason:'Estratégia não informada. Registro preservado.'});rows.push(row);});
 if(!rows.length)throw Error('A aba MAPA_52_SEMANAS não contém registros.');
 const catalog=new Map(),summaryName=find('RESUMO_ESTRATEGIAS');if(summaryName){const summary=X.utils.sheet_to_json(workbook.Sheets[summaryName],{header:1,raw:false,defval:''}),sh=(summary.shift()||[]).map(clean);const a=sh.indexOf('ESTRATEGIA'),b=sh.indexOf('DESCRICAO ESTRATEGIA'),c=sh.indexOf('CICLOS'),o=sh.indexOf('FORA DO MAPA 52 SEMANAS');if(a>=0)for(const r of summary){const code=str(r[a]);if(code)catalog.set(code,{description:b>=0?str(r[b]):'',cycles:c>=0?str(r[c]):'',outside:o>=0?str(r[o]):''});}}
 for(const r of rows){const c=catalog.get(r.strategy);if(!r.cycles&&c)r.cycles=c.cycles;}
 const notesName=find('LEIA_ME'),notes=notesName?X.utils.sheet_to_json(workbook.Sheets[notesName],{header:1,raw:false,defval:''}).slice(1).filter(r=>r[0]&&r[1]).map(r=>({label:str(r[0]),text:str(r[1])})):[];
 const calendarNote=notes.find(n=>clean(n.label).includes('CALENDARIO'))?.text||'';
 const theoretical=/TEORIC|SEM DATA.BASE/.test(clean(calendarNote));
 return {rows,catalog:[...catalog],notes,calendarNote,theoretical,weeks:weekCols.length,issues,sheets:workbook.SheetNames,sourceSheet:mapName};
}
function summarize(rows,weeks){
 const groups=new Map(),assets=new Set(),plans=new Set(),weekly=Array(weeks).fill(0);let pending=0,outside=0,missingStatus=0;
 for(const r of rows){if(r.asset)assets.add(r.asset);if(r.plan)plans.add(r.plan);if(r.status&&clean(r.status)!=='OK')pending++;if(!r.status)missingStatus++;if(r.outside)outside++;
 const code=r.strategy||'Sem estratégia';if(!groups.has(code))groups.set(code,{code,rows:[],assets:new Set(),cycles:new Set(),outside:new Set(),pending:0,weekSets:Array.from({length:weeks},()=>new Set()),weekCounts:Array(weeks).fill(0)});
 const g=groups.get(code);g.rows.push(r);if(r.asset)g.assets.add(r.asset);split(r.cycles).forEach(x=>g.cycles.add(x));split(r.outside).forEach(x=>g.outside.add(x));if(r.status&&clean(r.status)!=='OK')g.pending++;
 r.weeks.forEach((cell,i)=>{if(cell){weekly[i]++;g.weekCounts[i]++;split(cell).forEach(x=>g.weekSets[i].add(x));}});
 }
 return {groups:[...groups.values()].sort((a,b)=>a.code.localeCompare(b.code,'pt-BR')),assets:assets.size,plans:plans.size,pending,outside,missingStatus,weekly};
}
root.StrategyEngine={clean,split,parse,summarize};if(typeof module!=='undefined')module.exports=root.StrategyEngine;
})(typeof globalThis!=='undefined'?globalThis:this);
