import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Custom Rigid Boxes | Luxury Packaging Manufacturer | MTT Packaging",
  description:
    "Custom rigid boxes from MTT Packaging: magnetic, lift-off lid, drawer and shoulder-neck structures. Premium materials, foil, embossing. MOQ from 500 pcs.",
  alternates: { canonical: "/packaging/custom-rigid-boxes" },
  openGraph: {
    title: "Custom Rigid Boxes | MTT Packaging",
    description:
      "Magnetic, lift-off lid, drawer and shoulder-neck rigid boxes for premium brands. MOQ from 500 pcs.",
    url: "/packaging/custom-rigid-boxes",
    images: ["/capability-rigid-box.webp"],
  },
};

const faqs = [
  ["What is a custom rigid box?", "A rigid box is a thick, hand-assembled box made from greyboard (typically 1.5–3mm) wrapped with printed or specialty paper. It holds its shape, feels substantial and cannot be flattened. Rigid boxes are used for luxury gifting, product launches and premium retail presentation."],
  ["What structures are available for rigid boxes?", "MTT Packaging produces magnetic closure boxes, lift-off lid boxes, drawer boxes, shoulder-neck boxes, fold-flat rigid boxes and custom presentation cases. Each structure offers a different opening experience and level of protection."],
  ["What is the MOQ for custom rigid boxes?", "Most custom rigid box projects start from 500–1,000 pieces per design. The practical MOQ depends on the structure complexity, materials, finishes and production method."],
  ["How much does a custom rigid box cost?", "Unit cost depends on size, board thickness, wrapping paper, printing, finishes, insert material and order quantity. A simple rigid box with one-colour printing might start from $2–4 per unit at 1,000 pieces, while a complex multi-finish box can reach $8–15 or more."],
  ["Can I order a sample before production?", "Yes. Physical sampling is recommended before mass production. A structural or printed sample is produced for your approval. Sampling typically takes 7–14 days depending on complexity."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Custom Rigid Boxes",
      description: "Custom rigid boxes from MTT Packaging: magnetic, lift-off lid, drawer and shoulder-neck structures for premium brands.",
      brand: { "@type": "Brand", name: "MTT Packaging" },
      manufacturer: { "@id": `${siteUrl}/#organization` },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: { "@id": `${siteUrl}/#organization` },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question", name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    organization,
    breadcrumb([["Home", "/"], ["Packaging", "/packaging"], ["Custom Rigid Boxes", "/packaging/custom-rigid-boxes"]]),
  ],
};

export default function CustomRigidBoxesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />

      <header className="page-hero">
        <div>
          <p>Custom Rigid Boxes</p>
          <h1>Custom Rigid Boxes for Premium Brands</h1>
          <p>
            Magnetic, lift-off lid, drawer and shoulder-neck rigid boxes
            developed around your product. Premium materials, foil stamping,
            embossing and precision inserts. MOQ from 500 pcs.
          </p>
        </div>
        <img
          src="/capability-rigid-box.webp"
          alt="Custom rigid box with magnetic closure and fitted insert"
          width="900"
          height="900"
        />
      </header>

      <section className="industry-section">
        <div>
          <p className="section-kicker">Structures</p>
          <h2>Rigid box structures for every presentation need.</h2>
        </div>
        <div className="structure-list">
          {[
            ["Magnetic closure", "Hidden magnets create a controlled, satisfying opening. Suited to gift sets, launches and premium retail."],
            ["Lift-off lid", "A clean two-piece structure. Versatile, efficient to pack and suitable for single products and collections."],
            ["Drawer box", "A sleeve-and-tray format that creates a deliberate sliding reveal. Works well with ribbon pulls."],
            ["Shoulder-neck", "A visible inner neck introduces a second brand color. Strong reveal for perfume and cosmetics."],
            ["Fold-flat rigid", "Ships flat and assembles at destination. Reduces storage and freight volume by 60–80%."],
            ["Presentation case", "A hinged or multi-part structure for high-value items, collectibles and luxury accessories."],
          ].map(([title, desc], i) => (
            <article key={title}>
              <b>0{i + 1}</b>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="industry-priorities">
        <div>
          <p className="section-kicker light">Materials & finishes</p>
          <h2>Premium materials and controlled finishing.</h2>
        </div>
        <div>
          {[
            ["Greyboard core", "1.5–3mm greyboard selected by density and stiffness for the structure and product weight."],
            ["Wrapping papers", "Coated, uncoated, textured and specialty papers. Each changes print behavior, foil adhesion and tactile feel."],
            ["Foil & embossing", "Metallic, pigment and holographic foils. Embossing and debossing for tactile brand marks."],
          ].map(([title, desc]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brief-list">
        <div>
          <p className="section-kicker">Request a quote</p>
          <h2>Send these details for a focused review.</h2>
        </div>
        <ol>
          {[
            "Finished internal dimensions (L × W × H in mm)",
            "Product weight and fragility",
            "Preferred structure (or let us recommend)",
            "Quantity and delivery country",
            "Finish references (foil, emboss, spot UV)",
            "Insert material preference",
          ].map((line, i) => (
            <li key={line}>
              <b>0{i + 1}</b>
              {line}
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section style={{ padding: "100px 12vw", display: "grid", gridTemplateColumns: ".72fr 1.28fr", gap: "8vw", borderTop: "1px solid rgba(23,32,25,.17)" }}>
        <div>
          <p className="section-kicker">Buyer questions</p>
          <h2 style={{ font: "400 clamp(38px,4.5vw,64px)/1 Georgia", margin: 0 }}>Common questions about rigid boxes.</h2>
        </div>
        <div>
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} style={{ borderTop: "1px solid rgba(23,32,25,.17)", padding: "24px 0" }}>
              <summary style={{ cursor: "pointer", listStyle: "none", font: "600 19px/1 Arial,Helvetica,sans-serif", display: "flex", justifyContent: "space-between" }}>
                {q}<span style={{ fontSize: "24px" }}>+</span>
              </summary>
              <p style={{ maxWidth: "650px", lineHeight: 1.7, color: "#667168", fontSize: "14px", marginTop: "12px" }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="page-cta">
        <p>Have a packaging project?</p>
        <h2>Send your product details for a rigid box recommendation.</h2>
        <a className="button" href="/request-a-quote">Request a Quote →</a>
      </aside>

      <SiteFooter />
    </main>
  );
}
