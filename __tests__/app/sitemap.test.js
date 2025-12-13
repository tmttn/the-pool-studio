const mockGetPortfolioEntries = jest.fn();

jest.mock('../../lib/contentful', () => ({
  getPortfolioEntries: () => mockGetPortfolioEntries(),
}));

import sitemap from '../../app/sitemap';

describe('sitemap', () => {
  beforeEach(() => {
    mockGetPortfolioEntries.mockReset();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns static pages and dynamic work pages', async () => {
    mockGetPortfolioEntries.mockResolvedValue([
      { slug: 'project-1' },
      { slug: 'project-2' },
    ]);

    const result = await sitemap();

    expect(result).toHaveLength(5); // 3 static + 2 dynamic
    expect(result[0]).toEqual({
      url: 'https://www.thepool-studio.be',
      lastModified: expect.any(Date),
      changeFrequency: 'monthly',
      priority: 1,
    });
    expect(result[1]).toEqual({
      url: 'https://www.thepool-studio.be/featured-work',
      lastModified: expect.any(Date),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
    expect(result[2]).toEqual({
      url: 'https://www.thepool-studio.be/contact-about',
      lastModified: expect.any(Date),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    expect(result[3]).toEqual({
      url: 'https://www.thepool-studio.be/featured-work/project-1',
      lastModified: expect.any(Date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
    expect(result[4]).toEqual({
      url: 'https://www.thepool-studio.be/featured-work/project-2',
      lastModified: expect.any(Date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  it('returns only static pages when contentful fails', async () => {
    mockGetPortfolioEntries.mockRejectedValue(new Error('API Error'));

    const result = await sitemap();

    expect(result).toHaveLength(3);
    expect(result[0].url).toBe('https://www.thepool-studio.be');
    expect(result[1].url).toBe('https://www.thepool-studio.be/featured-work');
    expect(result[2].url).toBe('https://www.thepool-studio.be/contact-about');
  });

  it('returns only static pages when no portfolio entries', async () => {
    mockGetPortfolioEntries.mockResolvedValue([]);

    const result = await sitemap();

    expect(result).toHaveLength(3);
  });
});
