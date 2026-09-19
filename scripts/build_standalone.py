"""Empacota o site em um HTML independente; somente biblioteca padrão."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
html = (root / 'index.html').read_text(encoding='utf-8')
css = (root / 'assets/style.css').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="assets/style.css">', '<style>' + css + '</style>')
for name in ['xlsx.full.min.js', 'engine.js', 'app.js']:
    source = (root / 'assets' / name).read_text(encoding='utf-8')
    source = re.sub(r'</script', r'<\\/script', source, flags=re.I)
    html = html.replace(f'<script src="assets/{name}"></script>', '<script>' + source + '</script>')
license_text = (root / 'assets/SHEETJS-LICENSE.txt').read_text(encoding='utf-8')
html = html.replace('<head>', '<head><!-- SheetJS CE 0.20.3 · Apache 2.0\n' + license_text.replace('--', '—') + '\n-->', 1)
output = root / 'Mapa_52_Semanas.html'
output.write_text(html, encoding='utf-8')
print(output)
