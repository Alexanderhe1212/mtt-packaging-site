import QuoteForm from '../../../components/QuoteForm';import ZhNav from '../../../components/ZhNav';
import { breadcrumb, organization, siteUrl } from '../../../lib/seo';

const pageTitle = '提交定制包装需求 | MTT Packaging';
const pageDescription = '向 MTT Packaging 提交定制包装询价：提供产品尺寸、数量、盒型、材料工艺和交付地区。支持中文沟通，最低订量为每款 1,000 件，正式报价以规格审核为准。';

export const metadata={
  title:pageTitle,description:pageDescription,
  openGraph: { siteName: 'MTT Packaging', type: 'website', title: pageTitle, description: pageDescription, url: '/zh/request-a-quote', images: [{ url: '/og.jpg?v=gold-triangle', width: 1200, height: 630, alt: 'MTT Packaging custom packaging' }] },
  twitter: { card: 'summary_large_image', title: pageTitle, description: pageDescription, images: ['/og.jpg?v=gold-triangle'] },
  alternates:{canonical:'https://mttpackaging.com/zh/request-a-quote',languages:{en:'/request-a-quote','zh-Hans':'/zh/request-a-quote','x-default':'/request-a-quote'}}};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      name: pageTitle,
      description: pageDescription,
      url: `${siteUrl}/zh/request-a-quote`,
      inLanguage: 'zh-Hans',
    },
    organization,
    breadcrumb([
      ['首页', '/zh'],
      ['提交定制包装需求', '/zh/request-a-quote'],
    ]),
  ],
};

export default function ChineseQuote(){return <main lang="zh-Hans" className="zh-page" id="main-content"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><ZhNav/><h1>告诉我们您的包装需求</h1><p>欢迎用中文填写高端定制包装需求。最低起订量为每款 1,000 件，且每订单产品货值至少 2,000 美元，不含运费、样品费及其他费用。尚未确定的尺寸和工艺请在需求中注明；正式报价需要规格审核。</p><p><a href="https://wa.me/8617207110964" target="_blank" rel="noreferrer">通过 WhatsApp 沟通包装需求</a></p><QuoteForm locale="zh" action="https://formspree.io/f/xyeyzwpw" method="post" className="zh-form"><input type="hidden" name="preferred_language" value="zh-Hans"/><input type="hidden" name="lead_source" value="chinese_quote_page"/>{[['name','您的姓名','text'],['email','电子邮箱','email'],['company','公司或品牌','text'],['country','交付国家或地区','text']].map(([n,l,t])=><label key={n}>{l}{n === 'company' ? '（选填）' : ' *'}<input name={n} type={t} autoComplete={({name:'name',email:'email',company:'organization',country:'country-name'} as Record<string,string>)[n]} required={n !== 'company'} maxLength={150}/></label>)}<label>数量（最低 1,000 件／款，如已确定）<input name="quantity" type="number" min="1000" max="1000000"/></label><label>包装需求 *<textarea name="message" required rows={6} maxLength={6000} placeholder="例如：香水礼盒配纸袋，1,000 套；产品长×宽×高；希望的颜色和工艺；交付时间。"/></label><label>参考图或设计文件链接（选填）<input name="artwork_url" type="url" placeholder="https://…" maxLength={2000}/></label><label>您是如何找到 MTT Packaging 的？（选填）<select name="how_did_you_hear"><option value="">请选择（选填）</option><option value="ChatGPT">ChatGPT</option><option value="Google Search">Google 搜索</option><option value="Bing Search">Bing 搜索</option><option value="Perplexity / Gemini / Claude">Perplexity / Gemini / Claude</option><option value="YouTube">YouTube</option><option value="Referral">朋友或同行推荐</option><option value="Other">其他渠道</option></select></label><p>提交后，MTT 将使用您提供的联系方式沟通本项目。请确保分享的文件链接可以访问。<a href="/privacy-policy">查看隐私政策（英文）</a>。</p><button type="submit" className="button">提交包装需求</button></QuoteForm></main>}
