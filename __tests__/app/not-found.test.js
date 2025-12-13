import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../app/not-found';

describe('NotFound', () => {
  it('renders the page not found heading', () => {
    render(<NotFound />);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders the error message', () => {
    render(<NotFound />);

    expect(
      screen.getByText(/Sorry, we couldn't find what you were looking for/)
    ).toBeInTheDocument();
  });

  it('renders a link to go home', () => {
    render(<NotFound />);

    const homeLink = screen.getByRole('link', { name: 'Go home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('has correct metadata export', () => {
    const { metadata } = require('../../app/not-found');
    expect(metadata).toEqual({
      title: 'Not found',
    });
  });
});
