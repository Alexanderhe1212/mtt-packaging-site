import type { Metadata } from "next";
import { articles, getArticle } from "../../../lib/articles";
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
    title: `${article.title} | MTT Packaging`,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      url: `/insights/${article.slug}`,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.summary, images: [article.image] },
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
      <main className="article-page">
        <p>Article not found.</p>
        <a href="/">Return to MTT Packaging</a>
      </main>
    );
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const articleData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.summary,
        image: `${siteUrl}${article.image}`,
        author: { "@type": "Person", name: "Hugo He", jobTitle: "Custom Packaging Consultant" },
        publisher: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
      },
      organization,
      breadcrumb([["Home", "/"], ["Insights", "/insights"], [article.title, `/insights/${article.slug}`]]),
      ...(article.faq ? [{
        "@type": "FAQPage",
        mainEntity: article.faq.map(([q, a]: [string, string]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }] : []),
    ],
  };
  return (
    <main className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      <nav>
        <a className="brand" href="/">
          <span>MTT</span> MTT Packaging
        </a>
        <a href={`https://wa.me/8617207110964?text=${encodeURIComponent("Hi Hugo! I'm interested in custom packaging for my brand.")}`} target="_blank" rel="noreferrer">Request a quote →</a>
      </nav>
      <a className="floating-whatsapp" href={`https://wa.me/8617207110964?text=${encodeURIComponent(`Hi Hugo! I just read your article about ${article.title}. I'd like to discuss a packaging project.`)}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
      <header>
        <p>
          {article.number} / {article.angle}
        </p>
        <h1>{article.title}</h1>
        <p>{article.intro}</p>
        <p>Written and reviewed by Hugo He · Custom packaging consultant at MTT Packaging</p>
      </header>
      <div className="article-body">
        {article.sections.map(([title, copy], index) => (
          <section key={title}>
            <b>0{index + 1}</b>
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </section>
        ))}
      </div>
      {related.length > 0 && (
        <div className="article-related">
          <p className="section-kicker">Related articles</p>
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
        <p>Planning a custom packaging project?</p>
        <h2>
          Share the product size, quantity and presentation target with Hugo.
        </h2>
        <a className="button" href={`https://wa.me/8617207110964?text=${encodeURIComponent(`Hi Hugo! I just read your article about ${article.title}. I'd like to discuss a packaging project.`)}`} target="_blank" rel="noreferrer">
          WhatsApp Hugo ↗
        </a>
        <p style={{ marginTop: '12px', fontSize: '12px', color: '#8a9a8d' }}>Message Hugo on WhatsApp for a quick response about your project.</p>
      </aside>
      <footer>
        <p>MTT Packaging · High-End Custom Packaging</p>
        <a href="/">Back to homepage</a>
      </footer>
    </main>
  );
}
