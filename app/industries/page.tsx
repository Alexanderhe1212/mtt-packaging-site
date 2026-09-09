import { industries } from '../../lib/industries';
import { SiteFooter, SiteNav } from '../../components/SiteNav';

export const metadata = {
  title: 'Industries | Custom Packaging Solutions | MTT Packaging',
  description: 'Custom packaging solutions for perfume, cosmetics, jewelry and premium gift industries.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <main id="main-content">
      <SiteNav />
      <header className="page-hero" style={{ background: '#fff', gridTemplateColumns: '1fr', minHeight: 0, paddingBottom: '40px' }}>
        <div>
          <p style={{ textTransform: 'uppercase', letterSpacing: '.18em', fontSize: '10px', fontWeight: 700 }}>Industries</p>
          <h1 style={{ font: '600 clamp(46px,4.8vw,70px)/1 Arial,Helvetica,sans-serif', letterSpacing: '-.055em', margin: '22px 0' }}>Industries We Serve</h1>
          <p style={{ fontSize: '17px', lineHeight: 1.65, color: '#5f6961', maxWidth: '660px' }}>Custom packaging engineered for the specific needs of each industry.</p>
        </div>
      </header>
      <section style={{ padding: '60px 7vw 100px', background: '#fff' }}>
        <div className="industry-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {industries.map((item) => (
            <a href={`/industries/${item.slug}`} key={item.slug}>
              <img src={item.image} alt={item.imageAlt} width="800" height="640" loading="lazy" />
              <p>{item.eyebrow}</p>
              <h3>{item.title.split('.')[0]}</h3>
              <small>Explore solution →</small>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
