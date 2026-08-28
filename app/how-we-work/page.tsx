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
    images: ["/hero/how-we-work.webp"],
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
    <main>
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
          src="/hero/how-we-work.webp"
          alt="Packaging development worktable with sample, caliper and material swatches"
          width="1200"
          height="900"
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
              src="/sustainability/documented-sourcing.webp"
              alt="Premium paper and board materials"
              width="500"
              height="350"
            />
            <b>Materials</b>
            <p>
              Board, paper and responsible alternatives selected for the
              structure.
            </p>
          </article>
          <article>
            <img
              src="/capability-folding-cartons.webp"
              alt="Premium print and finishing details"
              width="500"
              height="350"
            />
            <b>Finishes</b>
            <p>
              Foil, embossing, spot UV, tactile papers and controlled color.
            </p>
          </article>
          <article>
            <img
              src="/sustainability/paper-based-options.webp"
              alt="Paper-based protective inserts"
              width="500"
              height="350"
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
      <aside className="page-cta">
        <p>Ready to define the brief?</p>
        <h2>Send Hugo your product size and expected quantity.</h2>
        <a className="button" href="/#contact">
          Start a project →
        </a>
      </aside>
      <SiteFooter />
    </main>
  );
}
