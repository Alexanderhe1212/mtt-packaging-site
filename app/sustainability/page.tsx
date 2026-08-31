import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";
export const metadata: Metadata = {
  title: "Responsible Custom Packaging | MTT Packaging",
  description:
    "Review documented paper sourcing, right-sizing, paper-based inserts and end-of-life choices for a specific custom packaging project.",
  alternates: { canonical: "/sustainability" },
  openGraph: {
    title: "Responsible Custom Packaging | MTT Packaging",
    description: "Project-specific material documentation and lower-impact packaging directions without unsupported claims.",
    url: "/sustainability",
    images: ["/sustainability/documented-sourcing.webp"],
  },
};
const topics = [
  [
    "01",
    "Documented sourcing",
    "Certified paper and board can be specified when available. Certificate scope and transaction documents are checked per order.",
    "/sustainability/documented-sourcing.webp",
    "Textured paper and board material samples",
  ],
  [
    "02",
    "Material reduction",
    "Right-sizing, board optimization and fewer unnecessary components reduce material before adding complex claims.",
    "/sustainability/material-reduction.webp",
    "Right-sized custom box components arranged for material review",
  ],
  [
    "03",
    "Paper-based options",
    "Paperboard platforms and molded pulp can replace some plastic or foam inserts where protection allows.",
    "/sustainability/paper-based-options.webp",
    "Molded pulp and folded paperboard packaging inserts",
  ],
  [
    "04",
    "Clearer end of life",
    "Magnets, laminations, mixed materials and separability are reviewed against the finished pack.",
    "/sustainability/clearer-end-of-life.webp",
    "Mono-material paper box with separable paper components",
  ],
];
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage", "@id": `${siteUrl}/sustainability#page`,
      name: "Responsible Custom Packaging", url: `${siteUrl}/sustainability`,
      description: "Project-specific sourcing, material reduction, paper-based options and end-of-life review.",
      about: topics.map(([, name, description]) => ({ "@type": "Thing", name, description })),
    },
    organization,
    breadcrumb([["Home", "/"], ["Sustainability", "/sustainability"]]),
  ],
};
export default function SustainabilityPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <section className="sustainability standalone">
        <div className="sustainability-head">
          <p className="section-kicker">Responsible packaging</p>
          <h1>
            Make the environmental claim
            <br />
            <i>as considered as the box.</i>
          </h1>
          <p>
            We help buyers reduce unnecessary material, compare paper-based
            alternatives and request project-specific documentation.
          </p>
        </div>
        <div className="sustainability-grid">
          {topics.map(([n, t, c, image, alt]) => (
            <article key={n}>
              <span>{n}</span>
              <img src={image} alt={alt} width="700" height="700" loading="lazy" />
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
        <div className="cert-note">
          <b>Certification statement</b>
          <p>
            MTT Packaging can support projects requiring verified certified
            materials. The applicable certificate and scope are confirmed before
            production and before any certification mark is used.
          </p>
          <a href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%27d%20like%20to%20discuss%20sustainable%20packaging%20options." target="_blank" rel="noreferrer">Ask for documentation →</a>
          <p style={{ marginTop: "16px", fontSize: "13px", color: "#6b746d" }}>
            Shipping to the EU? See our{" "}
            <a href="/ppwr-compliant-packaging" style={{ fontWeight: 700, color: "#172019", textDecoration: "underline" }}>
              PPWR-ready packaging support
            </a>
            {" "}for EU market requirements.
          </p>
        </div>
      </section>
      <aside className="page-cta">
        <p>Ready to start?</p>
        <h2>Discuss sustainable packaging options for your product.</h2>
        <a className="button" href="/request-a-quote">
          Request a Quote →
        </a>
      </aside>
      <SiteFooter />
    </main>
  );
}
