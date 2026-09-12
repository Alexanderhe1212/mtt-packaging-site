"""Prepare the approved 120-product rigid-box phase; images require separate review."""
import json, re
from pathlib import Path

groups = [
('fragrance-beauty','Fragrance & cosmetics','香水与化妆品', '''
Signature perfume|单瓶香水|one rectangular bottle cavity|一个长方形瓶器定位槽
Travel fragrance trio|旅行香氛三件套|three narrow parallel bottle cavities|三个并列细长瓶槽
Skincare ritual|护肤仪式套装|a jar well beside two bottle wells|一个罐槽与两个瓶槽
Perfume discovery library|香水探索套装|six narrow vial channels|六个试香瓶槽
Face cream presentation|面霜展示礼盒|one centred circular jar recess|居中圆形罐槽
Makeup artist collection|彩妆组合|four rectangular cosmetic compartments|四个长方形彩妆分仓
Botanical scent duo|植物香氛双瓶装|two equally sized bottle recesses|两个等大的瓶槽
Beauty ampoule collection|安瓶精华套装|eight slim parallel channels|八个并列安瓶槽
Solid perfume keepsake|固体香膏收藏装|one shallow round compact well|浅圆形香膏盘槽
Evening beauty routine|晚间护理套装|two removable compartment trays|两层可取出的分格托盘
Perfume and refill|香水与补充装|two unequal bottle cavities|两个不同尺寸的瓶槽
Lip colour wardrobe|唇妆系列|five slim rectangular recesses|五个细长唇膏槽
Facial oil and stone|精油与按摩石|one bottle well and one oval tool well|一个瓶槽与一个椭圆工具槽
Bridal fragrance|婚礼香氛礼盒|one bottle cavity with a card channel|一个瓶槽和卡片位
Moisture mask collection|保湿面膜组合|a flat sachet compartment|扁平袋装面膜仓
Professional brush set|化妆刷套装|six long parallel tool slots|六个长条工具槽
Haircare gift ritual|护发礼赠套装|three tall container recesses|三个高瓶器定位槽
Miniature makeup collection|迷你彩妆套装|two drawers with four square wells each|两个抽屉各含四个方槽
Powder compact gift|粉饼礼赠装|one circular compact recess|一个圆形粉饼盘槽
Fragrance layering set|叠香组合套装|a bottle tray above a small vial tray|大瓶托盘与下层试香托盘
'''),
('tea-coffee-chocolate','Tea, coffee & chocolate','茶·咖啡·巧克力', '''
Tea tin pairing|双罐茶礼|two circular tin wells|两个圆形茶罐槽
Coffee tasting flight|咖啡品鉴组合|four square pouch compartments|四个袋装咖啡分仓
Chocolate selection|巧克力精选礼盒|nine equal compartments for wrapped chocolates|九个独立包装巧克力分格
Tea ceremony collection|茶礼仪式套装|two tin wells and one long utensil slot|两个罐槽和一个长工具槽
Single estate tea|单产区茶礼|one round tin recess|一个圆茶罐槽
Coffee and chocolate pairing|咖啡巧克力组合|two compartments per drawer|每层抽屉两个分仓
Seasonal tea trio|季节茶三罐装|three equal tin recesses|三个等大的茶罐槽
Chocolate tasting library|巧克力品鉴抽屉|six wrapped-bar channels per drawer|每层六个独立包装巧克力条槽
Cacao truffle gift|松露巧克力礼赠|seven wrapped-confection compartments|七个独立包装糖果分格
Afternoon tea assortment|下午茶组合|two shallow removable compartment trays|两层浅分格活动托盘
Matcha ritual gift|抹茶仪式礼盒|one tin well and one long whisk compartment|一个罐槽和长茶筅仓
Coffee capsule selection|咖啡胶囊精选|twelve round capsule recesses|十二个圆形胶囊槽
Chocolate bar collection|巧克力排块组合|four parallel wrapped-bar compartments|四个并列独立包装排块仓
Tea origin discovery|茶产地探索组合|six small tin recesses|六个小茶罐槽
Roaster reserve tin|烘焙师精选罐装|one large circular tin cavity|一个大圆罐槽
Tea and honey pairing|茶与蜂蜜组合|two separate container wells per drawer|每层两个独立容器槽
Winter cocoa gift|冬日可可礼盒|one tin and two sachet compartments|一个罐槽与两个袋装分仓
Coffee drip-bag wardrobe|挂耳咖啡礼盒|two drawers of upright sachet dividers|双抽屉袋装分隔内托
Celebration chocolate round|圆形庆典巧克力盒|radial compartments for wrapped sweets|放射状独立包装糖果分仓
Festive tea tower|节庆茶礼双层盒|two removable trays with three wells each|两层活动托盘各含三个槽
'''),
('nutrition-wellness','Nutrition & wellness','营养品与保健品', '''
Daily supplement duo|每日营养双瓶装|two sealed-bottle wells|两个密封瓶定位槽
Wellness sachet programme|营养条包组合|seven divided sachet compartments|七个条包分仓
Collagen routine set|胶原营养套装|one tub well and a sachet compartment|一个罐槽与一个条包仓
Vitamin discovery set|维生素组合装|four separate sealed-bottle wells|四个独立密封瓶槽
Nutrition powder presentation|营养粉罐礼盒|one large tub recess|一个大罐定位槽
Morning evening routine|早晚营养组合|two drawers each holding three bottles|双抽屉各放三瓶
Herbal wellness collection|植物营养组合|three container wells|三个容器定位槽
Travel wellness organiser|旅行营养收纳礼盒|two shallow sachet drawers|两个浅条包抽屉
Single jar wellness gift|单罐营养礼赠|one round sealed-jar cavity|一个密封圆罐槽
Complete wellness programme|营养组合双层礼盒|a bottle tray above a sachet tray|上层瓶托与下层条包托
Family supplement pairing|家庭营养双瓶礼盒|two different-size bottle cavities|两个不同尺寸瓶槽
Mineral sachet collection|矿物营养条包装|ten parallel sachet compartments|十个条包分仓
Protein shaker gift|营养粉与摇摇杯|one tub well and a tall cup well|一个粉罐槽与一个高杯槽
Wellness welcome kit|健康欢迎套装|three bottle wells and a card pocket|三个瓶槽与一个卡片位
Botanical capsule gift|植物胶囊礼盒|one sealed bottle well|一个密封瓶槽
Nutrition starter library|营养入门抽屉套装|four small container wells per drawer|每层四个小容器槽
Recovery routine collection|运动营养组合|two container wells and a flat pouch well|两个容器槽与扁平袋装槽
Weekly wellness refill|每周营养补充装|two drawers with seven narrow divisions|双抽屉各七个窄分格
Premium supplement tin|营养品罐装展示|one cylindrical container well|一个圆柱容器槽
Wellness gift layers|分层营养礼赠|two removable trays for sealed packs|两层密封包装活动托盘
'''),
('jewelry-watches','Jewelry & watches','珠宝与手表', '''
Engagement ring keepsake|订婚戒指收藏盒|one fabric-lined ring slit|一个织物衬里戒指槽
Pendant presentation|吊坠展示盒|a necklace pad with two chain notches|带两个链条定位口的项链垫
Watch and strap collection|手表与表带组合|one watch cushion and a long strap slot|一个表枕和长表带槽
Wedding jewellery set|婚礼珠宝套装|ring, pendant and earring positions|戒指、吊坠和耳饰定位位
Statement cuff gift|手镯展示礼盒|one oval fabric-lined cuff well|一个椭圆织物手镯槽
Collector watch drawers|收藏腕表双抽屉盒|two watch cushions per drawer|每层两个表枕
Gemstone necklace gift|宝石项链礼盒|one shaped necklace presentation pad|一个项链展示垫
Earring collection library|耳饰收藏抽屉盒|six small lined compartments per drawer|每层六个衬里小分仓
Single watch round case|圆形单表礼盒|one centred watch cushion|居中单表枕
Jewellery wardrobe layers|珠宝分层收纳礼盒|a ring tray above a necklace tray|上层戒指托与下层项链托
Anniversary ring pair|纪念日对戒礼盒|two fabric-lined ring slits|两个织物衬里戒指槽
Bracelet pull-out gift|手链抽拉礼盒|one long bracelet channel|一个长手链槽
Pearl necklace presentation|珍珠项链展示盒|one broad curved necklace pad|一个宽弧形项链垫
Watch boutique presentation|精品腕表展示盒|one watch cushion and a card compartment|一个表枕与卡片仓
Brooch keepsake|胸针收藏礼盒|one shallow padded brooch recess|一个浅衬垫胸针槽
Fine jewellery cabinet|珠宝双层抽屉盒|separate ring and bracelet divisions|戒指与手链独立分仓
Bridal jewellery trio|新娘珠宝三件套|three fabric-lined display zones|三个织物衬里展示区
Cufflink collector|袖扣收藏盒|four paired recesses per drawer|每层四对袖扣槽
Charm bracelet round gift|串饰手链圆盒|one circular padded bracelet well|一个圆形衬垫手链槽
Watch collectors set|腕表收藏双层礼盒|two removable trays with watch cushions|两层带表枕的活动托盘
'''),
('bakery-food','Bakery & food gifting','烘焙与食品礼赠', '''
Mooncake quartet|四枚月饼礼盒|four square wrapped-food compartments|四个独立包装食品方格
Artisan cookie assortment|手工饼干组合|six wrapped-cookie compartments|六个独立包装饼干分仓
Festive pastry collection|节庆糕点组合|nine wrapped-pastry compartments|九个独立包装糕点分格
Gourmet pantry gift|美食杂货礼盒|two sealed-jar wells and a wrapped-food compartment|两个密封罐槽和一个独立包装食品仓
Fruit preserve presentation|果酱罐礼盒|one sealed-jar cavity|一个密封罐槽
Biscuit tasting drawers|饼干品鉴抽屉盒|four wrapped-food cells per drawer|每层四个独立包装食品格
Festival sweets collection|节日糖点组合|six wrapped-sweet compartments|六个独立包装糖点格
Pastry discovery library|糕点探索抽屉盒|three wrapped-pastry cells per drawer|每层三个独立包装糕点格
Round seasonal cake gift|圆形节庆点心盒|one recess for a separately sealed food tray|一个独立密封食品托盘位
Holiday hamper layers|节日双层美食礼盒|two removable wrapped-food trays|两层独立包装食品活动托盘
Mooncake and tea pairing|月饼与茶组合|two wrapped-food cells and a tin well|两个独立包装食品格与茶罐槽
Shortbread pull-out gift|黄油酥饼抽拉礼盒|four wrapped-biscuit divisions|四个独立包装饼干分仓
Gourmet condiment trio|调味品三罐礼盒|three sealed-jar wells|三个密封罐槽
New year pastry gift|新年糕点礼盒|eight wrapped-food compartments|八个独立包装食品分格
Honey reserve gift|精选蜂蜜礼盒|one sealed honey-jar well|一个密封蜂蜜罐槽
Celebration cookie cabinet|庆典饼干双抽屉盒|six wrapped-cookie cells per drawer|每层六个独立包装饼干格
Regional delicacy selection|地方风味礼盒|four differently sized sealed-pack wells|四个不同尺寸密封包装槽
Festive sweet drawers|节庆甜点抽屉礼盒|two drawers of wrapped confection compartments|双抽屉独立包装糖点分仓
Round biscuit tin gift|圆罐饼干礼盒|one sealed round tin recess|一个密封圆罐槽
Seasonal food collection|应季食品双层礼盒|removable trays for individually sealed foods|独立密封食品活动托盘
'''),
('corporate-gifts','Corporate & occasion gifts','礼品与企业礼赠', '''
Executive notebook set|商务笔记本套装|a notebook well and one pen channel|笔记本槽与一个笔槽
Client welcome gift|客户欢迎礼盒|three rectangular accessory compartments|三个长方形附件仓
Desk essentials collection|桌面礼赠套装|a notebook recess and two accessory wells|笔记本槽与两个附件槽
Christmas client gift|圣诞客户礼盒|four equal gift compartments|四个等大的礼品仓
Commemorative keepsake|纪念收藏礼盒|one square padded presentation recess|一个方形衬垫展示槽
Employee welcome drawers|员工欢迎抽屉盒|a stationery drawer and an accessory drawer|文具抽屉与附件抽屉
Event invitation suite|活动邀请礼盒|one flat card well and a token recess|一个扁平卡片位与纪念物槽
Corporate gift library|企业礼赠双抽屉|two drawers with three accessory wells|双抽屉各三个附件槽
Celebration candle gift|庆典香薰礼盒|one round jar recess|一个圆罐定位槽
VIP presentation layers|贵宾分层礼盒|two removable mixed-accessory trays|两层组合附件活动托盘
Pen and journal gift|钢笔与日记本礼盒|one flat notebook recess and two pen channels|一个笔记本槽与两个笔槽
Conference welcome kit|会议欢迎套装|a badge well and two gift compartments|证件位与两个礼品仓
Silk scarf presentation|丝巾展示礼盒|one broad shallow lined compartment|一个宽浅衬里仓
Milestone anniversary gift|周年纪念礼盒|one central keepsake recess and two side wells|居中纪念物槽与两侧分仓
Boutique accessory gift|精品附件礼盒|one padded accessory recess|一个衬垫附件槽
Festive corporate cabinet|节庆企业双抽屉礼盒|four compartments in each drawer|每层四个分仓
Partner appreciation set|合作伙伴答谢礼盒|a card pocket and two gift recesses|卡片位与两个礼品槽
Brand launch collection|品牌发布抽屉套装|two drawers with flat sample divisions|双抽屉平面样品分隔
Round keepsake presentation|圆形纪念礼盒|one circular lined presentation well|一个圆形衬里展示槽
Premium onboarding set|高端入职礼赠套装|a stationery tray above an accessory tray|上层文具托与下层附件托
''')]

