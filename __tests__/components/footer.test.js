import { render, screen } from '@testing-library/react';
import Footer from '../../components/footer';

describe('Footer', () => {
  it('renders the footer', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays copyright text', () => {
    render(<Footer />);

    expect(screen.getByText(/Copyright © The Pool/)).toBeInTheDocument();
  });
});
