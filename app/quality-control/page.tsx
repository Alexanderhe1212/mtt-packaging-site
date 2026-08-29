import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Quality Control | MTT Packaging",
  description:
    "MTT Packaging quality control process: material inspection, color control, printing inspection, finishing, assembly, insert fit, final inspection and packing.",
  alternates: { canonical: "/quality-control" },
  openGraph: {
    title: "Quality Control | MTT Packaging",
    description:
      "How MTT Packaging inspects materials, printing, finishing, assembly and packing for custom packaging projects.",
    url: "/quality-control",
    images: ["/hero/how-we-work.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Quality Control at MTT Packaging",
      description:
        "Quality control checkpoints for custom packaging production at MTT Packaging.",
      url: `${siteUrl}/quality-control`,
    },
    organization,
    breadcrumb([
      ["Home", "/"],
      ["Quality Control", "/quality-control"],
    ]),
  ],
};

/*
 * QUALITY CONTROL PAGE — CONTENT POLICY
 *
 * This page describes quality control checkpoints that are standard in
 * custom packaging production. The checkpoints listed below are industry-standard
 * and apply to the types of packaging MTT produces.
 *
 * TODO: Owner must verify and provide:
 * 1. Specific QC inspection criteria and tolerances
 * 2. Real QC photos from actual production
 * 3. Any certifications (ISO 9001, etc.) — only if actually held
 * 4. Specific defect rates or quality statistics — only if verified
 * 5. Third-party inspection capabilities
 * 6. Customer-approved QC standards
 */

export default function QualityControlPage() {
  return (
    <main className="qc-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteNav />

      <header className="page-hero">
        <div>
          <p>Quality Control</p>
          <h1>Packaging Quality Inspected at Every Stage</h1>
          <p>
            Quality control is applied from material inspection through final
            packing. Each checkpoint is designed to catch issues before they
            reach the finished packaging.
          </p>
        </div>
        <img
          src="/hero/how-we-work.webp"
          alt="Packaging quality inspection process"
          width="1200"
          height="900"
        />
      </header>

      <section className="qc-section">
        <div>
          <p className="section-kicker">Quality checkpoints</p>
          <h2>Inspection from material to delivery.</h2>
        </div>
        <div className="qc-grid">
          <article>
            <b>01</b>
            <h3>Material Inspection</h3>
            <p>
              Board thickness, density, paper weight and surface quality are
              checked against specifications before production begins.
            </p>
          </article>
          <article>
            <b>02</b>
            <h3>Color Control</h3>
            <p>
              Print colors are compared against Pantone references and approved
              proofs. Substrate, coating and ink batch are considered.
            </p>
          </article>
          <article>
            <b>03</b>
            <h3>Printing Inspection</h3>
            <p>
              Registration, ink coverage, dot sharpness, text clarity and
              alignment are checked during and after print runs.
            </p>
          </article>
          <article>
            <b>04</b>
            <h3>Surface Finishing</h3>
            <p>
              Foil adhesion, emboss depth, deboss clarity, spot UV registration
              and lamination quality are inspected per specification.
            </p>
          </article>
          <article>
            <b>05</b>
            <h3>Die Cutting & Creasing</h3>
            <p>
              Cut accuracy, crease depth, fold alignment and edge quality are
              checked to ensure clean assembly.
            </p>
          </article>
          <article>
            <b>06</b>
            <h3>Assembly</h3>
            <p>
              Box assembly is checked for corner alignment, wrap adhesion,
              opening/closing feel and overall construction quality.
            </p>
          </article>
          <article>
            <b>07</b>
            <h3>Insert Fit</h3>
            <p>
              Product insertion, retention, shake movement and removal are
              tested with actual product or approved mock-up.
            </p>
          </article>
          <article>
            <b>08</b>
            <h3>Final Inspection</h3>
            <p>
              Finished units are inspected for visual defects, dimensional
              accuracy, functional performance and specification compliance.
            </p>
          </article>
          <article>
            <b>09</b>
            <h3>Packing Inspection</h3>
            <p>
              Inner packing, carton count, labeling, export packing and
              shipping marks are verified before dispatch.
            </p>
          </article>
        </div>
      </section>

      <section className="qc-section qc-approach">
        <div>
          <p className="section-kicker">Approach</p>
          <h2>Quality is built into the process.</h2>
        </div>
        <div>
          <p>
            Quality control starts before production. The physical sample
            establishes the approved standard for structure, material, print,
            finishing and insert fit. Production follows the approved sample
            specification.
          </p>
          <p>
            During production, inspection is applied at each stage—material,
            printing, finishing, assembly and packing—not only at the end.
            Issues found early are easier and less costly to correct.
          </p>
          <p>
            For projects requiring third-party inspection, MTT Packaging can
            coordinate with inspection services selected by the buyer.
          </p>
        </div>
      </section>

      {/*
       * TODO: The following require owner-verified information.
       *
       * SECTION: Certifications
       * - Only add if MTT Packaging holds verified certifications
       * - Examples: ISO 9001, BSCI, Sedex
       * - Include certificate numbers and validity
       *
       * SECTION: Inspection equipment
       * - Only add if owner provides verified equipment list
       * - Examples: spectrophotometer, caliper, drop test equipment
       *
       * SECTION: QC statistics
       * - Only add verified defect rates or quality metrics
       * - Never fabricate numbers
       *
       * SECTION: Real QC photos
       * - Add actual inspection photos when available
       * - Replace placeholder images with real production evidence
       */}

      <aside className="page-cta">
        <p>Have a packaging project?</p>
        <h2>Send your product details for a packaging recommendation.</h2>
        <a className="button" href="/request-a-quote">
          Request a Quote →
        </a>
      </aside>

      <SiteFooter />
    </main>
  );
}
