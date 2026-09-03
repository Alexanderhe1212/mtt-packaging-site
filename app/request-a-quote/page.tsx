import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";
import CalcQuoteSummary from "../../components/CalcQuoteSummary";
import CalcPreFill from "../../components/CalcPreFill";

export const metadata: Metadata = {
  title: "Request a Quote | Custom Packaging | MTT Packaging",
  description:
    "Request a custom packaging quote from MTT Packaging. Send your product details, quantity and requirements. Typical response within 24 hours.",
  alternates: { canonical: "/request-a-quote" },
  openGraph: {
    title: "Request a Custom Packaging Quote | MTT Packaging",
    description: "Send your product details, quantity and requirements. Typical response within 24 hours.",
    url: "/request-a-quote",
    images: ["/hero/packaging-systems.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Request a Custom Packaging Quote",
      description: "Submit your packaging requirements to MTT Packaging.",
      url: `${siteUrl}/request-a-quote`,
    },
    organization,
    breadcrumb([
      ["Home", "/"],
      ["Request a Quote", "/request-a-quote"],
    ]),
  ],
};

export default function RequestAQuotePage() {
  return (
    <main style={{ background: "#f1eee5" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteNav />

      <header
        style={{
          padding: "64px 7vw",
          display: "grid",
          gridTemplateColumns: "minmax(0,1.1fr) minmax(340px,.72fr)",
          gap: "6vw",
          alignItems: "center",
          minHeight: "520px",
        }}
      >
        <div>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: ".18em",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            Request a Quote
          </p>
          <h1
            style={{
              font: "600 clamp(46px,4.8vw,70px)/1 Arial,Helvetica,sans-serif",
              letterSpacing: "-.055em",
              margin: "22px 0",
            }}
          >
            Get a Custom Packaging Quote
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.65, color: "#5f6961", maxWidth: "660px" }}>
            Send your product details and requirements. Hugo will review your
            project and respond within 24 hours with a packaging recommendation
            and quotation.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {[
            ["24h", "Response time"],
            ["500", "MOQ (pcs)"],
            ["Free", "Sampling"],
          ].map(([num, label]) => (
            <div
              key={num}
              style={{
                padding: "16px",
                background: "#f0ede5",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              <b style={{ display: "block", font: "600 28px/1 Arial,Helvetica,sans-serif", color: "#172019" }}>
                {num}
              </b>
              <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: ".1em", color: "#6b746d" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "1.3fr .7fr", gap: "48px", padding: "60px 7vw 100px", alignItems: "start" }}>
        <div>
          <h2 style={{ font: "600 32px/1.1 Arial,Helvetica,sans-serif", letterSpacing: "-.03em", margin: "0 0 8px" }}>
            Packaging Project Details
          </h2>
          <p style={{ fontSize: "14px", color: "#6b746d", lineHeight: 1.6, marginBottom: "28px" }}>
            Fields marked with <span style={{ color: "#cc4444", fontWeight: 700 }}>*</span> are required.
          </p>

          <form
            action="https://formspree.io/f/xyeyzwpw"
            method="POST"
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <input type="hidden" name="_subject" value="New RFQ from mttpackaging.com" />
            <input type="text" name="_gotcha" style={{ display: "none" }} aria-hidden="true" tabIndex={-1} />
            <CalcPreFill />

            <fieldset style={{ border: "1px solid rgba(23,32,25,.17)", borderRadius: "8px", padding: "24px", background: "#fff", display: "flex", flexDirection: "column", gap: "16px" }}>
              <legend style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#5f6961", padding: "0 8px" }}>
                Contact Information
              </legend>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                  <span>Full Name <span style={{ color: "#cc4444" }}>*</span></span>
                  <input name="name" type="text" required placeholder="Your name" style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none" }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                  <span>Business Email <span style={{ color: "#cc4444" }}>*</span></span>
                  <input name="email" type="email" required placeholder="you@company.com" style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none" }} />
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                  <span>Company / Brand</span>
                  <input name="company" type="text" placeholder="Company name" style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none" }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                  <span>Country <span style={{ color: "#cc4444" }}>*</span></span>
                  <input name="country" type="text" required placeholder="e.g. United States" style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none" }} />
                </label>
              </div>
            </fieldset>

            <fieldset style={{ border: "1px solid rgba(23,32,25,.17)", borderRadius: "8px", padding: "24px", background: "#fff", display: "flex", flexDirection: "column", gap: "16px" }}>
              <legend style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#5f6961", padding: "0 8px" }}>
                Packaging Requirements
              </legend>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                  <span>Packaging Type <span style={{ color: "#cc4444" }}>*</span></span>
                  <select name="packagingType" required style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none", cursor: "pointer" }}>
                    <option value="">Select type</option>
                    <option value="Rigid Box">Rigid Box</option>
                    <option value="Magnetic Closure Box">Magnetic Closure Box</option>
                    <option value="Drawer Box">Drawer Box</option>
                    <option value="Shoulder-Neck Box">Shoulder-Neck Box</option>
                    <option value="Folding Carton">Folding Carton</option>
                    <option value="Paper Bag">Paper Bag</option>
                    <option value="Custom Insert">Custom Insert</option>
                    <option value="Gift Box Set">Gift Box Set</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                  <span>Estimated Quantity <span style={{ color: "#cc4444" }}>*</span></span>
                  <select name="quantity" required style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none", cursor: "pointer" }}>
                    <option value="">Select quantity</option>
                    <option value="500-999">500–999</option>
                    <option value="1,000-2,999">1,000–2,999</option>
                    <option value="3,000-4,999">3,000–4,999</option>
                    <option value="5,000-9,999">5,000–9,999</option>
                    <option value="10,000+">10,000+</option>
                  </select>
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                  <span>Box Dimensions (L × W × H)</span>
                  <input name="boxDimensions" type="text" placeholder="e.g. 200 × 150 × 80 mm" style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none" }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                  <span>Product Dimensions</span>
                  <input name="productDimensions" type="text" placeholder="e.g. 180 × 130 × 60 mm" style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none" }} />
                </label>
              </div>
            </fieldset>

            {/* Calculator data summary — renders nothing if no calculator data */}
            <CalcQuoteSummary />

            <fieldset style={{ border: "1px solid rgba(23,32,25,.17)", borderRadius: "8px", padding: "24px", background: "#fff", display: "flex", flexDirection: "column", gap: "16px" }}>
              <legend style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#5f6961", padding: "0 8px" }}>
                Project Details
              </legend>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                <span>Message / Project Details</span>
                <textarea name="message" rows={5} placeholder="Describe your packaging project: materials, finishes, insert requirements, target delivery date, budget range." style={{ background: "#fff", border: "1px solid #d0c9b8", borderRadius: "6px", color: "#172019", padding: "11px 14px", font: "14px Arial", outline: "none", resize: "vertical" }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#5f6961" }}>
                <span>Attach Artwork or Reference Files</span>
                <small style={{ fontSize: "12px", color: "#5f6961", lineHeight: 1.6 }}>
                  Please email artwork and reference files to{" "}
                  <a href="mailto:info@mttpackaging.com" style={{ fontWeight: 700, color: "#172019" }}>info@mttpackaging.com</a>
                  {" "}after submitting this form.
                </small>
              </label>
            </fieldset>

            <div style={{ textAlign: "center", paddingTop: "8px" }}>
              <button
                type="submit"
                style={{
                  background: "#d6ee73",
                  color: "#172019",
                  border: 0,
                  padding: "16px 48px",
                  borderRadius: "999px",
                  font: "700 15px Arial",
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                Submit Quote Request →
              </button>
              <p style={{ fontSize: "13px", color: "#6b746d", lineHeight: 1.6, marginTop: "16px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
                Your project details are handled confidentially. Hugo will respond within 24 hours.
              </p>
              <p style={{ fontSize: "13px", color: "#6b746d", marginTop: "12px" }}>
                Prefer to discuss directly?{" "}
                <a href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%27d%20like%20to%20discuss%20a%20custom%20packaging%20project." target="_blank" rel="noreferrer" style={{ color: "#172019", fontWeight: 700, textDecoration: "underline" }}>
                  WhatsApp Hugo
                </a>{" "}
                or email{" "}
                <a href="mailto:info@mttpackaging.com" style={{ color: "#172019", fontWeight: 700, textDecoration: "underline" }}>
                  info@mttpackaging.com
                </a>
              </p>
            </div>
          </form>
        </div>

        <aside style={{ position: "sticky", top: "100px" }}>
          <div style={{ background: "#fff", border: "1px solid rgba(23,32,25,.17)", borderRadius: "8px", padding: "24px", marginBottom: "20px" }}>
            <h3 style={{ font: "600 18px/1.2 Arial,Helvetica,sans-serif", margin: "0 0 16px" }}>What happens next?</h3>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                ["Project review", "Hugo reviews your product details, structure and quantity"],
                ["Packaging recommendation", "Structure, materials, inserts and finishes suggested"],
                ["Formal quotation", "Detailed pricing with unit cost and tooling"],
                ["Physical sample", "Sample produced for your approval"],
                ["Production", "Mass production with quality inspection"],
              ].map(([title, desc]) => (
                <li key={title} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <b style={{ fontSize: "13px", fontWeight: 700 }}>{title}</b>
                  <span style={{ fontSize: "12px", color: "#6b746d", lineHeight: 1.5 }}>{desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div style={{ background: "#fff", border: "1px solid rgba(23,32,25,.17)", borderRadius: "8px", padding: "24px" }}>
            <h3 style={{ font: "600 18px/1.2 Arial,Helvetica,sans-serif", margin: "0 0 16px" }}>What to include</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "Finished internal dimensions (L × W × H)",
                "Product weight and fragility",
                "Preferred structure (or let us recommend)",
                "Quantity and delivery country",
                "Artwork files or brand guidelines",
                "Finish references (foil, emboss, etc.)",
                "Target budget range (optional)",
              ].map((item) => (
                <li key={item} style={{ fontSize: "13px", color: "#5f6961", paddingLeft: "16px", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#253c2e" }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
