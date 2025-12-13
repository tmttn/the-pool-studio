import React from 'react';
import { render, screen } from '@testing-library/react';

const mockGetPortfolioEntries = jest.fn();
const mockGetContactInformation = jest.fn();

jest.mock('../../lib/contentful', () => ({
  getPortfolioEntries: () => mockGetPortfolioEntries(),
  getContactInformation: () => mockGetContactInformation(),
}));

// Import the component and metadata
import HomePage, { metadata } from '../../app/page';

describe('HomePage', () => {
  beforeEach(() => {
    mockGetPortfolioEntries.mockReset();
    mockGetContactInformation.mockReset();
  });

  it('renders portfolio entries', async () => {
    mockGetPortfolioEntries.mockResolvedValue([
      {
        id: '1',
        slug: 'project-1',
        title: 'Project 1',
        largeSmall: 'large',
        visual: { url: 'https://example.com/video.mp4' },
        placeholderImage: null,
      },
    ]);
    mockGetContactInformation.mockResolvedValue({
      email: 'test@example.com',
      phoneNumber: '+1234567890',
    });

    const Component = await HomePage();
    render(Component);

    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  it('renders contact icons', async () => {
    mockGetPortfolioEntries.mockResolvedValue([]);
    mockGetContactInformation.mockResolvedValue({
      email: 'test@example.com',
      phoneNumber: '+1234567890',
    });

    const Component = await HomePage();
    render(Component);

    expect(screen.getByRole('link', { name: /mail/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /phone/i })).toBeInTheDocument();
  });

  it('renders empty state when no portfolio entries', async () => {
    mockGetPortfolioEntries.mockResolvedValue([]);
    mockGetContactInformation.mockResolvedValue(null);

    const Component = await HomePage();
    const { container } = render(Component);

    // Should still render without errors
    expect(container).toBeTruthy();
  });
});

describe('HomePage metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Ellen Lagiewka - freelance producer');
  });

  it('has correct openGraph title', () => {
    expect(metadata.openGraph.title).toBe('Ellen Lagiewka - freelance producer');
  });

  it('has correct openGraph description', () => {
    expect(metadata.openGraph.description).toBe(
      'The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer'
    );
  });

  it('has twitter card configuration', () => {
    expect(metadata.twitter.card).toBe('summary_large_image');
  });
});
