import {notFound} from 'next/navigation';
import {products,productBySlug} from '../../../../lib/products';
import ZhNav from '../../../../components/ZhNav';
import ProductDetail from '../../../../components/ProductDetail';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const p=productBySlug((await params).slug);return p?{title:`定制${p.nameZh} | ${p.code} | MTT Packaging`,description:p.descriptionZh,alternates:{canonical:`/zh/products/${p.slug}`,languages:{en:`/products/${p.slug}`,'zh-Hans':`/zh/products/${p.slug}`}}}:{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const p=productBySlug((await params).slug);if(!p)notFound();return <main id="main-content" lang="zh-Hans" className="catalogue-shell"><ZhNav/><a href="/zh/products">← 全部产品</a><ProductDetail p={p} zh/></main>}
