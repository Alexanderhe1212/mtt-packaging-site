import type { Metadata } from 'next';
import { articles, getArticle } from '../../../lib/articles';

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: `${article.title} | MTT Packaging`, description: article.summary, alternates: { canonical: `/insights/${article.slug}` }, openGraph: { title: article.title, description: article.summary, type: 'article', url: `/insights/${article.slug}` } };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) return <main className="article"><p>Article not found.</p><a href="/">Return to MTT Packaging</a></main>;
  const articleData = { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.summary, author: { '@type': 'Person', name: 'Hugo He' }, publisher: { '@type': 'Organization', name: 'MTT Packaging' }, mainEntityOfPage: `https://mttpackaging.com/insights/${article.slug}` };
  return <main className="article"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} /><nav><a className="brand" href="/"><span>MTT</span> MTT Packaging</a><a href="/#contact">Request a quote →</a></nav><header><p>{article.number} / {article.angle}</p><h1>{article.title}</h1><p>{article.intro}</p></header><div className="article-body">{article.sections.map(([title, copy], index) => <section key={title}><b>0{index + 1}</b><div><h2>{title}</h2><p>{copy}</p></div></section>)}</div><aside><p>Planning a custom packaging project?</p><h2>Share the product size, quantity and presentation target with Hugo.</h2><a className="button" href="/#contact">Start your project <span>↗</span></a></aside><footer><p>MTT Packaging · High-End Custom Packaging</p><a href="/">Back to homepage</a></footer></main>;
}