structures=[
('lift-off','Lift-off lid','天地盖','A completely removable shallow cap fits over a four-wall base.','独立浅盖套合四边完整的盒底。','In the open view place the detached lid flat to the RIGHT of the base with a wide visible gap. No hinge or spine.'),
('drawer','Drawer box','抽屉盒','A tray slides horizontally from a rigid four-sided sleeve.','内抽屉从四面硬质外套中水平抽出。','Show one tray pulled halfway from its matching sleeve, a small ribbon pull fixed to the front. No hinged lid.'),
('book','Magnetic book box','磁吸书型盒','A rigid lid hinges at the spine; concealed magnets close the front edge.','硬质盖沿书脊翻开，前缘以隐藏磁铁闭合。','Show lid attached on LEFT spine, open flat beside base. Thin paper hinge, magnets hidden. No tuck flaps.'),
('double-door','Double-door box','双开门盒','Two equal rigid doors hinge at opposite sides and meet centrally.','两扇等宽硬质门板从两侧翻开，在中间对合。','Show both equal doors opened symmetrically, each half the front width. No extra lid.'),
('shoulder','Shoulder-neck box','围边天地盖','A removable lid fits over a raised inner neck, leaving a narrow shoulder band.','独立盒盖套合内围框，闭合后露出窄围边。','Detached lid rests flat RIGHT of base separated by a wide gap; raised inner neck clearly visible. No hinge.'),
('stacked-drawers','Two-drawer box','双层抽屉盒','Two separate shallow drawers slide from one rigid cabinet.','两个独立浅抽屉从同一硬质外框抽出。','Show exactly two drawers with front ribbon pulls, top drawer pulled out farther. No hinged top.'),
('hexagonal','Hexagonal lift-off box','六角天地盖','Matching six-sided base and removable six-sided cap.','六边盒底与独立六边盒盖配合。','Open view: two detached matching HEXAGONAL parts side by side with wide gap. Six sides each. No hinge.'),
('stacked-drawers','Two-drawer box','双层抽屉盒','Two separate shallow drawers slide from one rigid cabinet.','两个独立浅抽屉从同一硬质外框抽出。','Show exactly two drawers with front ribbon pulls, bottom drawer pulled out farther. No hinged top.'),
('round','Round lift-off box','圆形天地盖','A separate round cap fits over a cylindrical rigid base.','独立圆盖套合圆柱形硬质盒底。','Detached round lid flat beside circular base with clear gap. Both perfectly round, NO hinge.'),
('tiered','Two-tier lift-off box','双层天地盖','A removable outer cap covers two vertically stacked removable trays.','独立外盖覆盖上下两层可取出的托盘。','Open view: base with lower tray, upper tray removed and placed beside it, lid flat farther right. No hinge, exactly two trays.')]
palettes=[('Ivory and forest green','象牙白与墨绿'),('Burgundy and blush','酒红与浅粉'),('Midnight blue and silver','深蓝与银色'),('Plum and pearl','梅紫与珠白'),('Terracotta and cream','陶土红与奶油白'),('Charcoal and champagne','炭黑与香槟'),('Sage and copper','鼠尾草绿与铜色'),('Cobalt and ivory','钴蓝与象牙白'),('Dusty rose and graphite','灰粉与石墨灰'),('Deep teal and sand','深青与沙色'),('Espresso and pale gold','咖啡棕与浅金'),('Lavender and slate','薰衣草紫与板岩灰'),('Warm grey and black','暖灰与黑色'),('Navy and amber','海军蓝与琥珀'),('Oxblood and cream','深酒红与奶油白'),('Olive and off-white','橄榄绿与米白'),('Coral and midnight blue','珊瑚与深蓝'),('Stone and burgundy','石色与酒红'),('Peacock green and pearl','孔雀绿与珠白'),('Black and warm ivory','黑色与暖象牙白')]
wraps=[('Textured uncoated wrapping paper','纹理非涂布裱纸'),('Smooth matte printed wrapping paper','平滑哑面印刷裱纸'),('Fine linen-textured wrapping paper','细布纹裱纸'),('Pearlescent wrapping paper','珠光裱纸')]
finishes=[('Fine foil lines and offset pattern','细线烫金与胶印图案'),('Blind embossed motif and small foil accent','无色击凸纹样与小面积烫金'),('Two-colour print and debossed border','双色印刷与压凹边框'),('Matte print and restrained spot gloss','哑面印刷与局部光油')]
arts=['restrained botanical line drawing','precise geometric border','fine abstract wave pattern','small symmetrical radial motif','subtle diagonal pinstripes']
products=[]; prompts=[]
for g,(category,en,zh,rows) in enumerate(groups):
    rows=[r.split('|') for r in rows.strip().splitlines()]
    assert len(rows)==20
    for i,(name,namezh,insert,insertzh) in enumerate(rows):
        st,sten,stzh,logic,logiczh,visual=structures[i%10]
        color,colorzh=palettes[(i+g*3)%20]; wrap,wrapzh=wraps[(i+g)%4]; finish,finishzh=finishes[(i+g)%4]
        code=f'MTT-R{g+1:02}{i+1:02}'
        slug=re.sub('[^a-z0-9]+','-',name.lower()).strip('-')+'-'+st
        check='Confirm product clearances, insert removal, lid fit and the complete transit pack.'
        checkzh='确认产品间隙、内托取放、盖底配合及完整运输包装。'
        if g in (1,4):
            check+=' Intended for separately sealed foods; direct contact needs a separately specified compliant liner and documentation.'
            checkzh+=' 用于独立密封食品；直接接触食品需另行指定合适内衬并核查合规文件。'
        if g==2:
            check+=' Retain the original sealed primary containers; this box does not replace their barrier or tamper protection.'
            checkzh+=' 保留原有密封内包装；礼盒不能替代内包装的阻隔与防拆功能。'
        p=dict(code=code,slug=slug,family='rigid',familyName='Rigid gift boxes',familyZh='精品硬盒',category=category,categoryName=en,categoryZh=zh,structure=st,structureName=sten,structureZh=stzh,name=name+' — '+sten,nameZh=namezh+' · '+stzh,description=f'{name} uses {insert} inside a {sten.lower()} finished in {color.lower()}. {logic}',descriptionZh=f'{namezh}采用{stzh}，内置{insertzh}，以{colorzh}呈现。{logiczh}',material='Paper-wrapped rigid greyboard',materialZh='裱纸硬质灰板',board='Rigid greyboard; thickness determined during sampling',boardZh='硬质灰板；厚度按打样确认',wrap=wrap,wrapZh=wrapzh,insert=insert.capitalize(),insertZh=insertzh,finish=finish,finishZh=finishzh,color=color,colorZh=colorzh,logic=logic,logicZh=logiczh,check=check,checkZh=checkzh,contents=name,contentsZh=namezh,art=arts[(i+g)%5],image=f'/products/{code.lower()}.webp')
        products.append(p)
        prompt=f'''Professional premium rigid packaging photography, one CONSISTENT product in a strict 3-column 2-row contact sheet, 3:2 overall. Six equal square cells, no borders/captions/text/logo. Cell6 blank. Product {name}, {sten}. {logic} Paper-wrapped rigid greyboard, {wrap}, {color}, {finish}, {p['art']}. EMPTY insert: {insert}. Cell1 CLOSED full 3/4 hero. Cell2 OPEN: {visual} Cell3 closed rear/side same design. Cell4 overhead close view of the SAME empty insert inside base. Cell5 close paper/finish/corner detail. All views same proportions, artwork locations, number and shape of insert cavities. Neutral warm studio, tactile paper, refined controlled lighting. Never a corrugated mailer, tuck carton, dust flaps or shipping box. Realistic separate assembled rigid walls, straight edges, accurate mating footprints and visible paper thickness. Keep complete objects within each cell. No products inside; focus on the packaging. In detachable structures never prop the lid against the base or stand it behind it; rest it flat alongside with a clear empty gap.'''
        prompts.append(dict(code=code,prompt=prompt))
Path('lib/products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2)+'\n')
Path('docs/catalog/rigid-prompts.json').write_text(json.dumps(prompts,ensure_ascii=False,indent=2)+'\n')
print(f'Prepared {len(products)} rigid product specifications and prompts; no images approved by this script.')
