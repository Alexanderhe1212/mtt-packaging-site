import type { Metadata } from 'next';
import { SiteNav, SiteFooter } from '../../components/SiteNav';
import { customerProblemArticles } from '../../lib/customer-problem-articles';
import { breadcrumb, siteUrl } from '../../lib/seo';
const cases = customerProblemArticles.filter(a => a.angle === 'Case Study');
export const metadata: Metadata = {
  title: 'Packaging Case Studies | MTT Packaging',
  description: 'Browse MTT packaging case studies: handmade glass insert planning and fold-flat triangular packaging. Explore the challenge, structural direction and review requirements.',
  alternates: { canonical: '/case-studies' },
};
export default function CaseStudiesPage() {
  return <main id="main-content"><SiteNav />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'CollectionPage',name:'Packaging Case Studies',url:`${siteUrl}/case-studies`,hasPart:cases.map(a=>({'@type':'Article',headline:a.title,url:`${siteUrl}/insights/${a.slug}`}))},breadcrumb([['Home','/'],['Case Studies','/case-studies']])]})}}/>
    <header className="case-heading"><p className="section-kicker">Case studies</p><h1>Explore our packaging case directory.</h1><p>See how product needs shape the structure, insert and packing approach. Choose a case to explore the challenge and proposed direction.</p></header>
    <section className="case-directory" aria-label="Packaging case directory">{cases.map((a,i)=><article key={a.slug}>
      <a href={`/insights/${a.slug}`} aria-label={`Read case study: ${a.title}`}><img src={a.image} alt={a.imageAlt} width="900" height="600" loading="lazy" /></a>
      <div className="case-copy"><p className="section-kicker">0{i+1} · {i===0?'Product protection':'Structure & freight'}</p><h2><a href={`/insights/${a.slug}`}>{a.title}</a></h2><p>{a.summary}</p><p className="case-stage">Anonymized project discussion · Concept illustration</p><a className="case-link" href={`/insights/${a.slug}`}>Explore this case →</a></div>
    </article>)}</section>
    <section className="case-heading"><h2>Planning something similar?</h2><p>Share your product, dimensions, quantity and reference images. We can review a packaging direction for your project.</p><a className="button" href="/request-a-quote">Discuss your packaging project →</a></section><SiteFooter />
  </main>;
}
