import { render, screen } from '@testing-library/react';
import Header from '../../components/header';

// Mock Navigation component
jest.mock('../../components/navigation', () => {
  return function MockNavigation() {
    return <nav data-testid="navigation">Navigation</nav>;
  };
});

describe('Header', () => {
  it('renders the header with title', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ellen lagiewka');
  });

  it('renders the subtitle', () => {
    render(<Header />);

    expect(screen.getByText('freelance producer')).toBeInTheDocument();
  });

  it('has a link to the homepage', () => {
    render(<Header />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the navigation component', () => {
    render(<Header />);

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });
});
