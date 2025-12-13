import React from 'react';
import { render, screen } from '@testing-library/react';

const mockGetPortfolioEntries = jest.fn();
const mockGetContactInformation = jest.fn();

jest.mock('../../../lib/contentful', () => ({
  getPortfolioEntries: () => mockGetPortfolioEntries(),
  getContactInformation: () => mockGetContactInformation(),
}));

import FeaturedWorkPage, { metadata } from '../../../app/featured-work/page';

describe('FeaturedWorkPage', () => {
  beforeEach(() => {
    mockGetPortfolioEntries.mockReset();
    mockGetContactInformation.mockReset();
  });

  it('renders portfolio entries', async () => {
    mockGetPortfolioEntries.mockResolvedValue([
      {
        id: '1',
        slug: 'project-1',
        title: 'Featured Project',
        largeSmall: 'large',
        visual: { url: 'https://example.com/video.mp4' },
        placeholderImage: null,
      },
    ]);
    mockGetContactInformation.mockResolvedValue({
      email: 'test@example.com',
      phoneNumber: '+1234567890',
    });

    const Component = await FeaturedWorkPage();
    render(Component);

    expect(screen.getByText('Featured Project')).toBeInTheDocument();
  });

  it('renders contact icons', async () => {
    mockGetPortfolioEntries.mockResolvedValue([]);
    mockGetContactInformation.mockResolvedValue({
      email: 'test@example.com',
      phoneNumber: '+1234567890',
    });

    const Component = await FeaturedWorkPage();
    render(Component);

    expect(screen.getByRole('link', { name: /mail/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /phone/i })).toBeInTheDocument();
  });

  it('renders empty state when no entries', async () => {
    mockGetPortfolioEntries.mockResolvedValue([]);
    mockGetContactInformation.mockResolvedValue(null);

    const Component = await FeaturedWorkPage();
    const { container } = render(Component);

    expect(container).toBeTruthy();
  });
});

describe('FeaturedWorkPage metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe(
      'Ellen Lagiewka - freelance producer - featured work'
    );
  });

  it('has correct openGraph title', () => {
    expect(metadata.openGraph.title).toBe(
      'Ellen Lagiewka - freelance producer - featured work'
    );
  });

  it('has correct openGraph description', () => {
    expect(metadata.openGraph.description).toContain(
      "Take a look at some of the work I've done"
    );
  });

  it('has twitter card configuration', () => {
    expect(metadata.twitter.card).toBe('summary_large_image');
  });
});
