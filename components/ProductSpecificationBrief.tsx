import type {PackagingProduct} from '../lib/products';

// Quotation inputs, not measured specifications or validated performance.
export default function ProductSpecificationBrief({p, zh=false}: {p:PackagingProduct; zh?:boolean}) {
  const i=zh?1:0;
  const dimensions=p.family==='bag'
    ? ['Specify bag width × gusset × body height in mm, excluding handles. Include the packed product dimensions and the clearance needed to lift it out.', '请按毫米注明袋宽×侧褶×袋身高度，袋高不含提手。另提供装好包装后的产品尺寸及取放所需空间。']
    : ['Send the maximum product length × width × height in mm, including caps or protruding parts. For round products, give diameter × total height. Confirm usable internal space and finished outside dimensions separately on the sample drawing.', '请按毫米提供产品最大长×宽×高，包含盖子及凸出部位；圆形产品提供直径×总高。在样品图纸上分别确认可用内空间和成品外尺寸。'];
  const material: Record<string, [string,string]>={
    rigid:['Agree board thickness in mm and wrapping-paper grade separately. Confirm the finished fit after wrapping; a paper weight alone does not define board thickness.', '分别确认板材厚度（mm）和外裱纸规格，裱糊完成后检查成品配合；纸张克重不能直接代替板厚。'],
    carton:['Specify paperboard grade, grammage in g/m² and caliper in mm. Approve crease quality and loaded fit on that stock before locking the cutting layout.', '注明卡纸牌号、克重（g/m²）及厚度（mm），在所选纸材上确认压痕和装载配合后再定刀模。'],
    corrugated:['Agree flute profile, board construction and the strength requirements for the packed load. Provide packed weight, stacking and shipping conditions so the board specification can be reviewed.', '确认楞型、纸板组成及装载强度要求。提供装箱重量、堆码和运输条件，用于审核纸板规格。'],
    bag:['Specify paper grade and grammage in g/m², handle construction and reinforcement. Review carrying with the actual packed weight before agreeing a load requirement.', '注明纸张牌号及克重（g/m²）、提手结构与加强方式。按实际装载重量审核提携表现，再确认承重要求。']
  };
  const fit=p.family==='bag'
    ? ['Provide the complete gift-box or retail-pack size and weight. Confirm base support, handle clearance and how the customer will remove the contents.', '提供完整礼盒或零售包装的尺寸和重量，确认袋底支撑、提手空间及客户取出产品的方式。']
    : ['Provide the number, filled weight and contact-sensitive surfaces of each item. Confirm cavity positions, support points and finger access with the actual contents.', '提供各件产品数量、装填重量及易受接触影响的表面，用实物确认槽位、支撑点和手指取放空间。'];
  const rows=[
    [['Dimensions to confirm','需确认的尺寸'],dimensions],
    [['Material specification','材料规格'],material[p.family]],
    [[p.family==='bag'?'Packed load & access':'Insert fit & access',p.family==='bag'?'装载与取放':'内托配合与取放'],fit],
    [['Artwork & finish approval','图稿与工艺确认'],['Supply editable artwork and mark print, foil, deboss or emboss areas separately. Agree colour references and approve fine lines, folds and finish placement on the selected material.', '提供可编辑图稿，分开标注印刷、烫箔、击凹或击凸位置。确定颜色参考，在所选材料上审核细线、折位和工艺位置。']],
    [['Quantity & delivery scope','数量与交付范围'],['State quantity per design, destination and required arrival date. Confirm minimum order, sample and tooling charges, production timing and freight in the project quotation.', '提供每款数量、目的地和要求到货日期。在项目报价中确认起订量、样品及模具费用、生产周期和运费。']]
  ];
  return <section className="product-specification-brief">
    <h2>{zh?'把选中的款式变成可报价的规格':'Turn this design into a quotable specification'}</h2>
    <p>{zh?'上方为该款式的材料与结构说明。以下资料用于确定你的定制版本；不确定的项目可在询价时一起讨论。':'The details above describe this design. Use the checklist below to define your custom version; undecided items can be discussed when you enquire.'}</p>
    <dl>{rows.map(([label,value])=><div key={label[0]}><dt>{label[i]}</dt><dd>{value[i]}</dd></div>)}</dl>
  </section>;
}
