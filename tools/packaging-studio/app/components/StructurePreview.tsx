import {tr} from '../lib/tool-language.mjs';
"use client";
import { useMemo,useState } from "react";
import { bomRows,dielineSvg } from "../lib/visuals.mjs";
import { buildBox } from "../lib/packaging.mjs";
import FoldingPreview from "./FoldingPreview";
import GiftBoxPreview, {type GiftOptions} from "./GiftBoxPreview";

type BoxData=ReturnType<typeof buildBox>;
type Artwork={id:string;kind:string;face:string;text?:string;src?:string;x:number;y:number;size:number;color:string};
type BomRow={no:number;name:string;material:string;size:string;areaM2:number;notes:string};
export default function StructurePreview({box,artworks=[],visualOptions,onVisualChange,startIn3d=false}:{startIn3d?:boolean;box:BoxData;artworks?:Artwork[];visualOptions?:GiftOptions;onVisualChange?:(value:GiftOptions)=>void}){
  const [zoom,setZoom]=useState(100);
  const [view,setView]=useState<"2d"|"fold"|"3d"|"bom">(startIn3d||box.id==="tianlide"?"3d":"2d");const svg=useMemo(()=>dielineSvg(box,artworks),[box,artworks]);const bom=useMemo(()=>bomRows(box) as BomRow[],[box]);
  function exportDieline(){const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download=`MTT-${box.id}-${box.dimensions.length}x${box.dimensions.width}x${box.dimensions.height}mm-structural-reference.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
  return <section className="preview-card"><div className="preview-toolbar"><div><strong>{tr("Structure preview")}</strong><small>{tr("Updates with your dimensions")}</small></div><div className="view-tabs" aria-label="Preview mode"><button aria-pressed={view==="2d"} className={view==="2d"?"selected":""} onClick={()=>setView("2d")}>{tr("Flat layout")}</button><button aria-pressed={view==="fold"} className={view==="fold"?"selected":""} onClick={()=>setView("fold")}>{tr("Folding preview")}</button><button aria-pressed={view==="3d"} className={view==="3d"?"selected":""} onClick={()=>setView("3d")}>{tr("Finished 3D")}</button><button aria-pressed={view==="bom"} className={view==="bom"?"selected":""} onClick={()=>setView("bom")}>{tr("Materials")}</button></div></div>
    <div style={{padding:"12px 18px",display:"flex",flexWrap:"wrap",gap:12,alignItems:"center",borderBottom:"1px solid #d6dfd7"}}><span>{tr("内尺寸 / Internal L × W × H:")}<strong>{box.dimensions.length} × {box.dimensions.width} × {box.dimensions.height} mm</strong></span>{view==="2d"&&<><button type="button" aria-label="Zoom out" disabled={zoom<=50} onClick={()=>setZoom(Math.max(50,zoom-25))}>−</button><span>{zoom}%</span><button type="button" aria-label="Zoom in" disabled={zoom>=200} onClick={()=>setZoom(Math.min(200,zoom+25))}>＋</button></>}<button type="button" onClick={exportDieline}>{tr("Download dimensioned SVG")}</button><small style={{flexBasis:"100%"}}>{tr("Face width × height and overall component dimensions are shown. Structural reference only—not a production dieline. Bleed, glue areas and tolerances require engineering review.")}</small></div>
    {view==="2d"&&<div className="dieline-wrap dimension-preview"><div style={{width:`${zoom}%`,minWidth:520}} dangerouslySetInnerHTML={{__html:svg}}/></div>}
    {view==="fold"&&<FoldingPreview key={box.id} box={box} artworks={artworks} visualOptions={visualOptions}/>}
    {view==="3d"&&<GiftBoxPreview studioStage key={box.id} type={box.id} dimensions={box.dimensions} artworks={artworks} options={visualOptions} onChange={onVisualChange}/> }
    {view==="bom"&&<div className="bom-wrap"><table><thead><tr><th>{tr("部件")}</th><th>{tr("材料建议")}</th><th>{tr("展开范围")}</th><th>{tr("净面积")}</th><th>{tr("说明")}</th></tr></thead><tbody>{bom.map(row=><tr key={row.no}><td>{row.name}</td><td>{row.material}</td><td>{row.size}</td><td>{row.areaM2} ㎡</td><td>{row.notes}</td></tr>)}</tbody></table><p>{tr("净面积用于初步报价；正式排版还需加入纸纹、出血、咬口和设备损耗。")}</p></div>}
  </section>
}
