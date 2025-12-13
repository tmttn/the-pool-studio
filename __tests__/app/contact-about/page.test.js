import React from 'react';
import { render, screen } from '@testing-library/react';

const mockGetContactInformation = jest.fn();

jest.mock('../../../lib/contentful', () => ({
  getContactInformation: () => mockGetContactInformation(),
}));

import ContactAboutPage, { metadata } from '../../../app/contact-about/page';

describe('ContactAboutPage', () => {
  beforeEach(() => {
    mockGetContactInformation.mockReset();
  });

  it('renders about section', async () => {
    mockGetContactInformation.mockResolvedValue({
      email: 'test@example.com',
      phoneNumber: '+1234567890',
    });

    const Component = await ContactAboutPage();
    render(Component);

    expect(screen.getByText('about')).toBeInTheDocument();
    expect(
      screen.getByText(/freelance producer based in Ghent/i)
    ).toBeInTheDocument();
  });

  it('renders contact section', async () => {
    mockGetContactInformation.mockResolvedValue({
      email: 'test@example.com',
      phoneNumber: '+1234567890',
    });

    const Component = await ContactAboutPage();
    render(Component);

    expect(screen.getByText('coffee or collab?')).toBeInTheDocument();
  });

  it('renders contact info when available', async () => {
    mockGetContactInformation.mockResolvedValue({
      email: 'test@example.com',
      phoneNumber: '+1234567890',
    });

    const Component = await ContactAboutPage();
    render(Component);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
  });

  it('handles null contact info', async () => {
    mockGetContactInformation.mockResolvedValue(null);

    const Component = await ContactAboutPage();
    const { container } = render(Component);

    // Should still render the page structure
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});

describe('ContactAboutPage metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe(
      'Ellen Lagiewka - freelance producer - contact + about'
    );
  });

  it('has correct openGraph title', () => {
    expect(metadata.openGraph.title).toBe(
      'Ellen Lagiewka - freelance producer - contact + about'
    );
  });

  it('has correct openGraph description', () => {
    expect(metadata.openGraph.description).toContain(
      'Contact me for your tv / film / commercial'
    );
  });

  it('has twitter card configuration', () => {
    expect(metadata.twitter.card).toBe('summary_large_image');
  });
});
