import CookieSettingsButton from './CookieSettingsButton';
import MTTMonogram from './MTTMonogram';
const links=[['Products','/products'],['Packaging','/packaging'],['Industries','/industries'],['Case Studies','/case-studies'],['How We Work','/how-we-work'],['About','/about'],['Design Your Box','/tools/gift-box-solution-builder']];
export function SiteNav(){return <nav className="ed-nav" aria-label="Primary navigation"><a className="ed-brand" href="/"><span aria-hidden="true"><MTTMonogram size={54}/></span><span>MTT Packaging</span></a><div className="ed-nav-links">{links.map(([t,u])=><a href={u} key={u}>{t}</a>)}</div><a className="button ed-nav-quote" href="/request-a-quote">Request a Quote <span aria-hidden="true">→</span></a><details className="ed-mobile-menu"><summary>Menu</summary><div>{links.map(([t,u])=><a href={u} key={u}>{t}</a>)}<a href="/tools">Packaging Tools</a><a href="/request-a-quote">Request a Quote</a></div></details></nav>}

export function SiteFooter() {
  return <>
    <section className="payment-section">
      <p className="section-kicker">Payment Options</p>
      <div className="payment-cards">
        <div className="payment-card">
          <img className="payment-logo" src="/payment/bank.svg" width="56" height="56" alt="" aria-hidden="true" />
          <b>Bank Transfer</b>
          <p>Available for confirmed production orders.</p>
        </div>
        <div className="payment-card">
          <img className="payment-logo" src="/payment/paypal.svg" width="56" height="56" alt="" aria-hidden="true" />
          <b>PayPal</b>
          <p>Available for eligible payments.</p>
        </div>
      </div>
      <p className="payment-note">Available payment methods may depend on order value, project stage and transaction arrangements confirmed with MTT Packaging.</p>
    </section>
    <footer className="site-footer"><div><a className="brand" href="/"><span aria-hidden="true"><MTTMonogram size={40} /></span><b>MTT Packaging</b></a><p>Custom luxury packaging development and manufacturing partner in China. Rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes.</p></div><nav aria-label="Product links"><b>Products</b><a href="/packaging">All Packaging</a><a href="/industries/perfume-fragrance-packaging">Perfume Packaging</a><a href="/industries/cosmetics-skincare-packaging">Cosmetic Packaging</a><a href="/industries/jewelry-watch-packaging">Jewelry Packaging</a></nav><nav aria-label="Resource links"><b>Resources</b><a href="/case-studies">Case Studies</a><a href="/insights">Packaging Guide</a><a href="/how-we-work">How We Work</a><a href="/sustainability">Sustainability</a><a href="/tools">Packaging Tools</a><a href="/quality-control">Quality Control</a><a href="/about">About MTT</a></nav><nav aria-label="Contact links"><b>Contact</b><a href="mailto:info@mttpackaging.com">info@mttpackaging.com</a><a href="https://wa.me/8617207110964" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="/request-a-quote">Request a Quote</a></nav></footer>
    <div className="footer-legal"><nav aria-label="Legal links"><a href="/privacy-policy">Privacy Policy</a><a href="/cookie-policy">Cookie Policy</a><CookieSettingsButton /></nav><p className="image-provenance">Packaging visuals include illustrative concepts. Final materials, colors and structure are confirmed through sampling.</p><p>© {new Date().getFullYear()} MTT Packaging. All rights reserved.</p></div>
  </>;
}
