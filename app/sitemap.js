import { getPortfolioEntries } from '@/lib/contentful';

export default async function sitemap() {
  const baseUrl = 'https://www.thepool-studio.be';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/featured-work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact-about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic featured work pages
  try {
    const works = await getPortfolioEntries();
    const workPages = works.map((work) => ({
      url: `${baseUrl}/featured-work/${work.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticPages, ...workPages];
  } catch {
    // If Contentful fails, return just static pages
    return staticPages;
  }
}
