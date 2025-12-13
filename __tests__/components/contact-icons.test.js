import { render, screen } from '@testing-library/react';
import ContactIcons from '../../components/contact-icons';

describe('ContactIcons', () => {
  const mockContactInfo = {
    phoneNumber: '+1234567890',
    email: 'test@example.com',
  };

  it('renders null when contactInfo is not provided', () => {
    const { container } = render(<ContactIcons />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when contactInfo is null', () => {
    const { container } = render(<ContactIcons contactInfo={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders phone icon with correct link', () => {
    render(<ContactIcons contactInfo={mockContactInfo} />);

    const phoneLink = screen.getByRole('link', { name: /phone/i });
    expect(phoneLink).toHaveAttribute('href', `tel:${mockContactInfo.phoneNumber}`);
  });

  it('renders email icon with correct link', () => {
    render(<ContactIcons contactInfo={mockContactInfo} />);

    const emailLink = screen.getByRole('link', { name: /mail/i });
    expect(emailLink).toHaveAttribute('href', `mailto:${mockContactInfo.email}`);
  });

  it('renders both icons', () => {
    render(<ContactIcons contactInfo={mockContactInfo} />);

    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });
});
