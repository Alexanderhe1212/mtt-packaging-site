import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Custom Folding Cartons | Premium Paperboard Packaging | MTT Packaging",
  description:
    "Custom folding cartons from MTT Packaging: premium paperboard with specialty finishes, foil stamping and embossing. MOQ from 500 pcs.",
  alternates: { canonical: "/packaging/folding-cartons" },
  openGraph: {
    title: "Custom Folding Cartons | MTT Packaging",
    description: "Premium paperboard folding cartons with specialty finishes. MOQ from 500 pcs.",
    url: "/packaging/folding-cartons",
    images: ["/capability-folding-cartons.webp"],
  },
};

const faqs = [
  ["What is a folding carton?", "A folding carton is a printed, die-cut box made from a single sheet of paperboard (typically 0.3–0.6mm). It ships flat and is erected during packing. Folding cartons are the standard choice for retail packaging, cosmetics, skincare and e-commerce."],
  ["How does a folding carton differ from a rigid box?", "A folding carton is lighter, ships flat and is more space-efficient for storage and freight. A rigid box is thicker, holds its shape and feels more premium. Folding cartons suit high-volume retail; rigid boxes suit gifting and presentation."],
  ["What finishes are available for folding cartons?", "Foil stamping, embossing, debossing, spot UV, matte and gloss lamination, textured papers and controlled Pantone color matching. The clay-coated surface of SBS paperboard supports sharp offset printing."],
  ["What is the MOQ for custom folding cartons?", "Most custom folding carton projects start from 1,000–3,000 pieces. The MOQ depends on the die complexity, print colors and finishes."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Custom Folding Cartons",
      description: "Custom folding cartons from MTT Packaging: premium paperboard with specialty finishes.",
      brand: { "@type": "Brand", name: "MTT Packaging" },
      manufacturer: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    organization,
    breadcrumb([["Home", "/"], ["Packaging", "/packaging"], ["Folding Cartons", "/packaging/folding-cartons"]]),
  ],
};

export default function FoldingCartonsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <div>
          <p>Folding Cartons</p>
          <h1>Custom Folding Cartons for Retail and E-Commerce</h1>
          <p>Premium paperboard cartons with specialty finishes, foil stamping and embossing. Efficient for storage, freight and high-volume production. MOQ from 1,000 pcs.</p>
        </div>
        <img src="/capability-folding-cartons.webp" alt="Premium embossed folding cartons with specialty finishes" width="900" height="900" />
      </header>
      <section className="industry-section">
        <div>
          <p className="section-kicker">Capabilities</p>
          <h2>Paperboard cartons with controlled finishing.</h2>
        </div>
        <div className="structure-list">
          {[["Straight tuck", "Standard retail carton with clean tuck closure."], ["Reverse tuck", "Efficient for automated packing lines."], ["Auto-bottom", "Pre-glued base that pops open for fast assembly."], ["Sleeve and tray", "A sliding reveal for premium presentation."], ["Window cutout", "Product visibility through a die-cut window."], ["Hanging tab", "For pegboard retail display."]].map(([t, d], i) => (
            <article key={t}><b>0{i + 1}</b><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>
      <section className="industry-priorities">
        <div><p className="section-kicker light">Materials</p><h2>Paperboard options for folding cartons.</h2></div>
        <div>
          {[["SBS (Solid Bleached Sulphate)", "White, clay-coated paperboard. Clean printing surface, standard for cosmetics and fragrance."], ["Kraft board", "Natural brown fibre texture. Popular for artisanal and eco-forward brands."], ["C1S/C2S", "Coated one side or two sides. Controls gloss, matte and print reproduction."]].map(([t, d]) => (
            <article key={t}><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>
      <section className="brief-list">
        <div><p className="section-kicker">Request a quote</p><h2>Send these details for a focused review.</h2></div>
        <ol>{["Finished internal dimensions (L × W × H in mm)", "Product weight", "Preferred carton style", "Print colors and finishes", "Quantity and delivery country"].map((l, i) => (<li key={l}><b>0{i + 1}</b>{l}</li>))}</ol>
      </section>
      <section style={{ padding: "100px 12vw", display: "grid", gridTemplateColumns: ".72fr 1.28fr", gap: "8vw", borderTop: "1px solid rgba(23,32,25,.17)" }}>
        <div><p className="section-kicker">Buyer questions</p><h2 style={{ font: "400 clamp(38px,4.5vw,64px)/1 Georgia", margin: 0 }}>Common questions.</h2></div>
        <div>{faqs.map(([q, a], i) => (<details key={q} open={i === 0} style={{ borderTop: "1px solid rgba(23,32,25,.17)", padding: "24px 0" }}><summary style={{ cursor: "pointer", listStyle: "none", font: "600 19px/1 Arial,Helvetica,sans-serif", display: "flex", justifyContent: "space-between" }}>{q}<span style={{ fontSize: "24px" }}>+</span></summary><p style={{ maxWidth: "650px", lineHeight: 1.7, color: "#667168", fontSize: "14px", marginTop: "12px" }}>{a}</p></details>))}</div>
      </section>
      <aside className="page-cta"><p>Have a packaging project?</p><h2>Send your product details for a carton recommendation.</h2><a className="button" href="/request-a-quote">Request a Quote →</a></aside>
      <SiteFooter />
    </main>
  );
}
