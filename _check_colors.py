import pathlib
p = pathlib.Path('CSS/style.css')
t = p.read_text(encoding='utf-8', errors='ignore')
print('file:', p)
print('len:', len(t))
for pat in ['#ff4655','#e63946','#dc3545','#c82333','#5b8cff']:
    print(pat, 'count=', t.count(pat))

