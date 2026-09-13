import RelatedPackagingStudies from "../../components/RelatedPackagingStudies";
import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { breadcrumb, organization, siteUrl, businessSummary } from "../../lib/seo";

export const metadata: Metadata = {
  title: "About MTT Packaging | Packaging Manufacturing Partner",
  description:
    businessSummary,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About MTT Packaging | Packaging Manufacturing Partner",
    description:
      businessSummary,
    url: "/about",
    images: ["/design/rigid-editorial.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: "About MTT Packaging",
      description:
        "MTT Packaging is a packaging development and manufacturing partner in Shenzhen, China.",
      url: `${siteUrl}/about`,
      about: {"@id": organization["@id"]},
    },
    organization,
    breadcrumb([
      ["Home", "/"],
      ["About", "/about"],
    ]),
  ],
};

/*
 * ABOUT PAGE — CONTENT POLICY
 *
 * This page uses ONLY verified information from the existing project.
 *
 * The following claims are NOT included because they cannot be verified:
 * - Factory size / square footage
 * - Number of employees
 * - Years in business
 * - Production capacity (units per month)
 * - Certifications (ISO, FSC, etc.)
 * - Customer names or logos
 * - Testimonials or reviews
 * - Export country statistics
 * - Machinery specifications
 *
 * TODO: Owner must provide verified information for:
 * 1. Company founding year (if desired)
 * 2. Factory location details (if desired)
 * 3. Verified certifications
 * 4. Real customer testimonials (with permission)
 * 5. Production capacity (if desired)
 * 6. Team size (if desired)
 */

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteNav />

      <header className="page-hero">
        <div>
          <p>About</p>
          <h1>Your Custom Packaging Partner in China</h1>
          <p>
            {businessSummary}
          </p>
        </div>
        <img
          src="/design/development-worktable.webp"
          alt="Illustrative packaging development still life with samples and materials"
          width="1200"
          height="900"
        />
      </header>

      <section className="about-section">
        <div>
          <p className="section-kicker">What we do</p>
          <h2>Custom packaging developed around your product.</h2>
        </div>
        <div>
          <p>
            MTT Packaging is a packaging development and manufacturing partner
            based in Shenzhen, China. We work with international brands to develop packaging
            structures, materials, finishes and inserts as one integrated system.
          </p>
          <p>
            Every project starts with a real product brief: dimensions, weight,
            fragility, sales channel, quantity and delivery destination. From
            that brief, we recommend a structure, select materials, engineer the
            insert, develop the artwork, coordinate a physical sample and manage
            production through suitable manufacturing capabilities, export packing and delivery.
          </p>
          <p>
            Our primary contact is Hugo He, who coordinates the commercial brief
            and project details from first review through delivery.
          </p>
        </div>
      </section>

      <section className="about-section about-capabilities">
        <div>
          <p className="section-kicker">Packaging capabilities</p>
          <h2>Structures, materials and finishes.</h2>
        </div>
        <div className="about-grid">
          <article>
            <h3>Rigid Boxes</h3>
            <p>
              Magnetic closure, lift-off lid, drawer, shoulder-neck and
              presentation structures in custom dimensions.
            </p>
          </article>
          <article>
            <h3>Folding Cartons</h3>
            <p>
              Premium paperboard cartons with specialty papers, printing and
              finishing for retail and e-commerce.
            </p>
          </article>
          <article><h3>Corrugated Packaging</h3><p>Roll-end mailers, shipping cartons and sleeve-and-tray structures, with board and packed protection reviewed for the product and delivery route.</p><a href="/packaging/corrugated-boxes">Explore corrugated packaging →</a></article>
          <article>
            <h3>Paper Bags</h3>
            <p>
              Branded paper bags with custom handles, printing and finishing for
              retail and gifting.
            </p>
          </article>
          <article>
            <h3>Custom Inserts</h3>
            <p>
              Paper, molded pulp, EVA and fabric-covered inserts engineered
              around product dimensions.
            </p>
          </article>
        </div>
      </section>

      <section className="about-section about-industries">
        <div>
          <p className="section-kicker">Industries served</p>
          <h2>Packaging for brands that care about presentation.</h2>
        </div>
        <div className="about-grid">
          <article>
            <h3>Perfume & Fragrance</h3>
            <p>
              Rigid boxes and inserts for perfume bottles, discovery sets and
              fragrance gift sets.
            </p>
          </article>
          <article>
            <h3>Cosmetics & Skincare</h3>
            <p>
              Packaging for serums, jars, palettes and multi-SKU skincare gift
              sets.
            </p>
          </article>
          <article>
            <h3>Jewelry & Watches</h3>
            <p>
              Compact rigid boxes, drawer cases and presentation packaging for
              fine products.
            </p>
          </article>
          <article>
            <h3>Gift Sets & PR Kits</h3>
            <p>
              Multi-product presentation packaging for corporate gifting,
              launches and influencer kits.
            </p>
          </article>
        </div>
      </section>

      <section className="about-section about-process">
        <div>
          <p className="section-kicker light">How projects work</p>
          <h2>From product brief to delivered packaging.</h2>
        </div>
        <ol className="about-steps">
          <li>
            <b>01</b>
            <div>
              <strong>Product brief</strong>
              <span>
                Dimensions, weight, quantity, structure, finishes, delivery
                country.
              </span>
            </div>
          </li>
          <li>
            <b>02</b>
            <div>
              <strong>Engineering & recommendation</strong>
              <span>
                Structure, materials, insert and finish options recommended.
              </span>
            </div>
          </li>
          <li>
            <b>03</b>
            <div>
              <strong>Quotation</strong>
              <span>
                Formal pricing with unit cost, tooling and lead time.
              </span>
            </div>
          </li>
          <li>
            <b>04</b>
            <div>
              <strong>Physical sample</strong>
              <span>
                Sample produced for approval before mass production.
              </span>
            </div>
          </li>
          <li>
            <b>05</b>
            <div>
              <strong>Production & inspection</strong>
              <span>
                Production follows approved specifications with quality checks.
              </span>
            </div>
          </li>
          <li>
            <b>06</b>
            <div>
              <strong>Export packing & delivery</strong>
              <span>
                Export packing and shipping terms confirmed for destination.
              </span>
            </div>
          </li>
        </ol>
      </section>

      {/*
       * TODO: The following sections require owner-verified information.
       * Do NOT add fabricated claims.
       *
       * SECTION: Certifications
       * - Only add if MTT Packaging holds verified certifications
       * - Examples: FSC, ISO 9001, BSCI, Sedex
       * - Include certificate numbers if available
       *
       * SECTION: Factory / Team
       * - Only add if owner provides verified factory information
       * - Include: location, size, team size, key capabilities
       * - Use real factory photos when available
       *
       * SECTION: Testimonials
       * - Only add with explicit customer permission
       * - Include: customer name, company, project type
       * - Never fabricate quotes or attributions
       */}

      <section className="about-section">
        <div><p className="section-kicker">Before you enquire</p><h2>What to expect from a custom packaging project.</h2></div>
        <div className="about-grid">
          <article><h3>Can I order a complete packaging set?</h3><p>Yes. Include the box, matching bag, insert, ribbon, card and tissue requirements in one brief. Specify quantities for each component; accessories and contents shown in product images are not automatically included.</p><a href="/products">Compare packaging options →</a></article>
          <article><h3>What information is needed for a quote?</h3><p>Send product length × width × height, weight, quantity, delivery country and your required date. Add a product photo and artwork link if available. Mark undecided materials or finishes so they can be reviewed with the specification.</p><a href="/request-a-quote">Send your brief →</a></article>
          <article><h3>What confirms price and delivery timing?</h3><p>The reviewed structure, materials, printing, finishes, quantity and shipping terms determine the quotation. Confirm sample costs, tooling and freight separately. A catalogue image does not establish a fixed price or lead time.</p><a href="/how-we-work">See the project process →</a></article>
          <article><h3>What should be approved before production?</h3><p>Review a physical sample for product fit, removal, opening, artwork placement and finishes. Confirm the approved specification and complete shipping pack. Screen previews cannot establish tolerances or protective performance.</p><a href="/quality-control">Review quality checkpoints →</a></article>
        </div>
      </section>

      <aside className="page-cta">
        <p>Ready to start a project?</p>
        <h2>Send your product details for a packaging recommendation.</h2>
        <a className="button" href="/request-a-quote">
          Request a Quote →
        </a>
      </aside>

      <RelatedPackagingStudies ids={["collector", "fragrance"]}/><SiteFooter />
    </main>
  );
}
