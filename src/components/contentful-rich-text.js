import React from "preact";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function ContentfulRichText({ content }) {
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
      {renderRichText(content, options)}
    </div>
  );
}
