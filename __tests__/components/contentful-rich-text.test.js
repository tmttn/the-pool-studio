import { render, screen } from '@testing-library/react';
import ContentfulRichText from '../../components/contentful-rich-text';

// Mock the contentful rich text renderer
jest.mock('@contentful/rich-text-react-renderer', () => ({
  documentToReactComponents: (content, options) => {
    if (!content || !content.content) return null;
    return content.content.map((node, index) => {
      if (node.nodeType === 'paragraph') {
        const text = node.content?.[0]?.value || '';
        return options.renderNode.paragraph(node, text);
      }
      return null;
    });
  },
}));

describe('ContentfulRichText', () => {
  it('renders null when content is not provided', () => {
    const { container } = render(<ContentfulRichText />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when content is null', () => {
    const { container } = render(<ContentfulRichText content={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders rich text content', () => {
    const mockContent = {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Test paragraph' }],
        },
      ],
    };

    render(<ContentfulRichText content={mockContent} />);

    expect(screen.getByText('Test paragraph')).toBeInTheDocument();
  });

  it('wraps content in a flex container', () => {
    const mockContent = {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Test content' }],
        },
      ],
    };

    const { container } = render(<ContentfulRichText content={mockContent} />);

    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'items-center');
  });
});
