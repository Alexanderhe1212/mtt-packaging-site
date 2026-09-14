import {articleNavigation} from '../../../lib/article-navigation';
import CaseStages from '../../../components/CaseStages';
import {caseStages} from '../../../lib/case-stages';
import { SiteNav, SiteFooter } from '../../../components/SiteNav';
import type { Metadata } from "next";
import { articles, getArticle } from "../../../lib/articles";
import { customerProblemArticles } from "../../../lib/customer-problem-articles";
import { breadcrumb, organization, siteUrl } from "../../../lib/seo";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    title: (article as any).seoTitle || `${article.title} | MTT Packaging`,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      url: `/insights/${article.slug}`,
      images: [{ url: caseStages[article.slug]?.image || article.image, alt: caseStages[article.slug] ? `Four-stage packaging concept: ${article.title}` : article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.summary, images: [caseStages[article.slug]?.image || article.image] },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getArticle((await params).slug);
  if (!article)
    return (
      <main id="main-content" className="article-page">
        <p>Article not found.</p>
        <a href="/">Return to MTT Packaging</a>
      </main>
    );
  const {related, designs} = articleNavigation(article.slug);
  const isProblemArticle = article.angle === "Design Analysis" || customerProblemArticles.some((a) => a.slug === article.slug);
  const articleData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.summary,
        image: `${siteUrl}${caseStages[article.slug]?.image || article.image}`,
        author: { "@type": "Person", name: "Hugo He", url: `${siteUrl}/about`, jobTitle: "Custom Packaging Consultant" },
        publisher: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
      },
      organization,
      breadcrumb([["Home", "/"], ["Insights", "/insights"], [article.title, `/insights/${article.slug}`]]),
      ...("faq" in article && article.faq ? [{
        "@type": "FAQPage",
        mainEntity: article.faq.map(([q, a]: readonly [string, string]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }] : []),
    ],
  };
  return (
    <main id="main-content" className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      <SiteNav />{["Case Study","Design Analysis"].includes(article.angle) && <p style={{padding:"20px 5vw"}}><a href="/case-studies">← All case studies</a></p>}
      <header>
        <p>
          {article.number} / {article.angle}
        </p>
        <h1>{article.title}</h1>
        <p>{article.intro}</p>
        <p>{article.angle === "Design Analysis" ? <>MTT Packaging editorial · Packaging design analysis · References and specifications below</> : <>Written and reviewed by <a href="/about">Hugo He</a> · Custom packaging consultant at MTT Packaging</>}</p>
        {isProblemArticle && !caseStages[article.slug] && (
          <figure style={{ margin: "32px 0 0" }}>
            <img src={article.image} alt={article.imageAlt} width="900" height="600" style={{ width: "100%", maxHeight: "480px", objectFit: "contain" }} />
            <figcaption>Packaging design reference. Final fit, materials and finish are confirmed on an approved sample.</figcaption>
          </figure>
        )}
      </header>
      <div className="article-decisions">
        <p className="section-kicker">At a glance</p><p>{article.summary}</p>
        <details className="article-contents"><summary>In this guide · {article.sections.length} sections</summary>
          <ol>{article.sections.map(([title],index)=><li key={title}><a href={`#guide-section-${index+1}`}>{title}</a></li>)}</ol>
          <a href="#guide-designs">Compare packaging designs →</a>
        </details>
      </div>
      <CaseStages slug={article.slug}/><div className="article-body">
        {article.sections.map(([title, copy], index) => (
          <section key={title} id={`guide-section-${index+1}`} tabIndex={-1}>
            <b>0{index + 1}</b>
            <div>
              <h2>{title}</h2>
              <div dangerouslySetInnerHTML={{ __html: copy }} />
            </div>
          </section>
        ))}
      </div>
      {"faq" in article && article.faq && <section className="article-body" aria-label="Buyer questions">{article.faq.map(([question,answer])=><section key={question}><div><h2>{question}</h2><p>{answer}</p></div></section>)}</section>}
      {designs.length > 0 && <section id="guide-designs" className="article-designs" aria-labelledby="guide-designs-title">
        <p className="section-kicker">From guide to product</p><h2 id="guide-designs-title">Compare packaging for your brief</h2>
        <p>Explore the opening, material and insert details for each design. These are options to review, not proof of a tested fit for your product.</p>
        <div className="article-design-grid">{designs.map(p=><article key={p.code}>
          <a href={'/products/'+p.slug}><img src={p.image.replace('.webp','-0.webp')} width="320" height="240" loading="lazy" alt=""/><h3>{p.name}</h3></a>
          <p><strong>{p.familyName}</strong> · {p.structureName}</p><p>{p.wrap}</p><a href={'/products/'+p.slug}>View structure &amp; details →</a>
        </article>)}</div>
        <p>Have a different product? Send its dimensions, weight, quantity and destination. We can review the packaging direction before you choose a design.</p>
        <a className="button" href="/request-a-quote">Discuss my packaging requirements →</a>
      </section>}
      {related.length > 0 && (
        <div className="article-related">
          <h2>Continue with a related buying question</h2>
          <div className="article-related-grid">
            {related.map((r) => (
              <a href={`/insights/${r.slug}`} key={r.slug}>
                <span>{r.number} / {r.angle}</span>
                <h3>{r.title}</h3>
                <p>{r.summary}</p>
              </a>
            ))}
          </div>
        </div>
      )}
      <aside>
        {isProblemArticle ? (
          <>
            <p>Planning a custom packaging project?</p>
            <h2>Send Your Packaging Brief</h2>
            <p>Share product photos, dimensions, quantity and packaging requirements for a focused review.</p>
            <a className="button" href="/request-a-quote">Send Your Packaging Brief →</a>
          </>
        ) : (
          <>
        <p>Planning a custom packaging project?</p>
        <h2>
          Share the product size, quantity and presentation target with Hugo.
        </h2>
        <a className="button" href={`https://wa.me/8617207110964?text=${encodeURIComponent(`Hi Hugo! I just read your article about ${article.title}. I'd like to discuss a packaging project.`)}`} target="_blank" rel="noreferrer">
          WhatsApp Hugo ↗
        </a>
        <p style={{ marginTop: '12px', fontSize: '12px', color: '#cbd7ce' }}>Message Hugo on WhatsApp for a quick response about your project.</p>
          </>
        )}
      </aside>
      <SiteFooter />
    </main>
  );
}
