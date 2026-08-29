import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";

export const metadata: Metadata = {
  title: "About MTT Packaging | Custom Packaging Manufacturer",
  description:
    "MTT Packaging is a custom packaging manufacturer based in Shenzhen, China. We develop custom rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes for international brands.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About MTT Packaging | Custom Packaging Manufacturer",
    description:
      "Custom packaging manufacturer in Shenzhen, China. Rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes.",
    url: "/about",
    images: ["/capability-rigid-box.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: "About MTT Packaging",
      description:
        "MTT Packaging is a custom packaging manufacturer in Shenzhen, China.",
      url: `${siteUrl}/about`,
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
    <main className="about-page">
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
            MTT Packaging develops custom rigid boxes, folding cartons, paper
            bags and precision inserts for international brands. One contact.
            One engineering process. From brief to delivery.
          </p>
        </div>
        <img
          src="/hero/how-we-work.webp"
          alt="Packaging development worktable with samples and materials"
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
            MTT Packaging is a custom packaging manufacturer based in Shenzhen,
            China. We work with international brands to develop packaging
            structures, materials, finishes and inserts as one integrated system.
          </p>
          <p>
            Every project starts with a real product brief: dimensions, weight,
            fragility, sales channel, quantity and delivery destination. From
            that brief, we recommend a structure, select materials, engineer the
            insert, develop the artwork, produce a physical sample and manage
            production through to export packing and delivery.
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

      <aside className="page-cta">
        <p>Ready to start a project?</p>
        <h2>Send your product details for a packaging recommendation.</h2>
        <a className="button" href="/request-a-quote">
          Request a Quote →
        </a>
      </aside>

      <SiteFooter />
    </main>
  );
}
