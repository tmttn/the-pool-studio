import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

export default function ContentfulRichText({ content }) {
  if (!content) return null;

  const Bold = ({ children }) => <span className="bold">{children}</span>;
  const Text = ({ children }) => <p className="align-center">{children}</p>;

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    },
  };

  return (
    <div className="flex flex-col items-center text-sm font-thin leading-relaxed tracking-wider">
      {documentToReactComponents(content, options)}
    </div>
  );
}
