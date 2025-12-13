import { render, screen } from '@testing-library/react';
import ContactText from '../../components/contact-text';

describe('ContactText', () => {
  const mockContactInfo = {
    phoneNumber: '+1234567890',
    email: 'test@example.com',
  };

  it('renders null when contactInfo is not provided', () => {
    const { container } = render(<ContactText />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when contactInfo is null', () => {
    const { container } = render(<ContactText contactInfo={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders email link with correct href and text', () => {
    render(<ContactText contactInfo={mockContactInfo} />);

    const emailLink = screen.getByRole('link', { name: mockContactInfo.email });
    expect(emailLink).toHaveAttribute('href', `mailto:${mockContactInfo.email}`);
  });

  it('renders phone link with correct href and text', () => {
    render(<ContactText contactInfo={mockContactInfo} />);

    const phoneLink = screen.getByRole('link', { name: mockContactInfo.phoneNumber });
    expect(phoneLink).toHaveAttribute('href', `tel:${mockContactInfo.phoneNumber}`);
  });

  it('displays the email text', () => {
    render(<ContactText contactInfo={mockContactInfo} />);

    expect(screen.getByText(mockContactInfo.email)).toBeInTheDocument();
  });

  it('displays the phone number text', () => {
    render(<ContactText contactInfo={mockContactInfo} />);

    expect(screen.getByText(mockContactInfo.phoneNumber)).toBeInTheDocument();
  });
});
