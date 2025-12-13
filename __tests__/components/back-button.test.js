import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from '../../components/back-button';

// Get the mocked router
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: mockBack,
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('BackButton', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('renders back button with text', () => {
    render(<BackButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('renders chevron left icon', () => {
    render(<BackButton />);

    expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument();
  });

  it('calls router.back() when clicked', () => {
    render(<BackButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
