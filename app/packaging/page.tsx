import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { industries } from "../../lib/industries";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";
import { solutions } from "../../lib/solutions";

export const metadata: Metadata = {
  title: "Custom Packaging | Rigid Boxes, Folding Cartons, Paper Bags | MTT Packaging",
  description:
    "Custom packaging solutions from MTT Packaging: rigid boxes, folding cartons, paper bags and precision inserts. MOQ from 500 pcs. Sampling before production.",
  alternates: { canonical: "/packaging" },
  openGraph: {
    title: "Custom Packaging Solutions | MTT Packaging",
    description:
      "Rigid boxes, folding cartons, paper bags and custom inserts for premium brands. MOQ from 500 pcs.",
    url: "/packaging",
    images: ["/hero/packaging-systems.webp"],
  },
};

const faqs = [
  ["What types of custom packaging do you offer?", "MTT Packaging produces custom rigid boxes (magnetic, lift-off lid, drawer, shoulder-neck), premium folding cartons, bespoke paper bags and precision inserts in paper, molded pulp, EVA and fabric-covered materials."],
  ["What is the minimum order quantity?", "Most custom packaging projects start from 500–1,000 pieces per design. The practical MOQ depends on the structure, materials, finishes and production method."],
  ["Can I get a sample before placing an order?", "Yes. Physical sampling is recommended before mass production. A structural or printed sample is produced for your approval. Sampling cost depends on the structure and finishes."],
  ["What information do I need to provide for a quote?", "Provide finished internal dimensions (L × W × H), product weight, desired structure, quantity, finish preferences, insert material, delivery country and target budget range."],
  ["Do you ship internationally?", "Yes. Export packing and shipping terms are planned for the destination. Freight is confirmed from the final carton count, CBM, weight and agreed trade terms."],
];

