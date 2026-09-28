import RelatedPackagingStudies from "../../components/RelatedPackagingStudies";
import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { breadcrumb, organization } from "../../lib/seo";
export const metadata: Metadata = {
  title: "Custom Packaging Process | MTT Packaging",
  description:
    "See how MTT Packaging moves from product brief and physical sample to production, inspection, export packing and delivery.",
  alternates: { canonical: "/how-we-work" },
  openGraph: {
    title: "Custom Packaging Process | MTT Packaging",
    description: "A clear path from product brief to approved packaging production.",
    url: "/how-we-work",
    images: ["/design/development-worktable.webp"],
  },
};
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo", name: "How MTT Packaging develops custom packaging",
      description: "A four-stage custom packaging process from brief to delivery.",
      step: ["Define the brief", "Engineer and sample", "Produce and inspect", "Pack and deliver"].map((name, index) => ({ "@type": "HowToStep", position: index + 1, name })),
    },
    organization,
    breadcrumb([["Home", "/"], ["How We Work", "/how-we-work"]]),
  ],
};
export default function ProcessPage() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <div>
          <p>How we work</p>
          <h1>A clear path from product to packaging.</h1>
          <p>
            One direct contact coordinates specification, sampling, production
            and delivery details.
          </p>
        </div>
        <img
          src="/design/hero-editorial.webp"
          alt="Concept: forest green rigid packaging with a lifted lid"
          width="3000"
          height="2250"
        />
      </header>
      <section className="proof">
        <div>
          <p className="section-kicker">A complete system</p>
          <h2>
            Structure, finish and protection
            <br />
            <i>considered together.</i>
          </h2>
        </div>
        <div className="proof-grid">
          <article>
            <img
              src="/design/customization/specialty-paper.webp"
              alt="Illustration: textured paper swatches for material review"
              width="500"
              height="350"
              loading="lazy"
            />
            <b>Materials</b>
            <p>
              Board, paper and responsible alternatives selected for the
              structure.
            </p>
          </article>
          <article>
            <img
              src="/design/customization/hot-foil.webp"
              alt="Illustration: metallic foil lettering on forest green paper"
              width="500"
              height="350"
              loading="lazy"
            />
            <b>Finishes</b>
            <p>
              Foil, embossing, spot UV, tactile papers and controlled color.
            </p>
          </article>
          <article>
            <img
              src="/design/insert-editorial.webp"
              alt="Concept: shaped insert cavities for individual products"
              width="500"
              height="350"
              loading="lazy"
            />
            <b>Protection</b>
            <p>
              Paper, molded pulp, EVA and fabric-covered inserts around the
              product.
            </p>
          </article>
        </div>
      </section>
      <section className="process">
        <div>
          <p className="section-kicker light">Four project stages</p>
          <h2>
            Less guesswork.
            <br />
            <i>Better decisions.</i>
          </h2>
        </div>
        <ol>
          <li>
            <b>01</b>
            <span>
              <strong>Define the brief</strong>Size, structure, quantity,
              insert, finishes, market and target budget.
            </span>
          </li>
          <li>
            <b>02</b>
            <span>
              <strong>Engineer & sample</strong>Confirm construction, materials,
              artwork and physical sample.
            </span>
          </li>
          <li>
            <b>03</b>
            <span>
              <strong>Produce & inspect</strong>Production follows approved
              specifications with quality checks.
            </span>
          </li>
          <li>
            <b>04</b>
            <span>
              <strong>Pack & deliver</strong>Export packing and shipping terms
              are confirmed for the destination.
            </span>
          </li>
        </ol>
      </section>
      <section className="home-buying-guide" aria-labelledby="project-approvals">
        <header><p className="hp-kicker">Your approval checklist</p><h2 id="project-approvals">Know what is being approved at each stage.</h2><p>A structure sample, printed proof and packed shipping sample answer different questions. Agree on the purpose of each sample before ordering it, then record the approved version so later changes remain visible.</p></header>
        <div className="home-buying-table" role="region" aria-label="Packaging project stages and approvals" tabIndex={0}>
          <table><caption>Information and decisions from brief to shipment</caption><thead><tr><th scope="col">Stage</th><th scope="col">What to provide</th><th scope="col">What to confirm</th></tr></thead><tbody>
            <tr><th scope="row">Define the brief</th><td>Product samples or drawings, filled weight, quantity per design, destination and target launch date.</td><td>Opening style, items in each set, material direction and what is included in the quotation.</td></tr>
            <tr><th scope="row">Engineer and sample</th><td>Final product components, artwork files and references for colour and finishes.</td><td>Fit, removal access, closure, artwork placement and sample limitations. A plain structural sample does not approve colour.</td></tr>
            <tr><th scope="row">Produce and inspect</th><td>Written approval of the agreed sample and specification revision.</td><td>Inspection criteria, acceptable variation and any open changes before production is released.</td></tr>
            <tr><th scope="row">Pack and deliver</th><td>Delivery address, consignee details and agreed shipping terms.</td><td>Carton labels, packing arrangement, final carton count, dimensions and weight for freight confirmation.</td></tr>
          </tbody></table>
        </div>
        <div className="home-brief-checklist"><h3>What can trigger another sample?</h3><ul>
          <li>A different bottle, cap or label can change the insert fit even when the stated product volume stays the same.</li>
          <li>A board or paper substitution can change folding, wrapped corners or the clearance between lid and base.</li>
          <li>A new finish or artwork position may need a decorated sample before it can be approved.</li>
        </ul></div>
        <p>If something changes after approval, identify the affected drawing, material or artwork revision and reconfirm cost and timing before proceeding. Keep one current approval record rather than combining instructions from several email versions.</p>
        <p>For the acceptance details, review our <a className="ed-text-link" href="/quality-control">packaging quality-control stages</a>. Freight and production timing remain tied to the confirmed specification; an early estimate should be revisited when the packed configuration changes.</p>
      </section>
      <aside className="page-cta">
        <p>Planning resources</p>
        <h2>Resolve production details before the next physical sample.</h2>
        <a className="button" href="/insights/packaging-design-to-production-china">Design-to-Production Guide →</a>{' '}
        <a className="button" href="/insights/reduce-packaging-sampling-rounds">Sampling Checklist →</a>
      </aside>
      <aside className="page-cta">
        <p>Ready to define the brief?</p>
        <h2>Send Hugo your product size and expected quantity.</h2>
        <a className="button" href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%27d%20like%20to%20discuss%20a%20custom%20packaging%20project." target="_blank" rel="noreferrer">
          WhatsApp Hugo →
        </a>
      </aside>
      <RelatedPackagingStudies ids={["glass", "collector"]}/><SiteFooter />
    </main>
  );
}
