import json
from pathlib import Path

root=Path(__file__).resolve().parents[1]
existing=json.loads((root/'lib/products-expanded.json').read_text())
uses=[
('perfume bottle','单瓶香水','fragrance-beauty'),('skincare duo','护肤双件套','fragrance-beauty'),('tea sachets','茶包组合','tea-coffee-chocolate'),('coffee pouches','咖啡袋装组合','tea-coffee-chocolate'),('wrapped chocolates','独立包装巧克力','tea-coffee-chocolate'),('sealed supplement bottle','密封营养品瓶','nutrition-wellness'),('candle jar','杯装蜡烛','home-fragrance'),('reed diffuser','无火香薰','home-fragrance'),('wrapped cookies','独立包装曲奇','bakery-food'),('sealed macarons','密封马卡龙','bakery-food'),('jewelry pouch','首饰布袋','jewelry-watches'),('silk scarf','丝巾','retail-gifting'),('soap bars','香皂套装','fragrance-beauty'),('lipstick trio','三支唇膏','fragrance-beauty'),('stationery set','文具套装','corporate-gifts'),('Christmas ornaments','圣诞装饰品','christmas'),('wrapped mooncakes','独立包装月饼','bakery-food'),('honey jar','蜂蜜罐','bakery-food'),('hand cream duo','护手霜双件套','fragrance-beauty'),('socks gift','袜子礼品','retail-gifting'),('miniature fragrance','迷你香水','fragrance-beauty'),('sealed granola pouch','密封麦片袋','bakery-food'),('travel accessories','旅行配件','corporate-gifts'),('tumbler','随行杯','corporate-gifts'),('tea tin','茶叶罐','tea-coffee-chocolate'),('festive confectionery','节日糖果','christmas'),('beauty discovery set','美妆体验套装','fragrance-beauty'),('client welcome kit','客户欢迎套装','corporate-gifts')]
allold=json.loads((root/'lib/products.json').read_text())+existing
cats={x['category']:(x['categoryName'],x['categoryZh']) for x in allold}
palettes=[('Coral and cobalt','珊瑚橙与钴蓝'),('Lemon and lilac','柠檬黄与丁香紫'),('Turquoise and pink','湖蓝与亮粉'),('Orange and royal blue','橘橙与宝蓝'),('Raspberry and copper','覆盆子粉与铜色'),('Lime and indigo','青柠绿与靛蓝'),('Scarlet and ice blue','鲜红与冰蓝'),('Sunshine yellow and cherry','明黄与樱桃红'),('Emerald and peach','祖母绿与蜜桃色'),('Violet and silver','紫罗兰与银色'),('Fuchsia and cream','玫红与奶油白'),('Azure and white','天蓝与白色'),('Tangerine and plum','柑橘橙与梅紫'),('Mint and vermilion','薄荷绿与朱红')]
arts=['large geometric circles','fine architectural stripes','expressive abstract waves','playful geometric mosaic','bold botanical silhouettes','modern sunburst motif','large angular colour blocks']
# All structural IDs have matching engineering review guidance.
structures={
'carton':[
('tuck','Tuck-end carton','插口卡纸盒','A single folding-paperboard body has a tuck tongue and two dust flaps at its top. No rigid lid, magnets or corrugated wings.','单片卡纸盒身，顶部插舌配两片防尘翼；无硬质盒盖、磁铁或瓦楞侧翼。'),
('auto-bottom','Crash-lock bottom carton','自动锁底卡纸盒','A folding carton has a glued crash-lock bottom and tuck top with dust flaps. Show the tuck top open, not a separate lid.','卡纸盒采用预糊自动锁底，顶部插舌配防尘翼；开口不呈现分离盒盖。'),
('window-tuck','Window tuck carton','开窗插口盒','A paperboard tuck carton has a small clear-film front window and intact border. Its top opens with a tuck tongue and dust flaps.','卡纸插口盒正面小面积透明膜窗，四周保留完整边框；顶部插舌配防尘翼。'),
('sleeve-carton','Paperboard sleeve and tray','卡纸套筒抽拉盒','A lightweight folded paperboard tray slides inside a thin four-sided paperboard sleeve. Thin scored edges, not thick wrapped rigid board.','轻质折叠卡纸托盘在四面卡纸套筒中抽拉；边缘为卡纸压痕，不是裱糊硬板。'),
('pillow','Pillow carton','枕形卡纸盒','A curved paperboard pillow carton closes with two overlapping crescent end flaps. No rectangular tray or hinge. Show one curved end open.','弧形卡纸枕形盒通过月牙形端翼叠合封口；无长方形托盘和铰链，展示一端开启。'),
('gable','Gable-top carton','屋顶手提卡纸盒','A scored paperboard carton closes with two sloping roof panels meeting at a die-cut handle. No separate lid or ribbon handles.','卡纸盒通过两块斜顶片汇合成模切提手；无分离盒盖和绳带提手。'),
('hex-carton','Hexagonal tuck carton','六角插口卡纸盒','A six-sided thin paperboard body closes with a scored tuck lid and small dust flaps. No lift-off cap.','六面薄卡纸盒身，压痕插盖搭配小防尘翼；不是天地盖。')],
'corrugated':[
('mailer','Roll-end mailer','飞机盒','One-piece corrugated roll-end mailer: lid hinged at the rear, side wings tuck into double side walls. Visible flute at cut edges.','一片成型瓦楞飞机盒，后侧连盖、侧翼插入双侧墙；切边可见瓦楞。'),
('rsc','Four-flap shipping carton','对口瓦楞箱','Rectangular corrugated shipping carton with four TOP flaps: two inner short flaps and two outer long flaps meeting at centre. No hinged gift-box lid.','长方形瓦楞运输箱，顶部两内翼、两外翼对口封合；无礼盒式连盖。'),
('corr-sleeve','Corrugated sleeve and tray','瓦楞套筒托盘','A folded corrugated tray slides along one axis into a four-sided corrugated sleeve. Clearly visible corrugated cut edges.','折叠瓦楞托盘沿单一方向滑入四面瓦楞套筒；切边清晰可见瓦楞。'),
('divided-mailer','Divided roll-end mailer','分隔飞机盒','A corrugated rear-hinged roll-end mailer has folded paper dividers around the products and side locking wings.','后侧连盖瓦楞飞机盒，内部折叠纸隔围合产品，配侧翼锁合。')],
'bag':[
('ribbon-bag','Ribbon-handle paper bag','丝带提手纸袋','Gusseted paper shopping bag with two flat ribbon handles, reinforced folded top and rectangular folded bottom. Mouth stays open.','侧褶手提纸袋，两条扁丝带提手，折口加强、长方形折底，袋口敞开。'),
('cord-bag','Cord-handle paper bag','棉绳提手纸袋','Gusseted paper bag with two cotton cord handles anchored through reinforced top holes and a folded rectangular bottom.','侧褶纸袋，两条棉绳通过加强袋口孔固定，长方形折底。'),
('twisted-bag','Twisted-paper handle bag','扭纸绳提手袋','Paper shopping bag with two twisted-paper loop handles bonded to internal reinforcement patches, side gussets and folded bottom.','纸袋两条扭纸绳环形提手粘合于内侧加强片，侧褶与折底完整。'),
('flat-handle-bag','Flat-paper handle bag','扁纸提手袋','Paper shopping bag with two flat folded-paper handles bonded inside, visible side gussets and folded bottom. No fabric ribbon.','两条折叠扁纸提手粘合袋内，侧褶和折底清晰；不是织物丝带。'),
('diecut-bag','Die-cut handle paper bag','模切手挽纸袋','Paper bag with reinforced oval die-cut handle holes near the top, side gussets, folded bottom. No separate cord or ribbon handles.','袋口附近加强椭圆模切手挽孔，侧褶、折底完整；无另装绳带提手。')]
}
materials={
'carton':[('Coated folding boxboard','涂布折叠白卡纸','Gloss varnish and vivid colour printing','亮光上光与鲜明彩印'),('Uncoated kraft paperboard','非涂布牛皮卡纸','Opaque colour printing','遮盖色印刷'),('Pearlescent paperboard','珠光卡纸','Pearlescent sheen with silver foil','珠光与局部烫银'),('White paperboard','白卡纸','Matte coating with selective gloss UV','哑光涂层与局部UV'),('Metallic laminated paperboard','金属复合卡纸','Opaque colour printing over metallic base','金属底色与遮盖色印刷'),('Fine-textured paperboard','细纹卡纸','Debossed motif and spot-colour printing','压凹图案与专色印刷')],
'corrugated':[('White-lined corrugated board','白面瓦楞纸板','Colour printing and gloss varnish','彩印与亮光上光'),('Kraft-lined corrugated board','牛皮面瓦楞纸板','Two-colour printing','双色印刷'),('Litho-laminated corrugated board','彩印裱面瓦楞纸板','Matte lamination on printed liner','印刷面纸哑膜'),('White-lined corrugated board','白面瓦楞纸板','Colour printing with selective gloss','彩印与局部亮光'),('Printed kraft-lined corrugated board','印刷牛皮面瓦楞纸板','Opaque bright ink and dark accents','鲜亮遮盖色与深色点缀')],
'bag':[('Coated shopping-bag paper','涂布手提袋纸','Gloss lamination and colour printing','亮膜与彩印'),('Kraft shopping-bag paper','牛皮手提袋纸','Two-colour printing','双色印刷'),('Fine-textured shopping-bag paper','细纹手提袋纸','Spot-colour printing and foil accent','专色印刷与局部烫箔'),('White shopping-bag paper','白色手提袋纸','Matte lamination and selective gloss','哑膜与局部亮光'),('Pearlescent shopping-bag paper','珠光手提袋纸','Pearlescent sheen and colour printing','珠光效果与彩印'),('Dyed shopping-bag paper','染色手提袋纸','Debossing and small foil motif','压凹与小面积烫箔')]
}
planned=[]
for fam,prefix,en,zh in [('carton','C','Folding cartons','卡纸盒'),('corrugated','E','Corrugated packaging','瓦楞包装'),('bag','B','Custom paper bags','定制手提袋')]:
 for i,(use,cn,cat) in enumerate(uses):
  sid,sname,szh,logic,logiczh=structures[fam][i%len(structures[fam])]
  # Curved pillow packs suit soft/small contents; avoid tall glass containers.
  if sid=='pillow' and i not in [4,11,18,25]:sid,sname,szh,logic,logiczh=structures[fam][0]
  mat,matzh,finish,finishzh=materials[fam][i%len(materials[fam])]
  col,colzh=palettes[(i+(0 if fam=='carton' else 4 if fam=='corrugated' else 8))%len(palettes)]
  code=f'MTT-{prefix}01{i+3:02d}';name=f'{use.capitalize()} — {sname}';namezh=f'{cn} · {szh}'
  slug=f'custom-{use.replace(" ","-")}-{sid}'
  insert,insertzh=('Folded paperboard support sized to the product','按产品配合的折叠卡纸承托') if fam=='carton' else ('Folded corrugated dividers sized to the packed product','按装载产品配合的折叠瓦楞分隔') if fam=='corrugated' else ('Reinforced top and bottom; matching tissue optional','袋口与袋底加强；可选配薄页纸')
  desc=f'{name} in {col.lower()}, using {mat.lower()} with {finish.lower()}. {logic}'
  d=dict(code=code,slug=slug,family=fam,familyName=en,familyZh=zh,category=cat,categoryName=cats[cat][0],categoryZh=cats[cat][1],structure=sid,structureName=sname,structureZh=szh,name=name,nameZh=namezh,description=desc,descriptionZh=f'{namezh}采用{colzh}，选用{matzh}，搭配{finishzh}。{logiczh}',material=mat,materialZh=matzh,board=mat+'; grade and thickness confirmed during sampling',boardZh=matzh+'；克重及厚度按打样确认',wrap=mat,wrapZh=matzh,insert=insert,insertZh=insertzh,finish=finish,finishZh=finishzh,color=col,colorZh=colzh,logic=logic,logicZh=logiczh,check='Confirm product dimensions, closure, crease quality and loaded handling with a physical sample.',checkZh='通过实物样品确认产品尺寸、封口、压痕质量及装载操作。',contents=use,contentsZh=cn,art=arts[i%len(arts)],image=f'/products/{code.lower()}.webp',seoTitle=f'Custom {use.title()} {sname} | MTT Packaging',searchTerms=[f'custom {use} packaging',f'{sname.lower()} manufacturer',mat.lower()],seoDescription=f'Custom {use} packaging with {sname.lower()} construction, {mat.lower()} and {finish.lower()}. Tailor size, artwork and quantity with MTT.',searchUse=use)
  if fam=='corrugated' and sid!='divided-mailer':d.update(insert='Paper cushioning or support fitted to contents',insertZh='按内容物配置纸质缓冲或承托')
  if fam=='carton' and sid in ['pillow','gable']:d.update(insert='Product fit and optional paper support reviewed during sampling',insertZh='打样确认产品配合及可选纸质承托')
  planned.append(d)
(root/'docs/catalog/family-expansion-plan.json').write_text(json.dumps(planned,ensure_ascii=False,indent=2)+'\n')
print(f'{len(planned)} planned products; not published until images reviewed.')
