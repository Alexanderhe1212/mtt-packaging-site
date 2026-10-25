import {lazy,Suspense,useState} from 'react';
import LazyBoundary from './LazyBoundary';
const DynamicBoxThumbnail=lazy(()=>import('./DynamicBoxThumbnail'));
const NAMES:Record<string,string>={tianlide:'Lift-off lid box',drawer:'Drawer box',flip:'Hinged lid box',book:'Book-style box',foldable_flip:'Fold-flat hinged box',window_flip:'Window hinged box',double_door:'Double-door box',shoulder:'Shoulder box',airplane:'Mailer box',rsc:'Shipping carton',tuck:'Tuck-end carton',paperbag:'Paper shopping bag'};
export type ThumbnailProps={type:string;decorative?:boolean;dimensions?:{length:number;width:number;height:number};options?:{paperColor:string;surface:string;opening:number}};
export default function BoxThumbnail(props:ThumbnailProps){
 const [failed,setFailed]=useState(false);
 const label=NAMES[props.type];
 const className=`box-thumb box-illustration box-thumb-${props.type}`;
 const style={aspectRatio:'36 / 25',overflow:'hidden',background:'#f4f1ea',borderRadius:12};
 if(props.dimensions||props.options||failed)return <LazyBoundary fallback={<div className={className} style={style}><p>Preview unavailable — {label}</p></div>}><Suspense fallback={<div className={className} style={style}><p>Loading preview — {label}</p></div>}><DynamicBoxThumbnail {...props} label={label}/></Suspense></LazyBoundary>;
 return <div className={className} style={style}><img src={`/images/studio-structures/${props.type}.webp`} loading="lazy" alt={props.decorative?'':`${label} — illustrative assembled structure`} onError={()=>setFailed(true)} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div>;
}
