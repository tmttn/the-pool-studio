import React from 'react';
import { render, screen } from '@testing-library/react';

const mockGetPortfolioEntry = jest.fn();
const mockGetAllPortfolioSlugs = jest.fn();

// Mock notFound to throw (simulating Next.js behavior)
const NotFoundError = new Error('NEXT_NOT_FOUND');
jest.mock('next/navigation', () => ({
  notFound: () => {
    throw NotFoundError;
  },
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock('../../../../lib/contentful', () => ({
  getPortfolioEntry: (slug) => mockGetPortfolioEntry(slug),
  getAllPortfolioSlugs: () => mockGetAllPortfolioSlugs(),
}));

import PortfolioEntryPage, {
  generateStaticParams,
  generateMetadata,
} from '../../../../app/featured-work/[slug]/page';

describe('PortfolioEntryPage', () => {
  beforeEach(() => {
    mockGetPortfolioEntry.mockReset();
    mockGetAllPortfolioSlugs.mockReset();
  });

  it('renders portfolio entry title', async () => {
    mockGetPortfolioEntry.mockResolvedValue({
      id: '1',
      slug: 'test-project',
      title: 'Test Project Title',
      description: null,
      visual: { url: 'https://example.com/video.mp4' },
      placeholderImage: null,
      seoMetaInformation: null,
    });

    const params = Promise.resolve({ slug: 'test-project' });
    const Component = await PortfolioEntryPage({ params });
    render(Component);

    expect(screen.getByText('Test Project Title')).toBeInTheDocument();
  });

  it('renders back button', async () => {
    mockGetPortfolioEntry.mockResolvedValue({
      id: '1',
      slug: 'test-project',
      title: 'Test Project',
      description: null,
      visual: { url: 'https://example.com/video.mp4' },
      placeholderImage: null,
    });

    const params = Promise.resolve({ slug: 'test-project' });
    const Component = await PortfolioEntryPage({ params });
    render(Component);

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('throws notFound when entry does not exist', async () => {
    mockGetPortfolioEntry.mockResolvedValue(null);

    const params = Promise.resolve({ slug: 'non-existent' });

    await expect(PortfolioEntryPage({ params })).rejects.toThrow('NEXT_NOT_FOUND');
  });
});

describe('generateStaticParams', () => {
  beforeEach(() => {
    mockGetAllPortfolioSlugs.mockReset();
  });

  it('returns array of slug params', async () => {
    mockGetAllPortfolioSlugs.mockResolvedValue(['project-1', 'project-2']);

    const result = await generateStaticParams();

    expect(result).toEqual([{ slug: 'project-1' }, { slug: 'project-2' }]);
  });

  it('returns empty array when no slugs', async () => {
    mockGetAllPortfolioSlugs.mockResolvedValue([]);

    const result = await generateStaticParams();

    expect(result).toEqual([]);
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    mockGetPortfolioEntry.mockReset();
  });

  it('returns default metadata when no SEO info', async () => {
    mockGetPortfolioEntry.mockResolvedValue({
      id: '1',
      slug: 'test',
      title: 'Test',
      seoMetaInformation: null,
    });

    const params = Promise.resolve({ slug: 'test' });
    const result = await generateMetadata({ params });

    expect(result).toEqual({ title: 'Portfolio Entry' });
  });

  it('returns full SEO metadata when available', async () => {
    mockGetPortfolioEntry.mockResolvedValue({
      id: '1',
      slug: 'test',
      title: 'Test',
      seoMetaInformation: {
        title: 'SEO Title',
        seoTitle: 'OpenGraph Title',
        description: 'SEO Description',
        image: 'https://example.com/og-image.jpg',
        noIndex: false,
        noFollow: false,
      },
    });

    const params = Promise.resolve({ slug: 'test' });
    const result = await generateMetadata({ params });

    expect(result.title).toBe('SEO Title');
    expect(result.openGraph.title).toBe('OpenGraph Title');
    expect(result.openGraph.description).toBe('SEO Description');
    expect(result.openGraph.images).toEqual(['https://example.com/og-image.jpg']);
    expect(result.twitter.card).toBe('summary_large_image');
    expect(result.robots).toBeUndefined();
  });

  it('returns robots noindex,nofollow when set', async () => {
    mockGetPortfolioEntry.mockResolvedValue({
      id: '1',
      slug: 'test',
      title: 'Test',
      seoMetaInformation: {
        title: 'SEO Title',
        seoTitle: 'OG Title',
        description: 'Description',
        image: null,
        noIndex: true,
        noFollow: true,
      },
    });

    const params = Promise.resolve({ slug: 'test' });
    const result = await generateMetadata({ params });

    expect(result.robots).toBe('noindex, nofollow');
  });

  it('returns only noindex when noFollow is false', async () => {
    mockGetPortfolioEntry.mockResolvedValue({
      id: '1',
      slug: 'test',
      title: 'Test',
      seoMetaInformation: {
        title: 'SEO Title',
        seoTitle: 'OG Title',
        description: 'Description',
        image: null,
        noIndex: true,
        noFollow: false,
      },
    });

    const params = Promise.resolve({ slug: 'test' });
    const result = await generateMetadata({ params });

    expect(result.robots).toBe('noindex');
  });

  it('handles empty images array when no image', async () => {
    mockGetPortfolioEntry.mockResolvedValue({
      id: '1',
      slug: 'test',
      title: 'Test',
      seoMetaInformation: {
        title: 'SEO Title',
        seoTitle: 'OG Title',
        description: 'Description',
        image: null,
        noIndex: false,
        noFollow: false,
      },
    });

    const params = Promise.resolve({ slug: 'test' });
    const result = await generateMetadata({ params });

    expect(result.openGraph.images).toEqual([]);
  });
});
