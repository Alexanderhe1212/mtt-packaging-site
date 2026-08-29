import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "../../components/SiteNav";
import { breadcrumb, organization, siteUrl } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Request a Quote | Custom Packaging | MTT Packaging",
  description:
    "Request a custom packaging quote from MTT Packaging. Send your product details, quantity and requirements. Typical response within 24 hours.",
  alternates: { canonical: "/request-a-quote" },
  openGraph: {
    title: "Request a Custom Packaging Quote | MTT Packaging",
    description:
      "Send your packaging requirements and receive a custom quote within 24 hours. MOQ from 500 pcs.",
    url: "/request-a-quote",
    images: ["/capability-rigid-box.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Request a Custom Packaging Quote",
      description:
        "Submit your packaging requirements to MTT Packaging for a custom quotation.",
      url: `${siteUrl}/request-a-quote`,
    },
    organization,
    breadcrumb([
      ["Home", "/"],
      ["Request a Quote", "/request-a-quote"],
    ]),
  ],
};

/*
 * RFQ FORM SUBMISSION — BACKEND INTEGRATION REQUIRED
 *
 * Current state: FRONTEND ONLY
 * The form currently uses a mailto: fallback to send form data via the user's email client.
 * This is NOT a reliable production solution.
 *
 * TODO: Integrate one of the following backend services:
 *
 * Option 1: Formspree (https://formspree.io)
 *   - Free tier: 50 submissions/month
 *   - Add form action: https://formspree.io/f/YOUR_FORM_ID
 *   - Method: POST
 *   - No backend required
 *
 * Option 2: EmailJS (https://www.emailjs.com/)
 *   - Free tier: 200 emails/month
 *   - Client-side SDK, no backend required
 *   - Requires account setup and template configuration
 *
 * Option 3: Custom API endpoint
 *   - Build a serverless function (Vercel, Cloudflare Workers, etc.)
 *   - Handle form submission, file upload, email notification
 *   - Store submissions in database for backup
 *
 * Option 4: Netlify Forms (if migrating to Netlify)
 *   - Built-in form handling
 *   - Free tier: 100 submissions/month
 *
 * IMPORTANT:
 * - Do NOT expose API keys in client-side code
 * - Implement spam protection (honeypot, reCAPTCHA, or similar)
 * - Store submissions as backup (not just email)
 * - Create /thank-you/ page ONLY after submission is verified working
 * - Track RFQ submission as GA4 conversion event
 */

