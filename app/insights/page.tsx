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
      <section style={{ padding: "120px 5vw" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", borderTop: "1px solid rgba(23,32,25,.17)", borderLeft: "1px solid rgba(23,32,25,.17)" }}>
          {articles.map((a) => (
            <div key={a.slug} style={{ minHeight: "540px", padding: "36px", borderRight: "1px solid rgba(23,32,25,.17)", borderBottom: "1px solid rgba(23,32,25,.17)", display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase", color: "#647067" }}>
                {a.number} / {a.angle}
              </span>
              <img src={a.image} alt={a.imageAlt} width="800" height="500" loading="lazy" style={{ width: "100%", aspectRatio: "1.9", objectFit: "cover", borderRadius: "6px", margin: "24px 0 0" }} />
              <h3 style={{ font: "600 30px/1.12 Arial,Helvetica,sans-serif", letterSpacing: "-.025em", margin: "28px 0 16px" }}>{a.title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#687269", maxWidth: "580px" }}>{a.summary}</p>
              <a href={`/insights/${a.slug}`} style={{ marginTop: "auto", fontSize: "12px", fontWeight: 700 }}>Read the guide →</a>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
