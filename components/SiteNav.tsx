export function SiteNav() {
  return <>
    <nav className="nav page-nav" aria-label="Primary navigation"><a className="brand" href="/"><img src="/logo.svg" alt="MTT Packaging" width="72" height="52"/><b>MTT Packaging</b></a><div className="navlinks"><a href="/packaging">Products</a><a href="/industries/perfume-fragrance-packaging">Industries</a><a href="/how-we-work">Process</a><a href="/insights">Packaging Guide</a><a href="/sustainability">Sustainability</a></div><a className="button small" href="/request-a-quote">Request a Quote</a></nav>

    {/* WhatsApp Chat Widget */}
    <div className="wa-widget" id="wa-widget">
      {/* Quick question panel (hidden by default) */}
      <div className="wa-panel" id="wa-panel">
        <div className="wa-panel-header">
          <b>Quick Question?</b>
          <span>Choose a topic to start chatting</span>
        </div>
        <a className="wa-option" href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%27d%20like%20to%20request%20a%20quote%20for%20custom%20packaging.%20Can%20you%20help%3F" target="_blank" rel="noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Request a Quote
        </a>
        <a className="wa-option" href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%20have%20a%20question%20about%20your%20custom%20packaging%20options.%20Can%20you%20help%3F" target="_blank" rel="noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Ask About Packaging
        </a>
        <a className="wa-option" href="https://wa.me/8617207110964?text=Hi%20Hugo!%20What%20is%20your%20minimum%20order%20quantity%20for%20custom%20packaging%3F" target="_blank" rel="noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          Our MOQ
        </a>
      </div>

      {/* Main floating button */}
      <button className="wa-button" id="wa-button" aria-label="Chat on WhatsApp"
        // @ts-expect-error — inline handler for server component
        onClick="document.getElementById('wa-panel').classList.toggle('wa-panel-open');this.classList.toggle('wa-button-open');">
        <svg className="wa-icon-chat" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <svg className="wa-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  </>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div><a className="brand" href="/"><img src="/logo.svg" alt="MTT Packaging" width="72" height="52"/><b>MTT Packaging</b></a><p>Custom luxury packaging manufacturer in China. Rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes.</p></div><nav aria-label="Product links"><b>Products</b><a href="/packaging">All Packaging</a><a href="/industries/perfume-fragrance-packaging">Perfume Packaging</a><a href="/industries/cosmetics-skincare-packaging">Cosmetic Packaging</a><a href="/industries/jewelry-watch-packaging">Jewelry Packaging</a></nav><nav aria-label="Resource links"><b>Resources</b><a href="/insights">Packaging Guide</a><a href="/how-we-work">How We Work</a><a href="/sustainability">Sustainability</a><a href="/sitemap.xml">Sitemap</a></nav><nav aria-label="Contact links"><b>Contact</b><a href="mailto:info@mttpackaging.com">info@mttpackaging.com</a><a href="https://wa.me/8617207110964" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="/request-a-quote">Request a Quote</a></nav></footer>;
}
