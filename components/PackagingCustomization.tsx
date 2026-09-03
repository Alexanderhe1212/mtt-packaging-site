"use client";

import { useState } from "react";

const TABS = ["Specifications", "Materials", "Finishing", "Add-Ons", "Printing"] as const;

/* ── Specifications ── */
const specs: [string, string][] = [
  ["Custom Size", "Made to fit the product and selected packaging structure"],
  ["MOQ", "From 500 pcs per design"],
  ["Packaging Types", "Rigid Boxes, Folding Cartons, Paper Bags, Custom Inserts"],
  ["Structure", "Standard structures or custom structural development"],
  ["Artwork", "Customer artwork or production-ready design files"],
  ["Sampling", "Physical sample available before mass production"],
  ["Insert Options", "Paperboard, Molded Pulp, EVA and Fabric-Covered Inserts"],
  ["Production Lead Time", "Confirmed after structure, quantity, materials and finishing are finalized"],
  ["Shipping", "Export packing and international delivery support"],
];

/* ── Materials ── */
const materials: { name: string; desc: string; img?: string; alt?: string; pos?: string }[] = [
  { name: "Greyboard", desc: "Rigid board commonly used as the structural core of premium rigid boxes.", img: "/capability-rigid-box.webp", alt: "Greyboard rigid box structure", pos: "center 30%" },
  { name: "Paperboard", desc: "Printable paperboard suitable for folding cartons and lightweight packaging structures.", img: "/capability-folding-cartons.webp", alt: "Printed paperboard folding cartons", pos: "center 40%" },
  { name: "Specialty Paper", desc: "Textured, colored or decorative papers used to create a more distinctive premium presentation.", img: "/sustainability/documented-sourcing.webp", alt: "Specialty paper material samples", pos: "center" },
  { name: "Kraft Paper", desc: "A natural paper option suitable for selected cartons, bags and environmentally considered packaging concepts.", img: "/sustainability/paper-based-options.webp", alt: "Natural kraft paper packaging", pos: "center 35%" },
  { name: "Corrugated Board", desc: "A stronger board structure used where additional protection and transport performance is required.", img: "/sustainability/material-reduction.webp", alt: "Corrugated board packaging material", pos: "center 45%" },
  { name: "Molded Pulp", desc: "A formed fiber-based insert option for selected products requiring fitted protection.", img: "/capability-custom-inserts.webp", alt: "Molded pulp protective insert", pos: "center 60%" },
];

/* ── Finishing ── */
const finishing: { name: string; desc: string; img?: string; alt?: string; pos?: string }[] = [
  { name: "Hot Foil Stamping", desc: "Metallic foil details for logos, typography and decorative accents.", img: "/capability-rigid-box.webp", alt: "Gold foil stamped logo on rigid box", pos: "25% 20%" },
  { name: "Embossing", desc: "Raised surface detailing that adds tactile depth to selected graphics or logos." },
  { name: "Debossing", desc: "Pressed-in detailing for a refined and understated tactile effect." },
  { name: "Spot UV", desc: "Selective gloss treatment used to create contrast against matte or uncoated surfaces." },
  { name: "Lamination", desc: "Protective surface finishing available in selected matte, gloss or soft-touch effects.", img: "/capability-folding-cartons.webp", alt: "Laminated carton surface finish", pos: "60% center" },
  { name: "Texture / Specialty Finish", desc: "Selected textured papers and surface treatments for more distinctive premium packaging.", img: "/sustainability/documented-sourcing.webp", alt: "Textured specialty paper surface", pos: "30% center" },
];

/* ── Add-Ons ── */
const addons: { name: string; desc: string; img?: string; alt?: string; pos?: string }[] = [
  { name: "Custom Inserts", desc: "Fitted internal structures designed around product protection and presentation.", img: "/capability-custom-inserts.webp", alt: "Custom fitted packaging insert", pos: "center 35%" },
  { name: "Magnetic Closure", desc: "Integrated magnetic closure for selected rigid box structures.", img: "/structure/structure-1.webp", alt: "Magnetic closure rigid box", pos: "center 40%" },
  { name: "Ribbon Pull", desc: "Ribbon details used for drawer boxes, product lifting or presentation.", img: "/structure/structure-3.webp", alt: "Drawer box with ribbon pull", pos: "center 45%" },
  { name: "Window Cut-Out", desc: "Custom die-cut windows for selected carton or packaging structures.", img: "/capability-folding-cartons.webp", alt: "Carton with die-cut window", pos: "70% 30%" },
  { name: "Sleeves", desc: "Printed or decorative outer sleeves used to add branding or presentation layers.", img: "/structure/structure-5.webp", alt: "Packaging sleeve structure", pos: "center 50%" },
  { name: "Handles", desc: "Paper, ribbon or other suitable handle solutions for custom paper bags.", img: "/capability-paper-bags.webp", alt: "Paper bag with handle detail", pos: "center 30%" },
];

