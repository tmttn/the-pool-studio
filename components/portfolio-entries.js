import Link from 'next/link';
import PropTypes from 'prop-types';
import Video from './video';

export default function PortfolioEntries({ portfolioEntries }) {
  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-2 mt-8 mb-20 md:grid-cols-2">
      {portfolioEntries.map((entry) => (
        <Link
          href={`/featured-work/${entry.slug}`}
          key={entry.id}
          className={`block aspect-video ${
            entry.largeSmall ? 'md:col-span-2' : ''
          }`}
        >
          <h2 className="sr-only">{entry.title}</h2>
          <Video
            videoUrl={entry.visual.url}
            placeholderImage={entry.placeholderImage}
          />
        </Link>
      ))}
    </div>
  );
}

PortfolioEntries.propTypes = {
  portfolioEntries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      largeSmall: PropTypes.bool,
      visual: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
      placeholderImage: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
};