const productLinks = [
  { slug: "custom-rigid-boxes", title: "Custom Rigid Boxes", desc: "Magnetic, lift-off lid, drawer and shoulder-neck structures for premium presentation." },
  { slug: "folding-cartons", title: "Folding Cartons", desc: "High-detail paperboard cartons with specialty finishes for retail and e-commerce." },
  { slug: "custom-paper-bags", title: "Custom Paper Bags", desc: "Brand-matched luxury bags with reinforced construction and custom handles." },
  { slug: "custom-inserts", title: "Custom Inserts", desc: "Paper, molded pulp, EVA and fabric-covered inserts engineered around your product." },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/packaging#page`,
      name: "Custom Packaging Solutions",
      url: `${siteUrl}/packaging`,
      description: "Custom rigid boxes, folding cartons, paper bags and inserts from MTT Packaging.",
      about: solutions.map(({ title, copy }) => ({
        "@type": "Service", name: title, description: copy,
        provider: { "@id": `${siteUrl}/#organization` },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question", name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    organization,
    breadcrumb([["Home", "/"], ["Packaging", "/packaging"]]),
  ],
};

export default function PackagingPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />

      <header className="page-hero">
        <div>
          <p>Custom Packaging</p>
          <h1>Custom Packaging for Premium Brands</h1>
          <p>
            Rigid boxes, folding cartons, paper bags and precision inserts
            developed around your product dimensions, brand presentation and
            distribution needs. MOQ from 500 pcs. Sampling before production.
          </p>
        </div>
        <img
          src="/hero/packaging-systems.webp"
          alt="Custom rigid boxes, folding cartons and precision inserts for premium brands"
          width="900"
          height="900"
        />
      </header>

      {/* Product families - link to dedicated pages */}
      <section className="solutions">
        <div className="section-head">
          <div>
            <p className="section-kicker">Packaging types</p>
            <h2>Four packaging families</h2>
          </div>
          <p>
            Product dimensions, quantity and target presentation determine the
            practical route.
          </p>
        </div>
        <div className="solution-grid">
          {solutions.map((item, index) => (
            <a
              href={`/packaging/${productLinks[index].slug}`}
              className={`solution-card ${item.tone}`}
              key={item.title}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span>{item.n}</span>
              <img
                className="capability-image"
                src={item.image}
                alt={item.alt}
                width="900"
                height="900"
              />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <span style={{ marginTop: "auto", fontSize: "12px", fontWeight: 700 }}>
                View {item.title.toLowerCase()} →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Buyer specifications section */}
      <section className="decision">
        <div>
          <p className="section-kicker light">Specifications</p>
          <h2>
            What to confirm
            <br />
            <i>before requesting a quote.</i>
          </h2>
          <p>
            A clear brief helps your packaging supplier provide accurate
            pricing, realistic timelines and the right structure recommendation.
          </p>
        </div>
        <div className="decision-grid">
          {[
            ["Product dimensions", "Finished internal dimensions in L × W × H (mm). Include cap height for bottles."],
            ["Product weight", "Weight affects insert design, board thickness and shipping cost."],
            ["Structure type", "Rigid box, magnetic, drawer, folding carton, paper bag or let us recommend."],
            ["Quantity", "Target quantity or range. MOQ from 500 pcs for most structures."],
            ["Finishes", "Foil stamping, embossing, debossing, spot UV, lamination or textured paper."],
            ["Insert material", "Paper, molded pulp, EVA foam or fabric-covered. Specify if sustainability matters."],
            ["Delivery country", "Destination affects freight planning and trade terms."],
            ["Budget range", "A budget range helps recommend the right material and finish combination."],
          ].map(([t, c], i) => (
            <article key={t}>
              <b>0{i + 1}</b>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Industries served */}
      <section className="industry-index">
        <div className="section-head">
          <div>
            <p className="section-kicker">Industries</p>
            <h2>
              Packaging for brands that
              <br />
              care about presentation.
            </h2>
          </div>
          <p>
            Each industry creates different demands for protection, presentation
            and distribution.
          </p>
        </div>
        <div className="industry-grid">
          {industries.map((item, index) => (
            <a href={`/industries/${item.slug}`} key={item.slug}>
              <span>0{index + 1}</span>
              <img
                src={item.image}
                alt={item.imageAlt}
                width="700"
                height="700"
              />
              <p>{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <small>Explore options →</small>
            </a>
          ))}
        </div>
      </section>

      {/* Rigid box structures */}
      <section className="decision">
        <div>
          <p className="section-kicker light">Rigid box structures</p>
          <h2>
            Six structures.
            <br />
            <i>Different jobs.</i>
          </h2>
          <p>
            Structure should follow product weight, opening sequence, budget,
            storage and distribution.
          </p>
        </div>
        <div className="decision-grid">
          {[
            ["Magnetic book style", "Launch kits and premium sets."],
            ["Lid & base", "A clean lift-off reveal."],
            ["Drawer box", "A deliberate sliding reveal."],
            ["Shoulder-neck", "Precise fit and layered color."],
            ["Fold-flat rigid", "Reduced storage volume when suitable."],
            ["Custom interior", "Retention, protection and reveal."],
          ].map(([t, c], i) => (
            <article key={t}>
              <img
                src={`/structure/structure-${i + 1}.webp`}
                alt={`${t} high-end custom packaging concept`}
                width="700"
                height="700"
              />
              <b>0{i + 1}</b>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "100px 8vw", display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: "10vw" }}>
        <div>
          <p className="section-kicker">Buyer questions</p>
          <h2 style={{ font: "400 clamp(42px,5.5vw,80px)/1 Georgia,serif", letterSpacing: "-.04em", margin: 0 }}>
            Before you request<br />a custom quote.
          </h2>
        </div>
        <div>
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} style={{ borderTop: "1px solid rgba(23,32,25,.17)", padding: "25px 0" }}>
              <summary style={{ cursor: "pointer", listStyle: "none", font: "600 19px/1 Arial,Helvetica,sans-serif", display: "flex", justifyContent: "space-between" }}>
                {q}<span style={{ fontSize: "24px" }}>+</span>
              </summary>
              <p style={{ maxWidth: "650px", lineHeight: 1.7, color: "#667168", fontSize: "14px", marginTop: "12px" }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* PPWR Link */}
      <section style={{ padding: "40px 7vw", textAlign: "center", borderTop: "1px solid rgba(23,32,25,.17)" }}>
        <p style={{ fontSize: "14px", color: "#5f6961" }}>
          Shipping to the EU? Learn about our{" "}
          <a href="/ppwr-compliant-packaging" style={{ fontWeight: 700, color: "#172019", textDecoration: "underline" }}>
            EU PPWR packaging support
          </a>
          {" "}for documentation and material guidance.
        </p>
      </section>

      {/* CTA */}
      <aside className="page-cta">
        <p>Ready to start?</p>
        <h2>Send your product details for a packaging recommendation.</h2>
        <a className="button" href="/request-a-quote">
          Request a Quote →
        </a>
      </aside>

      <SiteFooter />
    </main>
  );
}
