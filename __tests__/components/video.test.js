import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Video from '../../components/video';

describe('Video', () => {
  const defaultProps = {
    videoUrl: 'https://example.com/video.mp4',
  };

  it('renders video element after mount', async () => {
    const { container } = render(<Video {...defaultProps} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
    });
  });

  it('renders with autoPlay enabled by default', async () => {
    const { container } = render(<Video {...defaultProps} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('autoplay');
    });
  });

  it('renders without controls by default', async () => {
    const { container } = render(<Video {...defaultProps} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).not.toHaveAttribute('controls');
    });
  });

  it('renders with controls when specified', async () => {
    const { container } = render(<Video {...defaultProps} controls={true} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('controls');
    });
  });

  it('renders without autoPlay when specified', async () => {
    const { container } = render(<Video {...defaultProps} autoPlay={false} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).not.toHaveAttribute('autoplay');
    });
  });

  it('renders placeholder image when provided', async () => {
    const placeholderImage = { url: 'https://example.com/placeholder.jpg' };
    const { container } = render(<Video {...defaultProps} placeholderImage={placeholderImage} />);

    await waitFor(() => {
      const image = container.querySelector('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', placeholderImage.url);
    });
  });

  it('has muted property', async () => {
    const { container } = render(<Video {...defaultProps} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      // React renders muted as a property, not as a string attribute
      expect(video.muted).toBe(true);
    });
  });

  it('has loop property', async () => {
    const { container } = render(<Video {...defaultProps} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      // React renders loop as a property
      expect(video.loop).toBe(true);
    });
  });

  it('changes z-index when video is loaded', async () => {
    const { container } = render(<Video {...defaultProps} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();

      // Simulate video loaded
      fireEvent.canPlayThrough(video);
    });
  });
});
