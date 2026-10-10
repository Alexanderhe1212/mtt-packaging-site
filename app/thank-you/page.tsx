import { SiteFooter, SiteNav } from '../../components/SiteNav';

export const metadata = {
  title: 'Thank You | MTT Packaging',
  description: 'Your quote request has been received. Hugo will respond within 24 hours.',
  robots: { index: false },
};

const whatsapp = 'https://wa.me/8617207110964?text=Hi%20Hugo!%20I%20just%20submitted%20a%20quote%20request.';
const nextSteps = [
  ['Project review', 'Hugo reviews your product details, structure and quantity, and replies within 24 hours.'],
  ['Recommendation and quotation', 'Structure, materials, insert and finishes are recommended, followed by formal pricing with unit cost, tooling and lead time.'],
  ['Physical sample', 'A sample is produced for your approval before any production commitment.'],
  ['Production and delivery', 'Production follows the approved sample with quality checks, then export packing and shipping to your destination.'],
];
const guides = [
  ['Custom Packaging Brief Checklist: What to Send for a Quote', '/insights/how-to-write-a-packaging-brief'],
  ['Packaging Sample Approval: What to Check Before Production', '/insights/custom-packaging-sampling-process'],
  ['Custom Packaging Costs: How to Compare a Box Quotation', '/insights/custom-packaging-cost-guide'],
];

export default function ThankYouPage() {
  return (
    <main id="main-content" className="ty-page">
      <SiteNav />
      <section className="ty-hero">
        <span className="ty-check" aria-hidden="true">✓</span>
        <p className="hp-kicker">Enquiry received</p>
        <h1>Thank you. Your brief is with Hugo.</h1>
        <p>Your enquiry has been received. Hugo will review your project and respond within 24 hours, usually by email.</p>
      </section>
      <section className="ty-grid">
        <div>
          <h2>What happens next</h2>
          <ol className="ty-steps">{nextSteps.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><b>{title}</b><p>{text}</p></div></li>)}</ol>
        </div>
        <aside>
          <div className="ty-card">
            <h2>Speed up your quote</h2>
            <p>Send product photos, artwork files or reference images directly. Files are not attached through the website form.</p>
            <a className="button" href={whatsapp} target="_blank" rel="noreferrer">Send photos on WhatsApp →</a>
            <a className="ed-text-link" href="mailto:info@mttpackaging.com?subject=Files%20for%20my%20packaging%20quote">Email files to info@mttpackaging.com</a>
          </div>
          <div className="ty-card">
            <h2>While you wait</h2>
            <ul>{guides.map(([title, href]) => <li key={href}><a href={href}>{title} →</a></li>)}</ul>
            <a className="ed-text-link" href="/products">Browse 240 packaging designs →</a>
          </div>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
