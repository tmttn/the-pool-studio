import { render, screen } from '@testing-library/react';
import Navigation from '../../components/navigation';

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />);

    expect(screen.getByText('featured work')).toBeInTheDocument();
    expect(screen.getByText('contact + about')).toBeInTheDocument();
  });

  it('has correct href for featured work link', () => {
    render(<Navigation />);

    const link = screen.getByRole('link', { name: 'featured work' });
    expect(link).toHaveAttribute('href', '/featured-work');
  });

  it('has correct href for contact + about link', () => {
    render(<Navigation />);

    const link = screen.getByRole('link', { name: 'contact + about' });
    expect(link).toHaveAttribute('href', '/contact-about');
  });

  it('renders a nav element', () => {
    render(<Navigation />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders an unordered list', () => {
    render(<Navigation />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