export default function RequestAQuotePage() {
  return (
    <main className="rfq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteNav />

      <header className="page-hero">
        <div>
          <p>Request a Quote</p>
          <h1>Get a Custom Packaging Quote</h1>
          <p>
            Send your product details and requirements. Hugo will review your
            project and respond within 24 hours with a packaging recommendation
            and quotation.
          </p>
        </div>
        <div className="rfq-trust">
          <div>
            <b>24h</b>
            <span>Typical response time</span>
          </div>
          <div>
            <b>500</b>
            <span>Minimum order quantity</span>
          </div>
          <div>
            <b>Free</b>
            <span>Sampling available</span>
          </div>
        </div>
      </header>

      <section className="rfq-form-section">
        <div className="rfq-form-container">
          <h2>Packaging Project Details</h2>
          <p>
            Fields marked with <span className="rfq-required">*</span> are
            required. All artwork and project details are handled confidentially.
          </p>

          {/*
           * FORM SUBMISSION HANDLER
           *
           * Current: mailto: fallback (temporary)
           * TODO: Replace with proper backend submission (see comment at top of file)
           *
           * When backend is integrated:
           * 1. Change form action to backend endpoint
           * 2. Add method="POST" and enctype="multipart/form-data"
           * 3. Remove onSubmit mailto handler
           * 4. Add proper success/error state handling
           * 5. Redirect to /thank-you/ on success
           * 6. Track submission as GA4 conversion event
           */}
          <form
            className="rfq-form"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name = fd.get("name");
              const email = fd.get("email");
              const company = fd.get("company");
              const country = fd.get("country");
              const packagingType = fd.get("packagingType");
              const quantity = fd.get("quantity");
              const boxDimensions = fd.get("boxDimensions");
              const productDimensions = fd.get("productDimensions");
              const message = fd.get("message");
              const subject = `RFQ: ${packagingType} - ${quantity} - ${company} (${country})`;
              const body = `PACKAGING QUOTE REQUEST\n${"=".repeat(40)}\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nCountry: ${country}\n\nPackaging Type: ${packagingType}\nQuantity: ${quantity}\n\nBox Dimensions: ${boxDimensions || "Not specified"}\nProduct Dimensions: ${productDimensions || "Not specified"}\n\nProject Details:\n${message || "Not specified"}\n\n${"=".repeat(40)}\nSubmitted via mttpackaging.com/request-a-quote`;
              window.location.href = `mailto:info@mttpackaging.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              /*
               * TODO: Replace above mailto with proper form submission:
               *
               * try {
               *   const response = await fetch('/api/rfq', {
               *     method: 'POST',
               *     body: fd,
               *   });
               *   if (response.ok) {
               *     window.location.href = '/thank-you/';
               *   } else {
               *     setError('Submission failed. Please try again or email us directly.');
               *   }
               * } catch (err) {
               *   setError('Network error. Please try again or email us directly.');
               * }
               */
            }}
          >
            {/* Contact Information */}
            <fieldset className="rfq-fieldset">
              <legend>Contact Information</legend>
              <div className="rfq-grid-2">
                <label className="rfq-label">
                  <span>
                    Full Name <span className="rfq-required">*</span>
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="form-input"
                  />
                </label>
                <label className="rfq-label">
                  <span>
                    Business Email <span className="rfq-required">*</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="form-input"
                  />
                </label>
              </div>
              <div className="rfq-grid-2">
                <label className="rfq-label">
                  <span>Company / Brand</span>
                  <input
                    name="company"
                    type="text"
                    placeholder="Company or brand name"
                    className="form-input"
                  />
                </label>
                <label className="rfq-label">
                  <span>
                    Country <span className="rfq-required">*</span>
                  </span>
                  <input
                    name="country"
                    type="text"
                    required
                    placeholder="e.g. United States"
                    className="form-input"
                  />
                </label>
              </div>
            </fieldset>

            {/* Packaging Requirements */}
            <fieldset className="rfq-fieldset">
              <legend>Packaging Requirements</legend>
              <div className="rfq-grid-2">
                <label className="rfq-label">
                  <span>
                    Packaging Type <span className="rfq-required">*</span>
                  </span>
                  <select name="packagingType" required className="form-input">
                    <option value="">Select packaging type</option>
                    <option value="Rigid Box">Rigid Box</option>
                    <option value="Magnetic Closure Box">
                      Magnetic Closure Box
                    </option>
                    <option value="Drawer Box">Drawer Box</option>
                    <option value="Shoulder-Neck Box">
                      Shoulder-Neck Box
                    </option>
                    <option value="Folding Carton">Folding Carton</option>
                    <option value="Paper Bag">Paper Bag</option>
                    <option value="Custom Insert">Custom Insert</option>
                    <option value="Gift Box Set">Gift Box Set</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className="rfq-label">
                  <span>
                    Estimated Quantity <span className="rfq-required">*</span>
                  </span>
                  <select name="quantity" required className="form-input">
                    <option value="">Select quantity</option>
                    <option value="500-999">500–999</option>
                    <option value="1,000-2,999">1,000–2,999</option>
                    <option value="3,000-4,999">3,000–4,999</option>
                    <option value="5,000-9,999">5,000–9,999</option>
                    <option value="10,000+">10,000+</option>
                  </select>
                </label>
              </div>
              <div className="rfq-grid-2">
                <label className="rfq-label">
                  <span>Box Dimensions (L × W × H)</span>
                  <input
                    name="boxDimensions"
                    type="text"
                    placeholder="e.g. 200 × 150 × 80 mm"
                    className="form-input"
                  />
                </label>
                <label className="rfq-label">
                  <span>Product Dimensions</span>
                  <input
                    name="productDimensions"
                    type="text"
                    placeholder="e.g. 180 × 130 × 60 mm"
                    className="form-input"
                  />
                </label>
              </div>
            </fieldset>

            {/* Project Details */}
            <fieldset className="rfq-fieldset">
              <legend>Project Details</legend>
              <label className="rfq-label rfq-full">
                <span>Message / Project Details</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Describe your packaging project: materials, finishes, insert requirements, target delivery date, budget range, or any special requirements."
                  className="form-input"
                />
              </label>
              <label className="rfq-label rfq-full">
                <span>Attach Artwork or Reference Files</span>
                <input
                  name="files"
                  type="file"
                  multiple
                  accept=".pdf,.ai,.eps,.psd,.jpg,.jpeg,.png,.zip"
                  className="rfq-file-input"
                />
                <small>
                  Accepted formats: PDF, AI, EPS, PSD, JPG, PNG, ZIP (max 25MB
                  per file)
                </small>
                {/*
                 * TODO: File upload requires backend integration.
                 * The file input is present for UX but files cannot be sent via mailto:.
                 * When backend is integrated, files will be uploaded to the server.
                 */}
              </label>
            </fieldset>

            {/* Submit */}
            <div className="rfq-submit-section">
              <button type="submit" className="button rfq-submit">
                Submit Quote Request →
              </button>
              <p className="rfq-note">
                Your project details are handled confidentially. Hugo will
                review your requirements and respond within 24 hours with a
                packaging recommendation and quotation.
              </p>
              <p className="rfq-alt-contact">
                Prefer to discuss directly?{" "}
                <a
                  href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%27d%20like%20to%20discuss%20a%20custom%20packaging%20project."
                  target="_blank"
                  rel="noreferrer"
                >
                  Message Hugo on WhatsApp
                </a>{" "}
                or email{" "}
                <a href="mailto:info@mttpackaging.com">
                  info@mttpackaging.com
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <aside className="rfq-sidebar">
          <div className="rfq-sidebar-card">
            <h3>What happens next?</h3>
            <ol>
              <li>
                <b>Project review</b>
                <span>
                  Hugo reviews your product details, structure and quantity
                </span>
              </li>
              <li>
                <b>Packaging recommendation</b>
                <span>
                  Structure, materials, inserts and finishes suggested
                </span>
              </li>
              <li>
                <b>Formal quotation</b>
                <span>Detailed pricing with unit cost and tooling</span>
              </li>
              <li>
                <b>Physical sample</b>
                <span>Sample produced for your approval</span>
              </li>
              <li>
                <b>Production</b>
                <span>Mass production with quality inspection</span>
              </li>
            </ol>
          </div>
          <div className="rfq-sidebar-card">
            <h3>What to include</h3>
            <ul>
              <li>Finished internal dimensions (L × W × H)</li>
              <li>Product weight and fragility</li>
              <li>Preferred structure (or let us recommend)</li>
              <li>Quantity and delivery country</li>
              <li>Artwork files or brand guidelines</li>
              <li>Finish references (foil, emboss, etc.)</li>
              <li>Target budget range (optional)</li>
            </ul>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
