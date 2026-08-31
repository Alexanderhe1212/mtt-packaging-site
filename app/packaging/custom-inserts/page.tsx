import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Custom Packaging Inserts | Paper, EVA, Molded Pulp | MTT Packaging",
  description:
    "Custom packaging inserts from MTT Packaging: paper, molded pulp, EVA and fabric-covered inserts engineered around your product. MOQ from 500 pcs.",
  alternates: { canonical: "/packaging/custom-inserts" },
  openGraph: {
    title: "Custom Packaging Inserts | MTT Packaging",
    description: "Paper, molded pulp, EVA and fabric-covered inserts for premium packaging. MOQ from 500 pcs.",
    url: "/packaging/custom-inserts",
    images: ["/capability-custom-inserts.webp"],
  },
};

const faqs = [
  ["What types of packaging inserts are available?", "MTT Packaging produces paper inserts (folded paperboard platforms), molded pulp inserts, EVA foam inserts and fabric-covered foam inserts. The choice depends on product weight, fragility, presentation and sustainability requirements."],
  ["What is the best insert for glass bottles?", "The right insert depends on bottle weight, fragility and presentation target. Molded pulp and paperboard platforms improve recyclability. EVA or fabric-covered foam provides tighter cushioning for heavier or more delicate bottles."],
  ["Can one insert hold multiple products?", "Yes, but each product needs its own cavity dimensioned from measured product sizes—not from a photo or nominal fill volume. The lid clearance, finger access and product sequence should be planned before the insert is engineered."],
  ["What information is needed to design an insert?", "Provide measured product dimensions (L × W × H in mm), weight, center of gravity, fragile points, desired retention method and sustainability requirements. Nominal capacity or a product photo is not enough to engineer a secure fit."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Custom Packaging Insert Manufacturing",
      description: "Custom inserts in paper, molded pulp, EVA and fabric-covered materials from MTT Packaging.",
      url: `${siteUrl}/packaging/custom-inserts`,
      image: `${siteUrl}/capability-custom-inserts.webp`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Worldwide",
      serviceType: "Custom Packaging Insert Manufacturing",
    },
    { "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    organization,
    breadcrumb([["Home", "/"], ["Packaging", "/packaging"], ["Custom Inserts", "/packaging/custom-inserts"]]),
  ],
};

export default function CustomInsertsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <div>
          <p>Custom Inserts</p>
          <h1>Custom Packaging Inserts for Product Protection</h1>
          <p>Paper, molded pulp, EVA and fabric-covered inserts engineered around your product dimensions. Designed for retention, protection and presentation.</p>
        </div>
        <img src="/capability-custom-inserts.webp" alt="Custom paperboard and EVA inserts for premium packaging" width="900" height="900" />
      </header>
      <section className="industry-section">
        <div><p className="section-kicker">Insert types</p><h2>Insert options for every product and budget.</h2></div>
        <div className="structure-list">
          {[["Paperboard platform", "Folded or die-cut paperboard. Print-friendly, recyclable, cost-efficient."], ["Molded pulp", "Custom-molded from recycled fibre. Supports complex shapes and reduces plastic use."], ["EVA foam", "Precise cavities for cushioning. Available in multiple densities and colors."], ["Fabric-covered foam", "EVA or foam wrapped in velvet, microfiber or paper for premium presentation."], ["Vacuum-formed tray", "Clear or colored plastic trays for exact product fit."], ["Die-cut corrugated", "Budget-friendly protection for shipping and e-commerce."]].map(([t, d], i) => (
            <article key={t}><b>0{i + 1}</b><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>
      <section className="industry-priorities">
        <div><p className="section-kicker light">Engineering</p><h2>Designed around your product.</h2></div>
        <div>
          {[["Product dimensions", "Measured L × W × H, weight, center of gravity and fragile points."], ["Retention method", "Friction fit, elastic, cradle or platform. Depends on product shape and orientation."], ["Opening experience", "Product visibility, finger access and removal ease when the box opens."]].map(([t, d]) => (
            <article key={t}><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>
      <section className="brief-list">
        <div><p className="section-kicker">Request a quote</p><h2>Send these details for a focused review.</h2></div>
        <ol>{["Product dimensions and weight (each item if multiple)", "Insert material preference", "Retention method and orientation", "Sustainability requirements", "Outer box dimensions if known"].map((l, i) => (<li key={l}><b>0{i + 1}</b>{l}</li>))}</ol>
      </section>
      <section style={{ padding: "100px 12vw", display: "grid", gridTemplateColumns: ".72fr 1.28fr", gap: "8vw", borderTop: "1px solid rgba(23,32,25,.17)" }}>
        <div><p className="section-kicker">Buyer questions</p><h2 style={{ font: "400 clamp(38px,4.5vw,64px)/1 Georgia", margin: 0 }}>Common questions.</h2></div>
        <div>{faqs.map(([q, a], i) => (<details key={q} open={i === 0} style={{ borderTop: "1px solid rgba(23,32,25,.17)", padding: "24px 0" }}><summary style={{ cursor: "pointer", listStyle: "none", font: "600 19px/1 Arial,Helvetica,sans-serif", display: "flex", justifyContent: "space-between" }}>{q}<span style={{ fontSize: "24px" }}>+</span></summary><p style={{ maxWidth: "650px", lineHeight: 1.7, color: "#667168", fontSize: "14px", marginTop: "12px" }}>{a}</p></details>))}</div>
      </section>
      <aside className="page-cta"><p>Have a packaging project?</p><h2>Send your product details for an insert recommendation.</h2><a className="button" href="/request-a-quote">Request a Quote →</a></aside>
      <SiteFooter />
    </main>
  );
}
