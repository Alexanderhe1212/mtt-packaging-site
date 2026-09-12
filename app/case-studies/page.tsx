import {caseStages} from '../../lib/case-stages';
import { designCaseArticles } from '../../lib/design-case-articles';
import type { Metadata } from 'next';
import { SiteNav, SiteFooter } from '../../components/SiteNav';
import { customerProblemArticles } from '../../lib/customer-problem-articles';
import { breadcrumb, siteUrl } from '../../lib/seo';
const cases = [...customerProblemArticles.filter(a => a.angle === 'Case Study'), ...designCaseArticles];
export const metadata: Metadata = {
  title: 'Packaging Case Studies | MTT Packaging',
  description: 'Explore ten packaging case studies and independent design analyses covering fragrance, skincare, jewelry, inserts, cartons and gift packaging.',
  alternates: { canonical: '/case-studies' },
};
export default function CaseStudiesPage() {
  return <main id="main-content"><SiteNav />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'CollectionPage',name:'Packaging Case Studies',url:`${siteUrl}/case-studies`,hasPart:cases.map(a=>({'@type':'Article',headline:a.title,url:`${siteUrl}/insights/${a.slug}`}))},breadcrumb([['Home','/'],['Case Studies','/case-studies']])]})}}/>
    <header className="case-heading"><p className="section-kicker">Case studies</p><h1>Explore our packaging case directory.</h1><p>Explore 10 packaging studies: two anonymized project discussions and eight independent design analyses based on credited industry references. Concept images illustrate the topic; they are not photographs of the referenced projects.</p></header>
    <section className="case-directory" aria-label="Packaging case directory">{cases.map((a,i)=><article key={a.slug}>
      <a href={`/insights/${a.slug}`} aria-label={`Read case study: ${a.title}`}><img src={caseStages[a.slug]?.image || a.image} alt={`Four-stage concept storyboard: ${a.title}`} width="1600" height="1600" loading="lazy" /></a>
      <div className="case-copy"><p className="section-kicker">{String(i+1).padStart(2,'0')} · {a.angle}</p><h2><a href={`/insights/${a.slug}`}>{a.title}</a></h2><p>{a.summary}</p><p className="case-stage">{a.angle === 'Design Analysis' ? 'Independent design analysis · Sources included' : 'Anonymized project discussion'} · Concept illustration</p><a className="case-link" href={`/insights/${a.slug}`}>Explore the four stages →</a></div>
    </article>)}</section>
    <section className="case-heading"><h2>Planning something similar?</h2><p>Share your product, dimensions, quantity and reference images. We can review a packaging direction for your project.</p><a className="button" href="/request-a-quote">Discuss your packaging project →</a></section><SiteFooter />
  </main>;
}