/* ── Printing ── */
const printing: { name: string; desc: string; img?: string; alt?: string; pos?: string }[] = [
  { name: "CMYK Printing", desc: "Full-color printing for artwork, photography and branded graphics.", img: "/capability-folding-cartons.webp", alt: "Full-color CMYK printed carton", pos: "center 35%" },
  { name: "Pantone / PMS Colors", desc: "Spot-color matching where more controlled brand color reproduction is required.", img: "/capability-rigid-box.webp", alt: "Spot-color Pantone matched packaging", pos: "40% 25%" },
  { name: "Offset Printing", desc: "High-quality commercial printing commonly used for premium paper packaging production.", img: "/capability-paper-bags.webp", alt: "Offset printed paper bag", pos: "center 55%" },
  { name: "Digital Printing", desc: "Useful for selected samples, prototypes and lower-volume applications where appropriate.", img: "/capability-folding-cartons.webp", alt: "Digitally printed packaging sample", pos: "30% 60%" },
  { name: "Screen Printing", desc: "Suitable for selected materials, finishes and specialized graphic applications where appropriate.", img: "/capability-paper-bags.webp", alt: "Screen printed packaging detail", pos: "center 70%" },
  { name: "No Printing / Material-Led Finish", desc: "For packaging concepts where paper texture, foil, embossing or structural design carries the visual identity.", img: "/sustainability/documented-sourcing.webp", alt: "Premium unprinted textured material", pos: "center" },
];

const TAB_DATA: Record<string, { name: string; desc: string; img?: string; alt?: string; pos?: string }[]> = {
  Materials: materials,
  Finishing: finishing,
  "Add-Ons": addons,
  Printing: printing,
};

/* ── Sub-components ── */

function SpecTable() {
  return (
    <div className="cz-spec-table">
      {specs.map(([label, value]) => (
        <div className="cz-spec-row" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ items }: { items: { name: string; desc: string; img?: string; alt?: string; pos?: string }[] }) {
  return (
    <div className="cz-grid">
      {items.map((item) => (
        <article className={`cz-card${item.img ? " cz-card-visual" : ""}`} key={item.name}>
          {item.img ? (
            <div className="cz-card-img-wrap">
              <img
                src={item.img}
                alt={item.alt || item.name}
                className="cz-card-img"
                style={item.pos ? { objectPosition: item.pos } : undefined}
                loading="lazy"
                width="600"
                height="400"
              />
            </div>
          ) : (
            <div className="cz-card-img-placeholder" aria-hidden="true">
              <span>{item.name}</span>
            </div>
          )}
          <div className="cz-card-body">
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ── Main Component ── */

export default function PackagingCustomization() {
  const [active, setActive] = useState(0);

  return (
    <section className="cz-section" aria-label="Packaging Customization Options">
      {/* Header */}
      <div className="cz-header">
        <p className="section-kicker">Customization Options</p>
        <h2>Build the Packaging Around Your Product</h2>
        <p className="cz-intro">
          Choose the size, materials, printing, finishes and internal components
          around your product, brand positioning and distribution requirements.
        </p>
      </div>

      {/* Tab nav */}
      <div className="cz-tabs" role="tablist" aria-label="Customization categories">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            role="tab"
            aria-selected={i === active}
            aria-controls={`cz-panel-${i}`}
            id={`cz-tab-${i}`}
            className={`cz-tab${i === active ? " cz-tab-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab panels — all rendered for SEO; only active is visible */}
      {TABS.map((tab, i) => (
        <div
          key={tab}
          id={`cz-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`cz-tab-${i}`}
          hidden={i !== active}
          className="cz-panel"
        >
          {tab === "Specifications" ? <SpecTable /> : <CardGrid items={TAB_DATA[tab]!} />}
        </div>
      ))}

      {/* CTA */}
      <div className="cz-cta">
        <h3>Not Sure Which Combination Fits Your Product?</h3>
        <p>
          Share your product dimensions, quantity and presentation requirements.
          Our team can recommend a suitable structure, material and finishing
          direction before sampling.
        </p>
        <div className="cz-cta-actions">
          <a className="button" href="/request-a-quote">
            Discuss Your Packaging Project →
          </a>
          <a
            className="cz-wa-link"
            href="https://wa.me/8617207110964?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20custom%20packaging%20project."
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
