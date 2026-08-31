import type { Metadata } from "next";
import { getIndustry, industries } from "../../../lib/industries";
import { breadcrumb, organization, siteUrl } from "../../../lib/seo";

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const item = getIndustry((await params).slug);
  if (!item) return {};
  return {
    title: `${item.eyebrow} Packaging | MTT Packaging`,
    description: item.summary,
    alternates: { canonical: `/industries/${item.slug}` },
    openGraph: {
      title: `${item.eyebrow} Packaging | MTT Packaging`,
      description: item.summary,
      url: `/industries/${item.slug}`,
      type: "website",
      images: [{ url: item.image, alt: item.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: `${item.eyebrow} Packaging | MTT Packaging`, description: item.summary, images: [item.image] },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = getIndustry((await params).slug);
  if (!item)
    return (
      <main className="article-page">
        <p>Industry page not found.</p>
        <a href="/">Return to MTT Packaging</a>
      </main>
    );
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Custom ${item.eyebrow} Packaging`,
        description: item.summary,
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: "Worldwide",
        url: `${siteUrl}/industries/${item.slug}`,
      },
      organization,
      breadcrumb([["Home", "/"], ["Packaging", "/packaging"], [item.eyebrow, `/industries/${item.slug}`]]),
      {
        "@type": "FAQPage",
        mainEntity: item.faq.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return (
    <main className="industry-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <nav aria-label="Primary navigation">
        <a className="brand" href="/">
          <span>MTT</span> MTT Packaging
        </a>
        <a href={`https://wa.me/8617207110964?text=${encodeURIComponent(`Hi Hugo! I'm looking for custom ${item.eyebrow.toLowerCase()} packaging. I have a project to discuss.`)}`} target="_blank" rel="noreferrer">Discuss a project →</a>
      </nav>
      <a className="floating-whatsapp" href={`https://wa.me/8617207110964?text=${encodeURIComponent(`Hi Hugo! I'm looking for custom ${item.eyebrow.toLowerCase()} packaging. I have a project to discuss.`)}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
      <header>
        <div>
          <p>{item.eyebrow} packaging</p>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
          <div className="tag-row">
            {item.products.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
        <img src={item.image} alt={item.imageAlt} width="900" height="900" />
      </header>
      <section className="industry-section">
        <div>
          <p className="section-kicker">Structure directions</p>
          <h2>Match the box to the product and the experience.</h2>
        </div>
        <div className="structure-list">
          {item.structures.map(([title, copy], i) => (
            <article key={title}>
              <b>0{i + 1}</b>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="industry-priorities">
        <div>
          <p className="section-kicker light">Engineering priorities</p>
          <h2>Premium presentation must still perform.</h2>
        </div>
        <div>
          {item.priorities.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="brief-list">
        <div>
          <p className="section-kicker">A useful first brief</p>
          <h2>Send these details for a focused review.</h2>
        </div>
        <ol>
          {item.brief.map((line, i) => (
            <li key={line}>
              <b>0{i + 1}</b>
              {line}
            </li>
          ))}
        </ol>
      </section>
      <section className="industry-faq">
        <div>
          <p className="section-kicker">Specific questions</p>
          <h2>What buyers usually need to confirm.</h2>
        </div>
        <div>
          {item.faq.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <aside>
        <p>Custom project · MTT Packaging</p>
        <h2>
          Share the product size, quantity and presentation target with Hugo.
        </h2>
        <a className="button" href={`https://wa.me/8617207110964?text=${encodeURIComponent(`Hi Hugo! I'm looking for custom ${item.eyebrow.toLowerCase()} packaging. I have a project to discuss.`)}`} target="_blank" rel="noreferrer">
          WhatsApp Hugo ↗
        </a>
        <p style={{ marginTop: '12px', fontSize: '12px', color: '#8a9a8d' }}>Message Hugo on WhatsApp for a quick response about your project.</p>
      </aside>
      <footer>
        <p>MTT Packaging · High-End Custom Packaging</p>
        <a href="/">Back to homepage</a>
      </footer>
    </main>
  );
}
