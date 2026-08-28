import type { Metadata } from "next";
import { articles, getArticle } from "../../../lib/articles";
import { breadcrumb, organization, siteUrl } from "../../../lib/seo";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title} | MTT Packaging`,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      url: `/insights/${article.slug}`,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.summary, images: [article.image] },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getArticle((await params).slug);
  if (!article)
    return (
      <main className="article">
        <p>Article not found.</p>
        <a href="/">Return to MTT Packaging</a>
      </main>
    );
  const articleData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.summary,
        image: `${siteUrl}${article.image}`,
        author: { "@type": "Person", name: "Hugo He", jobTitle: "Custom Packaging Consultant" },
        publisher: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
      },
      organization,
      breadcrumb([["Home", "/"], ["Insights", "/insights"], [article.title, `/insights/${article.slug}`]]),
    ],
  };
  return (
    <main className="article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      <nav>
        <a className="brand" href="/">
          <span>MTT</span> MTT Packaging
        </a>
        <a href="/#contact">Request a quote →</a>
      </nav>
      <header>
        <p>
          {article.number} / {article.angle}
        </p>
        <h1>{article.title}</h1>
        <p>{article.intro}</p>
        <p>Written and reviewed by Hugo He · Custom packaging consultant at MTT Packaging</p>
      </header>
      <div className="article-body">
        {article.sections.map(([title, copy], index) => (
          <section key={title}>
            <b>0{index + 1}</b>
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </section>
        ))}
      </div>
      <aside>
        <p>Planning a custom packaging project?</p>
        <h2>
          Share the product size, quantity and presentation target with Hugo.
        </h2>
        <a className="button" href="/#contact">
          Start your project <span>↗</span>
        </a>
      </aside>
      <footer>
        <p>MTT Packaging · High-End Custom Packaging</p>
        <a href="/">Back to homepage</a>
      </footer>
    </main>
  );
}
