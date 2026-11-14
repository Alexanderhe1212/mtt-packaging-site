import guides from '../lib/product-buyer-guides.json';
export default function ProductBuyerGuide({code,zh=false}:{code:string;zh?:boolean}) {
  const guide=guides[code as keyof typeof guides];
  const i=zh?1:0;
  if (!guide?.answer[i] || !guide.selection[i] || !guide.review[i]) return null;
  return <section className="purchase-guide" aria-label={zh?'选型与采购说明':'Selection and buying guide'}>
    <h2>{zh?'这款包装适合什么？':'What is this packaging designed for?'}</h2><p>{guide.answer[i]}</p>
    <h3>{zh?'什么时候选它，什么时候比较其他结构？':'When should you choose it or compare alternatives?'}</h3><p>{guide.selection[i]}</p>
    <h3>{zh?'打样前需要确认什么？':'What should you confirm before sampling?'}</h3><p>{guide.review[i]}</p>
    <a href={`/insights/${guide.guide}`}>{zh?'阅读相关选型指南（英文） →':'Read the related selection guide →'}</a>
    {code==='MTT-R0103' && <><p>{zh?'护肤套装采购指南（英文）：':'For a skincare assortment: '}<a href="/insights/shared-box-multiple-cosmetic-skus">{zh?'比较多款产品共用礼盒':'Compare one box for multiple cosmetic SKUs'}</a>{' · '}<a href="/insights/cosmetic-pump-bottle-gift-box-clearance">{zh?'检查泵头与盒盖间隙':'Check pump and lid clearance'}</a></p><p>{zh?'需要减少空盒储运空间？':'If empty-box storage or shipping space matters, '}<a href={zh?'/zh/products/skincare-ritual-collapsible-magnetic-rigid-box':'/products/skincare-ritual-collapsible-magnetic-rigid-box'}>{zh?'比较折叠式护肤套盒':'compare the fold-flat skincare set box'}</a>{zh?'。须按实物核对内托、装配和完整装箱体积。':'. Review the insert, assembly work and complete carton volume for your own products.'}</p></>}
    {code==='MTT-R1203' && <><p><a href="/insights/cosmetic-gift-box-paperboard-dividers">{zh?'礼盒分隔与内托采购指南（英文） →':'Compare dividers and inserts for a cosmetic gift set →'}</a></p><p>{zh?'考虑预先成型的另一种结构？':'For an alternative supplied assembled, '}<a href={zh?'/zh/products/skincare-ritual-book':'/products/skincare-ritual-book'}>{zh?'比较书型护肤套盒':'compare the skincare book box'}</a>{zh?'。两款展示的容器配置不同，需分别打样确认。':'. The illustrated container layouts differ, so confirm fit for each on a sample.'}</p></>}
  </section>;
}
