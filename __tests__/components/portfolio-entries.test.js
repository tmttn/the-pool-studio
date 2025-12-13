import { render, screen } from '@testing-library/react';
import PortfolioEntries from '../../components/portfolio-entries';

// Mock Video component
jest.mock('../../components/video', () => {
  return function MockVideo({ videoUrl }) {
    return <div data-testid="video" data-url={videoUrl}>Video</div>;
  };
});

describe('PortfolioEntries', () => {
  const mockEntries = [
    {
      id: '1',
      slug: 'project-1',
      title: 'Project One',
      largeSmall: false,
      visual: { url: 'https://example.com/video1.mp4' },
      placeholderImage: { url: 'https://example.com/placeholder1.jpg' },
    },
    {
      id: '2',
      slug: 'project-2',
      title: 'Project Two',
      largeSmall: true,
      visual: { url: 'https://example.com/video2.mp4' },
      placeholderImage: { url: 'https://example.com/placeholder2.jpg' },
    },
  ];

  it('renders all portfolio entries', () => {
    render(<PortfolioEntries portfolioEntries={mockEntries} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('renders links with correct hrefs', () => {
    render(<PortfolioEntries portfolioEntries={mockEntries} />);

    expect(screen.getByRole('link', { name: /Project One/i })).toHaveAttribute(
      'href',
      '/featured-work/project-1'
    );
    expect(screen.getByRole('link', { name: /Project Two/i })).toHaveAttribute(
      'href',
      '/featured-work/project-2'
    );
  });

  it('renders entry titles as screen-reader-only headings', () => {
    render(<PortfolioEntries portfolioEntries={mockEntries} />);

    expect(screen.getByText('Project One')).toHaveClass('sr-only');
    expect(screen.getByText('Project Two')).toHaveClass('sr-only');
  });

  it('renders Video components for each entry', () => {
    render(<PortfolioEntries portfolioEntries={mockEntries} />);

    const videos = screen.getAllByTestId('video');
    expect(videos).toHaveLength(2);
  });

  it('passes correct video URL to Video component', () => {
    render(<PortfolioEntries portfolioEntries={mockEntries} />);

    const videos = screen.getAllByTestId('video');
    expect(videos[0]).toHaveAttribute('data-url', mockEntries[0].visual.url);
    expect(videos[1]).toHaveAttribute('data-url', mockEntries[1].visual.url);
  });

  it('renders empty div when no entries provided', () => {
    const { container } = render(<PortfolioEntries portfolioEntries={[]} />);

    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
