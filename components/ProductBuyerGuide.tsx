import guides from '../lib/product-buyer-guides.json';
export default function ProductBuyerGuide({code,zh=false}:{code:string;zh?:boolean}) {
  const guide=guides[code as keyof typeof guides];
  if(!guide) return null;
  const i=zh?1:0;
  return <section className="purchase-guide" aria-label={zh?'选型与采购说明':'Selection and buying guide'}>
    <h2>{zh?'这款包装适合什么？':'What is this packaging designed for?'}</h2><p>{guide.answer[i]}</p>
    <h3>{zh?'什么时候选它，什么时候比较其他结构？':'When should you choose it or compare alternatives?'}</h3><p>{guide.selection[i]}</p>
    <h3>{zh?'打样前需要确认什么？':'What should you confirm before sampling?'}</h3><p>{guide.review[i]}</p>
    <a href={`/insights/${guide.guide}`}>{zh?'阅读相关选型指南（英文） →':'Read the related selection guide →'}</a>
  </section>;
}
