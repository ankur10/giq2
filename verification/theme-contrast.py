from pathlib import Path
import json, re
root=Path(__file__).resolve().parents[1]
themes=json.loads((root/'themes.json').read_text())
def lum(c):
 a=[int(c[i:i+2],16)/255 for i in (1,3,5)]
 a=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in a]
 return sum(v*w for v,w in zip(a,[.2126,.7152,.0722]))
def ratio(a,b):
 x,y=sorted([lum(a),lum(b)])
 return (y+.05)/(x+.05)
checks=[]
for name,t in themes.items():
 for fg in ['ink','muted','accent']:
  for bg in ['canvas','surface','sunken','nav','accent-light','selected']:
   checks.append((name,fg,bg,4.5,ratio(t[fg],t[bg])))
 for fg,bg in [('on-primary','primary'),('on-primary','primary-hover'),('on-feature','feature'),('feature-muted','feature'),('feature-muted','feature-hover'),('green','green-light'),('amber','amber-light'),('error','surface')]:
  checks.append((name,fg,bg,4.5,ratio(t[fg],t[bg])))
 for fg in ['control-border','focus','chart-1','chart-2','chart-3','chart-4']:
  for bg in ['surface','canvas']:
   checks.append((name,fg,bg,3,ratio(t[fg],t[bg])))
 for fg,bg,minimum in [('ink','selected',4.5),('muted','selected',4.5),('accent','accent-light',3),('accent','selected',3)]:
  checks.append((name,fg,bg,minimum,ratio(t[fg],t[bg])))
 for fg in ['header-ink','header-muted']:
  for bg in ['header-surface','header-control','header-hover']:
   checks.append((name,fg,bg,4.5,ratio(t[fg],t[bg])))
 for fg in ['header-border','header-focus']:
  for bg in ['header-surface','header-control','header-hover']:
   checks.append((name,fg,bg,3,ratio(t[fg],t[bg])))
styles=(root/'styles.css').read_text()
rules={m[1].strip():m[2] for m in re.finditer(r'([^{}]+)\{([^{}]*)\}',styles)}
for selector in ['.command-result:hover,.command-result:focus','.signal-choice:hover','.studio-start:hover','.studio-home-entry:hover']:
 assert 'background:var(--selected)' in rules[selector],selector
for selector in ['.unread-dot','.signal-choice.selected:after']:
 assert 'background:var(--accent)' in rules[selector],selector
failed=[(n,f,b,round(r,2),m) for n,f,b,m,r in checks if r<m]
result={'scope':'Static semantic token-pair calculations; not browser-computed styles or visual verification.','pairs':len(checks),'failures':failed,'minimumBodyRatio':round(min(r for n,f,b,m,r in checks if m==4.5),2)}
(root/'verification/theme-contrast.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result,indent=2))
raise SystemExit(bool(failed))
