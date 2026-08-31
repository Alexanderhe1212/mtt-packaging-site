import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Custom Paper Bags | Luxury Branded Bags | MTT Packaging",
  description:
    "Custom paper bags from MTT Packaging: cotton, ribbon or paper handles, reinforced construction, foil and embossing. MOQ from 500 pcs.",
  alternates: { canonical: "/packaging/custom-paper-bags" },
  openGraph: {
    title: "Custom Paper Bags | MTT Packaging",
    description: "Luxury branded paper bags with custom handles and finishes. MOQ from 500 pcs.",
    url: "/packaging/custom-paper-bags",
    images: ["/capability-paper-bags.webp"],
  },
};

const faqs = [
  ["What types of custom paper bags do you offer?", "MTT Packaging produces luxury paper bags with cotton rope handles, ribbon handles, paper twisted handles and die-cut handles. Available in kraft, coated and specialty papers with foil, embossing and custom printing."],
  ["What is the MOQ for custom paper bags?", "Most custom paper bag projects start from 500–1,000 pieces. MOQ depends on the paper type, handle style, print complexity and finishes."],
  ["Can paper bags be reinforced?", "Yes. Reinforced handles, cardboard base inserts and turned-top edges are standard for premium paper bags. These improve load capacity and durability."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Product", name: "Custom Paper Bags", description: "Custom luxury paper bags from MTT Packaging.", brand: { "@type": "Brand", name: "MTT Packaging" }, manufacturer: { "@id": `${siteUrl}/#organization` } },
    { "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    organization,
    breadcrumb([["Home", "/"], ["Packaging", "/packaging"], ["Custom Paper Bags", "/packaging/custom-paper-bags"]]),
  ],
};

export default function CustomPaperBagsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <div>
          <p>Custom Paper Bags</p>
          <h1>Custom Paper Bags for Premium Brands</h1>
          <p>Brand-matched luxury bags with cotton, ribbon or paper handles. Reinforced construction, foil stamping and embossing. MOQ from 500 pcs.</p>
        </div>
        <img src="/capability-paper-bags.webp" alt="Custom luxury paper bags with cotton rope handles" width="900" height="900" />
      </header>
      <section className="industry-section">
        <div><p className="section-kicker">Options</p><h2>Paper bag options and construction.</h2></div>
        <div className="structure-list">
          {[["Cotton rope handles", "Premium feel, reinforced with internal knots."], ["Ribbon handles", "Satin or grosgrain ribbon for luxury gifting."], ["Paper twisted handles", "Cost-efficient, clean look, fully recyclable."], ["Die-cut handles", "Integrated handle cut from the bag itself."], ["Flat base", "Cardboard insert for stability and load capacity."], ["Rope + eyelet", "Metal eyelets reinforce handle holes for heavy loads."]].map(([t, d], i) => (
            <article key={t}><b>0{i + 1}</b><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>
      <section className="brief-list">
        <div><p className="section-kicker">Request a quote</p><h2>Send these details for a focused review.</h2></div>
        <ol>{["Bag dimensions (W × D × H in mm)", "Handle type and length", "Paper type and weight", "Print colors and finishes", "Quantity and delivery country"].map((l, i) => (<li key={l}><b>0{i + 1}</b>{l}</li>))}</ol>
      </section>
      <section style={{ padding: "100px 12vw", display: "grid", gridTemplateColumns: ".72fr 1.28fr", gap: "8vw", borderTop: "1px solid rgba(23,32,25,.17)" }}>
        <div><p className="section-kicker">Buyer questions</p><h2 style={{ font: "400 clamp(38px,4.5vw,64px)/1 Georgia", margin: 0 }}>Common questions.</h2></div>
        <div>{faqs.map(([q, a], i) => (<details key={q} open={i === 0} style={{ borderTop: "1px solid rgba(23,32,25,.17)", padding: "24px 0" }}><summary style={{ cursor: "pointer", listStyle: "none", font: "600 19px/1 Arial,Helvetica,sans-serif", display: "flex", justifyContent: "space-between" }}>{q}<span style={{ fontSize: "24px" }}>+</span></summary><p style={{ maxWidth: "650px", lineHeight: 1.7, color: "#667168", fontSize: "14px", marginTop: "12px" }}>{a}</p></details>))}</div>
      </section>
      <aside className="page-cta"><p>Have a packaging project?</p><h2>Send your product details for a bag recommendation.</h2><a className="button" href="/request-a-quote">Request a Quote →</a></aside>
      <SiteFooter />
    </main>
  );
}
