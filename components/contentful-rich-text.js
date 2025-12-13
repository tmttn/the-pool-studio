import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// Extracted components to avoid nested function definitions
function Bold({ children }) {
  return <span className="bold">{children}</span>;
}

Bold.propTypes = {
  children: PropTypes.node,
};

function Text({ children }) {
  return <p className="align-center">{children}</p>;
}

Text.propTypes = {
  children: PropTypes.node,
};

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
};

export default function ContentfulRichText({ content }) {
  if (!content) return null;

  return (
    <div className="flex flex-col items-center text-sm font-thin leading-relaxed tracking-wider">
      {documentToReactComponents(content, renderOptions)}
    </div>
  );
}

ContentfulRichText.propTypes = {
  content: PropTypes.object,
};
