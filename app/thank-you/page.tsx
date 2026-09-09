import { SiteFooter, SiteNav } from '../../components/SiteNav';

export const metadata = {
  title: 'Thank You | MTT Packaging',
  description: 'Your quote request has been received. Hugo will respond within 24 hours.',
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <main id="main-content" style={{ background: '#f1eee5' }}>
      <SiteNav />
      <section style={{
        padding: '120px 7vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '640px',
        margin: '0 auto',
        minHeight: '60vh',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: '#d6ee73',
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          fontSize: '28px',
          fontWeight: 700,
          color: '#172019',
          marginBottom: '28px',
        }}>✓</div>
        <h1 style={{ font: '600 clamp(32px,4vw,48px)/1.1 Arial,Helvetica,sans-serif', letterSpacing: '-.04em', margin: '0 0 16px' }}>
          Thank You
        </h1>
        <p style={{ fontSize: '17px', lineHeight: 1.65, color: '#5f6961', margin: '0 0 32px' }}>
          Your enquiry has been received. Hugo will review your project and respond within 24 hours.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a className="button" href="/">Return to Home</a>
          <a className="wa-button" href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%20just%20submitted%20a%20quote%20request." target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" style={{ width: '48px', height: '48px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
