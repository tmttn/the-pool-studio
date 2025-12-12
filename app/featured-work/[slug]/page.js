import { notFound } from 'next/navigation';
import Video from '@/components/video';
import ContentfulRichText from '@/components/contentful-rich-text';
import BackButton from '@/components/back-button';
import { getPortfolioEntry, getAllPortfolioSlugs } from '@/lib/contentful';

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = await getPortfolioEntry(slug);

  if (!entry?.seoMetaInformation) {
    return {
      title: 'Portfolio Entry',
    };
  }

  const { seoMetaInformation } = entry;
  const robots = [];
  if (seoMetaInformation.noIndex) robots.push('noindex');
  if (seoMetaInformation.noFollow) robots.push('nofollow');

  return {
    title: seoMetaInformation.title,
    openGraph: {
      title: seoMetaInformation.seoTitle,
      description: seoMetaInformation.description,
      images: seoMetaInformation.image ? [seoMetaInformation.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: robots.length > 0 ? robots.join(', ') : undefined,
  };
}

export default async function PortfolioEntryPage({ params }) {
  const { slug } = await params;
  const portfolioEntry = await getPortfolioEntry(slug);

  if (!portfolioEntry) {
    notFound();
  }

  return (
    <>
      <div className="w-full max-w-4xl mt-8 aspect-video">
        <Video
          videoUrl={portfolioEntry.visual.url}
          autoPlay={false}
          controls={true}
          placeholderImage={portfolioEntry.placeholderImage}
        />
      </div>
      <div className="flex flex-col items-center max-w-4xl mb-20 w-4xl">
        <div className="flex flex-col items-center mt-8">
          <h2 className="py-4 text-sm font-bold">{portfolioEntry.title}</h2>
          <ContentfulRichText content={portfolioEntry.description} />
          <BackButton />
        </div>
      </div>
    </>
  );
}
