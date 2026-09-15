const families = [
 {id:'rigid',name:'Rigid gift boxes',zh:'精品硬盒',path:'custom-rigid-boxes',material:'Rigid board wrapped in paper',materialZh:'硬质板材裱纸',opening:'Separate lift-off lid, hinged magnetic lid or sliding drawer.',openingZh:'独立天地盖、磁吸翻盖或抽屉开合。',use:'Gift presentation, bottles and coordinated sets.',useZh:'礼赠展示、瓶器及组合套装。',check:'Review lid fit, hinge or drawer travel, insert clearance and packed shipping volume.',checkZh:'确认盖合、铰接或抽拉行程、内托间隙及装箱体积。'},
 {id:'carton',name:'Folding cartons',zh:'卡纸折叠盒',path:'folding-cartons',material:'Creased and die-cut paperboard',materialZh:'模切压痕卡纸',opening:'Tuck tabs, glued bottoms, sleeves or other folding closures.',openingZh:'插口、糊底、套筒等折叠结构。',use:'Retail packs and printed product ranges.',useZh:'零售包装及系列印刷包装。',check:'Review fold cracking, tab engagement, base support and the filling process.',checkZh:'确认折痕爆线、插口配合、底部支撑及装填流程。'},
 {id:'corrugated',name:'Corrugated packaging',zh:'瓦楞包装',path:'corrugated-boxes',material:'Fluted paper between liners',materialZh:'面纸与瓦楞芯纸组合',opening:'Roll-end mailer with locking wings or a sealed four-flap carton.',openingZh:'带锁翼的飞机盒，或需封箱的对口箱。',use:'Shipping, e-commerce and protective outer packs.',useZh:'运输、电商及外包装保护。',check:'Review the filled pack, board specification, sealing, stacking and intended transport route.',checkZh:'结合装入产品后的包装，确认纸板规格、封箱、堆码及运输路线。'},
 {id:'bag',name:'Custom paper bags',zh:'定制纸袋',path:'custom-paper-bags',material:'Paper with base and handle reinforcement as specified',materialZh:'纸张及按需配置的袋底、提手补强',opening:'Open top with paper, rope or ribbon handles.',openingZh:'敞口配纸质、绳质或丝带提手。',use:'Retail carry bags and matching box-and-bag sets.',useZh:'零售手提袋及盒袋配套。',check:'Measure the closed gift set; check gusset, insertion space and handle attachment under the intended load.',checkZh:'测量闭合后的礼盒套装，确认侧褶、装入空间及预期载重下的提手连接。'},
];
export default function PackagingFamilyComparison({zh=false}:{zh?:boolean}) {
 return <details className="packaging-comparison">
  <summary>{zh?'不确定选哪一类？比较四种包装结构':'Not sure where to start? Compare four packaging families'}</summary>
  <p>{zh?'先按用途和开合方式选结构，再比较颜色与工艺。材料名称本身不能证明承重、运输保护或食品接触适用性。':'Start with the job and opening style, then compare colors and finishes. A material name alone does not establish load capacity, transit protection or food-contact suitability.'}</p>
  <div>{families.map(f=><article key={f.id}><h2>{zh?f.zh:f.name}</h2><dl>
   <dt>{zh?'材料构成':'Material construction'}</dt><dd>{zh?f.materialZh:f.material}</dd>
   <dt>{zh?'开合方式':'Opening style'}</dt><dd>{zh?f.openingZh:f.opening}</dd>
   <dt>{zh?'常见用途':'Typical use'}</dt><dd>{zh?f.useZh:f.use}</dd>
   <dt>{zh?'打样重点':'Sample review'}</dt><dd>{zh?f.checkZh:f.check}</dd>
  </dl><a href={`/packaging/${f.path}`}>{zh?'查看选型指南（英文）':'Read the family buying guide'} →</a></article>)}</div>
  <p>{zh?'询价请提供产品尺寸、重量、每款数量及交付地区；纸袋尺寸请区分袋宽、侧褶深度和袋高。实物样品确认后再确定生产规格。':'For a quotation, share product dimensions, weight, quantity per design and destination. For bags, distinguish width, gusset depth and height. Confirm the production specification with a physical sample.'}</p>
 </details>;
}
