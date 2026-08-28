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
    images: ["/hero/packaging-insights.webp"],
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
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <div>
          <p>Packaging knowledge</p>
          <h1>Better inputs lead to a better box.</h1>
          <p>
            Practical guidance for buyers before sampling, specification and
            quotation.
          </p>
        </div>
        <img
          src="/hero/packaging-insights.webp"
          alt="Packaging research desk with box, insert, paper and finish samples"
          width="900"
          height="900"
        />
      </header>
      <section className="insights standalone-insights">
        <div className="insight-grid">
          {articles.map((a) => (
            <article key={a.slug}>
              <span>
                {a.number} / {a.angle}
              </span>
              <img src={a.image} alt={a.imageAlt} width="800" height="500" />
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
              <a href={`/insights/${a.slug}`}>Read the guide →</a>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
