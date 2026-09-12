import {notFound} from 'next/navigation';
import {products,productBySlug} from '../../../lib/products';
import {SiteNav,SiteFooter} from '../../../components/SiteNav';
import ProductDetail from '../../../components/ProductDetail';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const p=productBySlug((await params).slug);return p?{title:p.seoTitle,description:p.seoDescription,alternates:{canonical:`/products/${p.slug}`,languages:{en:`/products/${p.slug}`,'zh-Hans':`/zh/products/${p.slug}`}},openGraph:{images:[p.image.replace(".webp","-0.webp")]}}:{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const p=productBySlug((await params).slug);if(!p)notFound();return <main id="main-content"><SiteNav/><div className="catalogue-shell"><a href="/products">← All products</a><ProductDetail p={p}/></div><SiteFooter/></main>}
