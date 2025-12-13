import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '../../app/layout';

// Mock next/navigation for any components that might use it
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock Vercel analytics
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}));

jest.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => null,
}));

describe('RootLayout', () => {
  it('renders children content', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Header component', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    // Header contains the name link
    expect(screen.getByRole('heading', { name: /ellen lagiewka/i })).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    // Footer contains copyright text
    expect(screen.getByText(/ellen lagiewka/i)).toBeInTheDocument();
  });

  it('renders main element for content', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

describe('metadata', () => {
  it('has correct default title', () => {
    expect(metadata.title.default).toBe('Ellen Lagiewka - freelance producer');
  });

  it('has correct title template', () => {
    expect(metadata.title.template).toBe('%s | Ellen Lagiewka');
  });

  it('has correct description', () => {
    expect(metadata.description).toBe(
      'The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer'
    );
  });

  it('has openGraph configuration', () => {
    expect(metadata.openGraph.title).toBe('Ellen Lagiewka - freelance producer');
    expect(metadata.openGraph.type).toBe('website');
  });

  it('has twitter card configuration', () => {
    expect(metadata.twitter.card).toBe('summary_large_image');
  });
});
