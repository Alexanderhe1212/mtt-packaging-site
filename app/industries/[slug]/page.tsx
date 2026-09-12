import IndustryProducts from '../../../components/IndustryProducts';
import PackagingDetailNotes from "../../../components/PackagingDetailNotes";
import RelatedPackagingStudies from "../../../components/RelatedPackagingStudies";
import FragrancePlanning from "../../../components/FragrancePlanning";
import BuyerPlanning from "../../../components/BuyerPlanning";
import { SiteNav, SiteFooter } from '../../../components/SiteNav';
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
      <main id="main-content" className="article-page">
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
    <main id="main-content" className="industry-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <SiteNav />
      <header className="page-hero">
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
      {item.slug === "perfume-fragrance-packaging" && <FragrancePlanning />}
      <IndustryProducts industry={item.slug} />
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
      {item.slug === 'perfume-fragrance-packaging' && (
        <aside className="page-cta">
          <p>Perfume insert guide</p>
          <h2>Learn how to support glass bottles without compromising presentation.</h2>
          <a className="button" href="/insights/perfume-box-insert-design">Read the Perfume Insert Guide →</a>
        </aside>
      )}
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
      {item.slug === "perfume-fragrance-packaging" && <BuyerPlanning kind="perfume" />}
      <PackagingDetailNotes kind={item.slug.startsWith("perfume") ? "fragrance" : item.slug.startsWith("cosmetics") ? "skincare" : item.slug.startsWith("jewelry") ? "jewelry" : "gift"}/><RelatedPackagingStudies ids={item.slug.startsWith("perfume") ? ["fragrance","modular"] : item.slug.startsWith("cosmetics") ? ["skincare"] : item.slug.startsWith("jewelry") ? ["jewelry"] : ["collector","tea"]}/><SiteFooter />
    </main>
  );
}
