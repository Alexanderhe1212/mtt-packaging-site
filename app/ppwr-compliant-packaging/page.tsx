import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";

export const metadata: Metadata = {
  title: "PPWR Compliant Packaging Support for EU Brands | MTT Packaging",
  description:
    "Custom packaging manufacturing for EU-bound brands with PPWR-ready material documentation, structural guidance and technical support for rigid boxes, cartons, paper bags and inserts.",
  alternates: { canonical: "/ppwr-compliant-packaging" },
  openGraph: {
    title: "PPWR Compliant Packaging Support for EU Brands | MTT Packaging",
    description:
      "Custom packaging manufacturing and documentation support for EU-bound packaging projects preparing for PPWR requirements.",
    url: "/ppwr-compliant-packaging",
    images: ["/hero/how-we-work.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PPWR Compliant Packaging Support for EU Brands | MTT Packaging",
    description:
      "Custom packaging manufacturing and documentation support for EU-bound packaging projects preparing for PPWR requirements.",
    images: ["/hero/how-we-work.webp"],
  },
};

const faqs = [
  ["What is PPWR?", "PPWR is Regulation (EU) 2025/40 on packaging and packaging waste. It establishes EU-wide requirements covering packaging sustainability, waste prevention, recyclability, labelling and conformity-related responsibilities."],
  ["Does PPWR apply to packaging manufactured in China?", "Packaging manufactured outside the EU may still need to meet applicable PPWR requirements when it is placed on the EU market. Responsibilities depend on the role of the manufacturer, importer, distributor and other economic operators involved."],
  ["What is an EU Declaration of Conformity for packaging?", "It is a declaration used under the PPWR conformity framework to state that the applicable packaging requirements have been met. Responsibility for issuing the declaration depends on who qualifies as the manufacturer for the specific packaging."],
  ["Is PPWR a certification?", "PPWR is an EU regulation, not a generic packaging certification scheme. Compliance is supported by the applicable conformity assessment, technical documentation and EU Declaration of Conformity requirements."],
  ["Can MTT provide PPWR documentation?", "MTT can provide manufacturing-side information for the packaging we produce, including material and component information, structural specifications and relevant supplier or test documentation where available. The exact documentation depends on the project."],
  ["Are custom rigid boxes covered by PPWR?", "Rigid boxes placed on the EU market fall within the broader PPWR packaging framework. The applicable requirements depend on their materials, components, intended use and market role."],
  ["How can luxury packaging be designed with recyclability in mind?", "Possible approaches include reducing unnecessary mixed-material components, simplifying structures, improving component separation and selecting materials with recycling pathways appropriate to the target market. The final solution depends on product protection and presentation requirements."],
  ["What information should I send MTT for an EU packaging project?", "Please provide the product dimensions, packaging quantity, preferred structure, materials, printing and finishing requirements, insert requirements and destination market. If PPWR-related documentation is needed, tell us the intended EU market and any specific documentation requested by your compliance team."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "PPWR-Ready Custom Packaging Support",
      description: "Custom packaging manufacturing and documentation support for EU-bound packaging projects preparing for PPWR requirements.",
      url: `${siteUrl}/ppwr-compliant-packaging`,
      image: `${siteUrl}/hero/how-we-work.webp`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Worldwide",
      serviceType: "EU PPWR Packaging Manufacturing Support",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    organization,
    breadcrumb([
      ["Home", "/"],
      ["PPWR Packaging Support", "/ppwr-compliant-packaging"],
    ]),
  ],
};

export default function PPWRPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteNav />

      {/* Breadcrumbs */}
      <nav
        style={{
          padding: "12px 7vw",
          fontSize: "12px",
          color: "#6b746d",
          borderBottom: "1px solid rgba(23,32,25,.17)",
          background: "#fff",
        }}
      >
        <a href="/" style={{ color: "#6b746d" }}>Home</a>
        <span style={{ margin: "0 8px" }}>/</span>
        <span>PPWR Packaging Support</span>
      </nav>

      {/* Hero */}
      <header className="page-hero">
        <div>
          <p>EU PPWR Packaging Support</p>
          <h1>PPWR-Ready Custom Packaging for the EU Market</h1>
          <p>
            MTT Packaging supports EU-bound packaging projects with custom
            structures, material documentation and manufacturing information
            designed to help brands and importers prepare for PPWR conformity
            requirements.
          </p>
          <p>
            From rigid boxes and folding cartons to paper bags and fitted
            inserts, we help customers understand the materials, components and
            construction of their packaging before production.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
            <a className="button" href="/request-a-quote">
              Discuss an EU Packaging Project →
            </a>
            <a
              className="button"
              href="/request-a-quote"
              style={{ background: "#fff", border: "1px solid rgba(23,32,25,.17)" }}
            >
              Request PPWR Documentation Support →
            </a>
          </div>
          <p style={{ fontSize: "11px", color: "#6b746d", marginTop: "12px", textTransform: "uppercase", letterSpacing: ".1em" }}>
            Custom Structures · Material Documentation · Sampling · Production Support
          </p>
        </div>
        <img
          src="/hero/how-we-work.webp"
          alt="Packaging development worktable with material samples and documentation"
          width="900"
          height="900"
        />
      </header>

      {/* What PPWR Means */}
      <section className="industry-section">
        <div>
          <p className="section-kicker">Understanding PPWR</p>
          <h2>What PPWR Means for Custom Packaging</h2>
        </div>
        <div>
          <p>
            Regulation (EU) 2025/40, the Packaging and Packaging Waste
            Regulation (PPWR), applies across the EU on a phased basis from 12
            August 2026.
          </p>
          <p>
            The regulation introduces requirements covering areas such as
            packaging sustainability, material information, recyclability,
            minimisation, labelling and conformity documentation, with some
            detailed requirements applying on later dates.
          </p>
          <p style={{ padding: "16px 20px", background: "#f0ede5", borderRadius: "6px", borderLeft: "3px solid #253c2e", fontSize: "14px" }}>
            PPWR responsibilities depend on the packaging type, intended use and
            the role of each economic operator in the supply chain.
          </p>
          <p style={{ marginTop: "16px", fontSize: "14px", color: "#5f6961" }}>
            New to the regulation? Read our <a href="/insights/ppwr-packaging-requirements" style={{ color: "#253c2e", fontWeight: 700 }}>2026 PPWR packaging requirements guide</a>.
          </p>
        </div>
      </section>

      {/* How MTT Supports */}
      <section className="industry-priorities">
        <div>
          <p className="section-kicker light">Our approach</p>
          <h2>How MTT Supports PPWR-Ready Packaging Projects</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {[
            ["Material Identification", "We document the main materials used in the packaging, including paperboard, greyboard, specialty paper, coatings, foils, adhesives, magnets, plastics, fabrics and other components where applicable."],
            ["Component Breakdown", "Complex packaging can be separated into individual components so customers can understand how the box, insert, decorative elements and functional parts are constructed."],
            ["Supplier Documentation", "Where available, we can organise relevant supplier declarations, material specifications and supporting test documentation for the selected packaging materials and components."],
            ["Structural Optimisation", "Our engineering team can review packaging structures with the goal of reducing unnecessary material, avoiding excessive empty space and simplifying construction where the product and presentation requirements allow."],
            ["Recyclability-Oriented Design", "We can explore structures that reduce unnecessary mixed-material components and improve material separation while maintaining product protection and premium presentation."],
            ["Production Traceability", "Project specifications, approved materials, structural versions and production references can be documented to support consistent manufacturing and future compliance records."],
          ].map(([title, copy]) => (
            <article key={title} style={{ borderTop: "1px solid rgba(255,255,255,.25)", paddingTop: "24px" }}>
              <h3 style={{ font: "600 20px/1.2 Arial,Helvetica,sans-serif", color: "#fff" }}>{title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#bac5bc", marginTop: "10px" }}>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Documentation Support */}
      <section className="industry-section">
        <div>
          <p className="section-kicker">Documentation</p>
          <h2>PPWR Documentation Support for EU-Bound Projects</h2>
        </div>
        <div>
          <p>
            Under the PPWR, packaging suppliers may need to provide manufacturers
            with information and documentation necessary to support conformity
            assessment. MTT can support customers with manufacturing-side
            information relevant to the packaging we produce.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              "Packaging description",
              "Material composition",
              "Component list",
              "Structural drawing or dieline",
              "Packaging dimensions",
              "Packaging weight where available",
              "Manufacturing specifications",
              "Printing and finishing specifications",
              "Insert specifications",
              "Relevant supplier declarations where available",
              "Relevant test reports where available",
              "Project or batch identification",
              "Document revision information",
              "Supporting manufacturing information for technical documentation",
            ].map((item) => (
              <li key={item} style={{ fontSize: "13px", color: "#5f6961", paddingLeft: "20px", position: "relative", lineHeight: 1.6 }}>
                <span style={{ position: "absolute", left: 0, color: "#253c2e", fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ padding: "16px 20px", background: "#f0ede5", borderRadius: "6px", borderLeft: "3px solid #253c2e", fontSize: "14px" }}>
            The exact documentation required depends on the packaging structure,
            materials, intended use and the customer&apos;s legal role in the EU
            supply chain.
          </p>
        </div>
      </section>

      {/* EU Declaration of Conformity */}
      <section className="industry-priorities">
        <div>
          <p className="section-kicker light">Conformity</p>
          <h2>EU Declaration of Conformity for Packaging</h2>
        </div>
        <div>
          <p>
            Regulation (EU) 2025/40 provides a conformity assessment framework
            and an EU Declaration of Conformity. The declaration is not simply a
            generic third-party &ldquo;PPWR certificate&rdquo;.
          </p>
          <p>
            The legal responsibility for issuing the EU Declaration of
            Conformity depends on who qualifies as the manufacturer under the
            PPWR for the specific packaging project.
          </p>
          <p style={{ marginTop: "16px" }}>
            MTT can provide relevant manufacturing-side information and
            supporting documentation for the packaging it produces, but the
            legal responsibility for the declaration must be assessed for each
            supply-chain arrangement.
          </p>
        </div>
      </section>

      {/* Information Needed */}
      <section className="industry-section">
        <div>
          <p className="section-kicker">Requirements</p>
          <h2>Information Commonly Needed for PPWR Technical Documentation</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            "Packaging identification",
            "Intended packaging use",
            "Product or packaging description",
            "Structural drawings",
            "Material specifications",
            "Component specifications",
            "Manufacturing information",
            "Applicable technical requirements",
            "Supporting test or assessment information where available",
            "Traceability details",
            "Document version and approval information",
          ].map((item) => (
            <div key={item} style={{ fontSize: "13px", color: "#5f6961", padding: "8px 0", borderBottom: "1px solid rgba(23,32,25,.17)" }}>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Packaging Types */}
      <section className="industry-priorities">
        <div>
          <p className="section-kicker light">Packaging types</p>
          <h2>Packaging Types We Support for EU Projects</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {[
            ["Custom Rigid Boxes", "Premium rigid packaging for fragrance, cosmetics, jewelry and gift products, with custom structures, finishes and inserts.", "/packaging/custom-rigid-boxes", "Explore Custom Rigid Boxes"],
            ["Folding Cartons", "Lightweight paperboard packaging for retail products where efficient material use, printing flexibility and compact shipping are important.", "/packaging/folding-cartons", "Explore Folding Cartons"],
            ["Custom Paper Bags", "Custom retail and gift bags with controlled materials, handles, printing and finishing specifications.", "/packaging/custom-paper-bags", "Explore Custom Paper Bags"],
            ["Custom Packaging Inserts", "Paperboard, molded pulp and other fitted insert solutions designed around product protection, presentation and material requirements.", "/packaging/custom-inserts", "Explore Custom Inserts"],
          ].map(([title, copy, link, cta]) => (
            <article key={title} style={{ padding: "24px", background: "rgba(255,255,255,.06)", borderRadius: "7px", border: "1px solid rgba(255,255,255,.12)", display: "flex", flexDirection: "column" }}>
              <h3 style={{ font: "600 22px/1.2 Arial,Helvetica,sans-serif", color: "#fff", margin: "0 0 10px" }}>{title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#bac5bc", flex: 1 }}>{copy}</p>
              <a href={link} style={{ fontSize: "12px", fontWeight: 700, color: "#d6ee73", marginTop: "16px" }}>{cta} →</a>
            </article>
          ))}
        </div>
      </section>

      {/* Industry Links */}
      <section className="industry-section">
        <div>
          <p className="section-kicker">Industries</p>
          <h2>PPWR Support for Premium Product Categories</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            ["Perfume & Fragrance Packaging", "/industries/perfume-fragrance-packaging"],
            ["Cosmetics & Skincare Packaging", "/industries/cosmetics-skincare-packaging"],
            ["Jewelry & Watch Packaging", "/industries/jewelry-watch-packaging"],
            ["Gift Set & PR Kit Packaging", "/industries/gift-set-pr-kit-packaging"],
          ].map(([name, link]) => (
            <a key={name} href={link} style={{ padding: "16px 20px", background: "#fff", borderRadius: "6px", border: "1px solid rgba(23,32,25,.17)", fontSize: "14px", fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", color: "#172019", textDecoration: "none" }}>
              {name}<span>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="industry-priorities">
        <div>
          <p className="section-kicker light">Timeline</p>
          <h2>PPWR Timeline: 2026 and Beyond</h2>
        </div>
        <div>
          {[
            ["2025", "Regulation (EU) 2025/40 entered into force."],
            ["12 August 2026", "The PPWR began applying across the EU on a phased basis."],
            ["2030 and later", "Important additional requirements and milestones apply later, including detailed measures relating to packaging recyclability, recycled plastic content, packaging minimisation, reuse and certain packaging restrictions."],
          ].map(([year, desc]) => (
            <div key={year} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "24px", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,.2)" }}>
              <b style={{ color: "#d6ee73", fontSize: "16px" }}>{year}</b>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#bac5bc", margin: 0 }}>{desc}</p>
            </div>
          ))}
          <p style={{ marginTop: "20px", fontSize: "12px", color: "#8a9a8d", fontStyle: "italic" }}>
            Exact application dates vary by requirement and packaging type.
            Customers should confirm the requirements relevant to their specific
            packaging and market role.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "100px 12vw", display: "grid", gridTemplateColumns: ".72fr 1.28fr", gap: "8vw", borderTop: "1px solid rgba(23,32,25,.17)" }}>
        <div>
          <p className="section-kicker">FAQ</p>
          <h2 style={{ font: "400 clamp(38px,4.5vw,64px)/1 Georgia", margin: 0 }}>
            PPWR Packaging FAQ
          </h2>
        </div>
        <div>
          {faqs.map(([q, a], i) => (
            <details
              key={q}
              open={i === 0}
              style={{ borderTop: "1px solid rgba(23,32,25,.17)", padding: "24px 0" }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  font: "600 19px/1 Arial,Helvetica,sans-serif",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {q}
                <span style={{ fontSize: "24px" }}>+</span>
              </summary>
              <p
                style={{
                  maxWidth: "650px",
                  lineHeight: 1.7,
                  color: "#667168",
                  fontSize: "14px",
                  marginTop: "12px",
                }}
              >
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <aside className="page-cta">
        <p>Planning Packaging for the EU Market?</p>
        <h2>
          Share your product, packaging structure and EU market requirements with
          our team.
        </h2>
        <p style={{ fontSize: "15px", color: "#b7c1b9", maxWidth: "700px", lineHeight: 1.7, marginBottom: "24px" }}>
          We can review the project from a manufacturing, material and
          documentation perspective before sampling and production.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a className="button" href="/request-a-quote">
            Discuss Your EU Packaging Project →
          </a>
          <a
            href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%27m%20looking%20for%20PPWR-ready%20packaging%20for%20the%20EU%20market."
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "13px", fontWeight: 700, color: "#fff", borderBottom: "1px solid", paddingBottom: "4px" }}
          >
            WhatsApp MTT Packaging ↗
          </a>
        </div>
      </aside>

      <SiteFooter />
    </main>
  );
}
