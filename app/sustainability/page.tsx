import RelatedPackagingStudies from "../../components/RelatedPackagingStudies";
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
    "/design/customization/specialty-paper.webp",
    "Illustration: textured paper swatches for material review",
  ],
  [
    "02",
    "Material reduction",
    "Right-sizing, board optimization and fewer unnecessary components reduce material before adding complex claims.",
    "/design/carton-editorial.webp",
    "Concept: simple folding paperboard cartons",
  ],
  [
    "03",
    "Paper-based options",
    "Paperboard platforms and molded pulp can replace some plastic or foam inserts where protection allows.",
    "/design/customization/molded-pulp.webp",
    "Illustration: formed fiber insert with fitted recesses",
  ],
  [
    "04",
    "Clearer end of life",
    "Magnets, laminations, mixed materials and separability are reviewed against the finished pack.",
    "/design/customization/magnetic-closure.webp",
    "Illustration: magnets and greyboard wrapping components for separability review",
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
    <main id="main-content">
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
          <p><a href="/insights/sustainable-luxury-packaging-boxes-approval">Read the sustainable packaging sample approval checklist →</a></p>
          <p><a href="/insights/recycled-vs-recyclable-packaging-boxes">Recycled content and recyclability: what to verify →</a></p>
          <p><a href="/insights/plastic-lamination-free-packaging-boxes">Specifying boxes without plastic lamination →</a></p>
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
      <section className="home-buying-guide" aria-labelledby="sustainable-decisions">
        <header><p className="hp-kicker">Compare the complete pack</p><h2 id="sustainable-decisions">Choose a change you can verify.</h2><p>Start with the product, delivery route and disposal market. A paper-based appearance does not establish recyclability, and a recycled-content claim does not describe every component. Compare the outer box, wrap, insert, adhesive and closure as one specification.</p></header>
        <div className="home-buying-table" role="region" aria-label="Sustainable packaging decisions" tabIndex={0}>
          <table><caption>Material changes to evaluate during sampling</caption><thead><tr><th scope="col">Proposed change</th><th scope="col">What to check</th><th scope="col">Evidence to retain</th></tr></thead><tbody>
            <tr><th scope="row">Reduce box size</th><td>Keep enough space for product removal and internal support; review the shipping carton too.</td><td>Before-and-after dimensions and component weights for the same packed product.</td></tr>
            <tr><th scope="row">Replace a foam insert</th><td>Compare folded paperboard or molded pulp for support, surface contact and packing time.</td><td>Approved fit sample and agreed protection checks with the actual product.</td></tr>
            <tr><th scope="row">Remove plastic lamination</th><td>Review scuffing, fingerprints and finish adhesion on the selected paper.</td><td>Material and coating details plus the approved decorated sample.</td></tr>
            <tr><th scope="row">Simplify the closure</th><td>Evaluate a tuck, sleeve or lift-off structure where the brief allows fewer mixed components.</td><td>Updated component list and confirmation that the pack still closes securely.</td></tr>
          </tbody></table>
        </div>
        <div className="home-brief-checklist"><h3>Keep the claim tied to the order.</h3><ul>
          <li>Identify which component a recycled-content or sourcing claim covers and request supporting supplier documentation.</li>
          <li>Check certificate scope and the proposed label before artwork approval; a paper supplier’s certificate alone is not a finished-box claim.</li>
          <li>Assess disposal instructions for the destination market, including components the customer must separate.</li>
        </ul></div>
        <p>The <a href="https://fsc.org/en/chain-of-custody">FSC chain-of-custody guidance</a> explains traceability through the supply chain. For US-facing environmental marketing, consult the <a href="https://www.ftc.gov/news-events/topics/truth-advertising/green-guides">FTC Green Guides</a>. Neither source verifies a particular MTT order: the supporting records must match that project.</p>
        <p>Send photos of the current pack, the product dimensions and weight, order quantity, destination and the specific change you want to make. We can use that brief to compare material options and identify what the next sample needs to demonstrate.</p>
      </section>
      <aside className="page-cta">
        <p>Ready to start?</p>
        <h2>Discuss sustainable packaging options for your product.</h2>
        <a className="button" href="/request-a-quote">
          Request a Quote →
        </a>
      </aside>
      <RelatedPackagingStudies ids={["electronics", "skincare"]}/><SiteFooter />
    </main>
  );
}
