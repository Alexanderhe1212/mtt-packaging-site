import {knowledgeTopics} from '../../lib/knowledge-taxonomy';
import {caseStages} from '../../lib/case-stages';
import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { articles } from "../../lib/articles";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";
export const metadata: Metadata = {
  title: "Custom Packaging Guides | MTT Packaging",
  description:
    "Buyer-focused guides to custom box structures, packaging materials, printing finishes and protective inserts.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Custom Packaging Guides | MTT Packaging",
    description: "Practical packaging guidance before sampling, specification and quotation.",
    url: "/insights",
    images: ["/design/rigid-editorial.webp"],
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage", "@id": `${siteUrl}/insights#page`,
      name: "Custom Packaging Guides", url: `${siteUrl}/insights`,
      hasPart: articles.map(({ slug, title, summary }) => ({ "@type": "Article", headline: title, description: summary, url: `${siteUrl}/insights/${slug}` })),
    },
    organization,
    breadcrumb([["Home", "/"], ["Insights", "/insights"]]),
  ],
};
export default function InsightsPage() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <div>
          <p>Packaging knowledge</p>
          <h1>Packaging knowledge, from product selection to repeat orders.</h1>
          <p>
            Explore five connected topics: product families, structures, industry applications, materials and finishes, and procurement. Start with a decision, then follow the relevant guide to samples and specifications.
          </p>
        </div>
        <img
          src="/design/hero-editorial.webp"
          alt="Rigid presentation box design reference with a lifted lid"
          width="1800"
          height="1200"
        />
      </header>
      <section className="guide-question-hub" aria-label="Find a packaging buying guide"><h2>What do you need to decide?</h2><p>Start with your buying question. Each guide explains the options, what to confirm and what to send for a specification review.</p><div>{[
        ['Which packaging structure fits my product?','Compare rigid boxes, folding cartons and corrugated packaging before choosing finishes.','rigid-box-vs-folding-carton'],
        ['How do I protect a glass bottle inside the box?','Review bottle orientation, insert support and removal access with the actual product.','perfume-box-inserts'],
        ['How can I reduce packaging costs?','Identify specification, quantity and packing choices to discuss before compromising presentation.','reduce-custom-packaging-costs'],
        ['How do I coordinate a box and matching bag?','Plan bag dimensions from the finished outer box and review the complete loaded set.','perfume-box-and-bag-packaging'],
        ['What should I approve in a packaging sample?','Review fit, opening, artwork and finishes before confirming production.','custom-packaging-sampling-process'],
        ['What information is needed for a quote?','Prepare product measurements, quantity, destination, references and an achievable delivery requirement.','how-to-write-a-packaging-brief']
      ].map(([question,answer,slug])=><article key={slug}><h3><a href={'/insights/'+slug}>{question}</a></h3><p>{answer}</p></article>)}</div></section>
      <nav className="knowledge-jump" aria-label="Packaging knowledge topics">
        <h2>Browse the knowledge library</h2>
        <p>{articles.length} guides, organized by the decision you need to make.</p>
        <div>{knowledgeTopics.map((topic,index)=><a key={topic.id} href={'#'+topic.id}><span>0{index+1}</span><strong>{topic.title}</strong><small>{topic.slugs.length} guides ↓</small></a>)}</div>
      </nav>
      {knowledgeTopics.map((topic,index)=><section className="guide-article-section knowledge-topic" id={topic.id} key={topic.id} aria-labelledby={topic.id+'-title'}>
        <div className="knowledge-topic-heading"><p>0{index+1} / Knowledge library</p><h2 id={topic.id+'-title'}>{topic.title}</h2><p>{topic.description}</p></div>
        <div className="guide-article-grid">
          {topic.slugs.map(slug=>articles.find(a=>a.slug===slug)).filter((a): a is typeof articles[number]=>Boolean(a)).map(a=><article key={a.slug} className="knowledge-guide-card">
            <a href={'/insights/'+a.slug} className="knowledge-image-link" tabIndex={-1} aria-hidden="true"><img src={caseStages[a.slug]?.image || a.image} alt={a.imageAlt} width="800" height="500" loading="lazy" /></a>
            <span className="knowledge-guide-angle">{a.angle}</span>
            <h3><a href={'/insights/'+a.slug}>{a.title}</a></h3>
            <p>{a.summary}</p>
            <a className="knowledge-read" href={'/insights/'+a.slug} aria-label={'Read '+a.title}>Read the guide →</a>
          </article>)}
        </div>
      </section>)}
      <SiteFooter />
    </main>
  );
}
