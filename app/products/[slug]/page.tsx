import {notFound} from 'next/navigation';
import {products,productBySlug} from '../../../lib/products';
import {SiteNav,SiteFooter} from '../../../components/SiteNav';
import ProductDetail from '../../../components/ProductDetail';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const p=productBySlug((await params).slug);if(!p)return {};
 const title=p.seoTitle,description=p.seoDescription,url=`/products/${p.slug}`;
 return {title,description,alternates:{canonical:url,languages:{en:`/products/${p.slug}`,'zh-Hans':`/zh/products/${p.slug}`}},openGraph:{title,description,url,type:'website',images:[{url:p.image.replace('.webp','-0.webp'),alt:p.name}]}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){const p=productBySlug((await params).slug);if(!p)notFound();return <main id="main-content"><SiteNav/><div className="catalogue-shell"><a href="/products">← All products</a><ProductDetail p={p}/></div><SiteFooter/></main>}
