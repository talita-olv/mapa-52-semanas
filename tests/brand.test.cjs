const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync,existsSync}=require('node:fs');
const {join}=require('node:path');
const root=join(__dirname,'..');
test('marca-mãe disponível em SVG seguro e legível',()=>{
 for(const name of ['talita-mark.svg','talita-brand.svg','project-banner.svg']){
  const p=join(root,'assets',name);
  assert.ok(existsSync(p),p);
  const content=readFileSync(p,'utf8');
  assert.match(content,/<svg\b/);
  assert.match(content,/<\/svg>/);
  assert.doesNotMatch(content,/<script|onload=|javascript:/i);
 }
});
test('mapa, estratégias e hub carregam tema e favicon comum',()=>{
 for(const [path,prefix,theme] of [['index.html','assets/','brand-theme.css'],['estrategias/index.html','../assets/','brand-theme.css'],['hub/index.html','../assets/','hub-theme.css']]){
  const html=readFileSync(join(root,path),'utf8');
  assert.ok(html.includes(prefix+'talita-mark.svg'),path);
  assert.ok(html.includes(prefix+theme),path);
  assert.ok(existsSync(join(root,'assets',theme)),theme);
 }
});
