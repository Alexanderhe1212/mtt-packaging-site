import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { industries } from "../../lib/industries";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";
import { solutions } from "../../lib/solutions";
export const metadata: Metadata = {
  title: "Custom Packaging Structures | MTT Packaging",
  description:
    "Compare high-end rigid boxes, folding cartons, paper bags and custom inserts by structure, product fit and presentation needs.",
  alternates: { canonical: "/packaging" },
  openGraph: {
    title: "Custom Packaging Structures | MTT Packaging",
    description: "Compare high-end packaging structures around product fit, protection and presentation.",
    url: "/packaging",
    images: ["/hero/packaging-systems.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/packaging#page`,
      name: "Custom Packaging Structures",
      url: `${siteUrl}/packaging`,
      description: "High-end custom packaging structures for premium products.",
      about: solutions.map(({ title, copy }) => ({
        "@type": "Service", name: title, description: copy,
        provider: { "@id": `${siteUrl}/#organization` },
      })),
    },
    organization,
    breadcrumb([["Home", "/"], ["Packaging", "/packaging"]]),
  ],
};
export default function PackagingPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <div>
          <p>Packaging systems</p>
          <h1>Choose the structure around the product.</h1>
          <p>
            Compare industry needs, box formats and insert directions before
            sampling and formal pricing.
          </p>
        </div>
        <img
          src="/hero/packaging-systems.webp"
          alt="High-end custom rigid boxes, folding carton and precision insert systems"
          width="900"
          height="900"
        />
      </header>
      <section className="industry-index">
        <div className="section-head">
          <div>
            <p className="section-kicker">Packaging by market</p>
            <h2>
              Start with what
              <br />
              you need to pack.
            </h2>
          </div>
          <p>
            Each category creates different demands for protection, presentation
            and distribution.
          </p>
        </div>
        <div className="industry-grid">
          {industries.map((item, index) => (
            <a href={`/industries/${item.slug}`} key={item.slug}>
              <span>0{index + 1}</span>
              <img
                src={item.image}
                alt={item.imageAlt}
                width="700"
                height="700"
              />
              <p>{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <small>Explore options →</small>
            </a>
          ))}
        </div>
      </section>
      <section className="solutions">
        <div className="section-head">
          <div>
            <p className="section-kicker">Core capabilities</p>
            <h2>Four packaging families</h2>
          </div>
          <p>
            Product dimensions, quantity and target presentation determine the
            practical route.
          </p>
        </div>
        <div className="solution-grid">
          {solutions.map((item) => (
            <article className={`solution-card ${item.tone}`} key={item.title}>
              <span>{item.n}</span>
              <img
                className="capability-image"
                src={item.image}
                alt={item.alt}
                width="900"
                height="900"
              />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%27d%20like%20to%20discuss%20a%20custom%20packaging%20structure." target="_blank" rel="noreferrer">Discuss this structure →</a>
            </article>
          ))}
        </div>
      </section>
      <section className="decision">
        <div>
          <p className="section-kicker light">Rigid box systems</p>
          <h2>
            Six structures.
            <br />
            <i>Different jobs.</i>
          </h2>
          <p>
            Structure should follow product weight, opening sequence, budget,
            storage and distribution.
          </p>
        </div>
        <div className="decision-grid">
          {[
            ["Magnetic book style", "Launch kits and premium sets."],
            ["Lid & base", "A clean lift-off reveal."],
            ["Drawer box", "A deliberate sliding reveal."],
            ["Shoulder-neck", "Precise fit and layered color."],
            ["Fold-flat rigid", "Reduced storage volume when suitable."],
            ["Custom interior", "Retention, protection and reveal."],
          ].map(([t, c], i) => (
            <article key={t}>
              <img
                src={`/structure/structure-${i + 1}.webp`}
                alt={`${t} high-end custom packaging concept`}
                width="700"
                height="700"
              />
              <b>0{i + 1}</b>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
