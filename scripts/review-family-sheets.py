import json,sys
from pathlib import Path
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1]
codes=sys.argv[1:]
sheet=Image.new('RGB',(1600,560*((len(codes)+1)//2)),'white')
for i,code in enumerate(codes):
 d=json.loads((root/f'docs/catalog/loaded-refresh/{code}.json').read_text())
 im=Image.open(d['source']);im.thumbnail((800,530))
 x,y=i%2*800,i//2*560
 sheet.paste(im,(x,y+25));ImageDraw.Draw(sheet).text((x+8,y+5),code,fill='black')
out=root/'work'/('review-'+codes[0]+'.jpg');sheet.save(out,quality=90);print(out)
