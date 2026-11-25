import CatalogueStructuredData from '../../../components/CatalogueStructuredData';
import PackagingFamilyComparison from '../../../components/PackagingFamilyComparison';
import ZhNav from '../../../components/ZhNav';
import ProductCatalogue from '../../../components/ProductCatalogue';
export const metadata={
  openGraph: { siteName: 'MTT Packaging', type: 'website', url: '/zh/products', images: [{ url: '/og.jpg?v=gold-triangle', width: 1200, height: 630, alt: 'MTT Packaging custom packaging' }] },title:'定制包装产品目录 | 精品盒、卡纸盒、瓦楞盒与纸袋 | MTT Packaging',description:'按行业与结构筛选香水、美妆、珠宝、茶饮与礼赠定制包装，浏览 280+ 盒型结构、内托方案与多角度细节，支持每款 1,000 件起订。',alternates:{canonical:'/zh/products',languages:{en:'/products','zh-Hans':'/zh/products'}}};
export default function Products(){return <main id="main-content" lang="zh-Hans" className="catalogue-shell"><ZhNav/><header><p className="section-kicker">围绕产品，定制包装</p><h1>寻找适合您的包装。</h1><p>按行业和结构探索 精品盒、卡纸盒、瓦楞盒与纸袋，比较细节，再提交您选择的产品获取定制报价。</p></header><CatalogueStructuredData zh/><ProductCatalogue zh/><PackagingFamilyComparison zh/></main>}
