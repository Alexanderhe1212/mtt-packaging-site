import type { Metadata } from 'next';
import { getIndustry, industries } from '../../../lib/industries';

export function generateStaticParams() { return industries.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getIndustry((await params).slug);
  if (!item) return {};
  return { title: `${item.eyebrow} Packaging | MTT Packaging`, description: item.summary, alternates: { canonical: `/industries/${item.slug}` }, openGraph: { title: `${item.eyebrow} Packaging | MTT Packaging`, description: item.summary, url: `/industries/${item.slug}`, type: 'website' } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getIndustry((await params).slug);
  if (!item) return <main className="article"><p>Industry page not found.</p><a href="/">Return to MTT Packaging</a></main>;
  const data = { '@context': 'https://schema.org', '@graph': [{ '@type': 'Service', name: `Custom ${item.eyebrow} Packaging`, description: item.summary, provider: { '@type': 'Organization', name: 'MTT Packaging', url: 'https://mttpackaging.com' }, areaServed: 'Worldwide', url: `https://mttpackaging.com/industries/${item.slug}` }, { '@type': 'FAQPage', mainEntity: item.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] };
  return <main className="industry-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    <nav><a className="brand" href="/"><span>MTT</span> MTT Packaging</a><a href="/#contact">Discuss a project →</a></nav>
    <header><p>{item.eyebrow} packaging</p><h1>{item.title}</h1><p>{item.summary}</p><div className="tag-row">{item.products.map((p) => <span key={p}>{p}</span>)}</div></header>
    <section className="industry-section"><div><p className="section-kicker">Structure directions</p><h2>Match the box to the product and the experience.</h2></div><div className="structure-list">{item.structures.map(([title, copy], i) => <article key={title}><b>0{i + 1}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="industry-priorities"><div><p className="section-kicker light">Engineering priorities</p><h2>Premium presentation must still perform.</h2></div><div>{item.priorities.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="brief-list"><div><p className="section-kicker">A useful first brief</p><h2>Send these details for a focused review.</h2></div><ol>{item.brief.map((line, i) => <li key={line}><b>0{i + 1}</b>{line}</li>)}</ol></section>
    <section className="industry-faq"><div><p className="section-kicker">Specific questions</p><h2>What buyers usually need to confirm.</h2></div><div>{item.faq.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    <aside><p>Custom project · MTT Packaging</p><h2>Share the product size, quantity and presentation target with Hugo.</h2><a className="button" href="/#contact">Start your project <span>↗</span></a></aside>
    <footer><p>MTT Packaging · High-End Custom Packaging</p><a href="/">Back to homepage</a></footer>
  </main>;
}
