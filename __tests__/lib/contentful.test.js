const mockGetEntries = jest.fn();

jest.mock('contentful', () => {
  return {
    createClient: () => ({
      getEntries: (...args) => mockGetEntries(...args),
    }),
  };
});

import {
  getPortfolioEntries,
  getPortfolioEntry,
  getContactInformation,
  getAllPortfolioSlugs,
} from '../../lib/contentful';

describe('contentful lib', () => {
  beforeEach(() => {
    mockGetEntries.mockReset();
  });

  describe('getPortfolioEntries', () => {
    it('returns formatted portfolio entries', async () => {
      mockGetEntries.mockResolvedValue({
        items: [
          {
            sys: { id: '123' },
            fields: {
              slug: 'project-1',
              title: 'Project 1',
              largeSmall: 'large',
              visual: {
                fields: {
                  file: { url: '//images.ctfassets.net/video.mp4' },
                },
              },
              placeholderImage: {
                fields: {
                  file: {
                    url: '//images.ctfassets.net/placeholder.jpg',
                    details: { image: { width: 800, height: 600 } },
                  },
                },
              },
            },
          },
        ],
      });

      const result = await getPortfolioEntries();

      expect(mockGetEntries).toHaveBeenCalledWith({
        content_type: 'portfolioShowcase',
        order: ['fields.order'],
      });
      expect(result).toEqual([
        {
          id: '123',
          slug: 'project-1',
          title: 'Project 1',
          largeSmall: 'large',
          visual: { url: 'https://images.ctfassets.net/video.mp4' },
          placeholderImage: {
            url: 'https://images.ctfassets.net/placeholder.jpg',
            width: 800,
            height: 600,
          },
        },
      ]);
    });

    it('handles entries without visual or placeholder', async () => {
      mockGetEntries.mockResolvedValue({
        items: [
          {
            sys: { id: '456' },
            fields: {
              slug: 'project-2',
              title: 'Project 2',
              largeSmall: 'small',
            },
          },
        ],
      });

      const result = await getPortfolioEntries();

      expect(result).toEqual([
        {
          id: '456',
          slug: 'project-2',
          title: 'Project 2',
          largeSmall: 'small',
          visual: { url: null },
          placeholderImage: null,
        },
      ]);
    });

    it('returns empty array when no entries', async () => {
      mockGetEntries.mockResolvedValue({ items: [] });

      const result = await getPortfolioEntries();

      expect(result).toEqual([]);
    });
  });

  describe('getPortfolioEntry', () => {
    it('returns formatted portfolio entry by slug', async () => {
      mockGetEntries.mockResolvedValue({
        items: [
          {
            sys: { id: '123' },
            fields: {
              slug: 'project-1',
              title: 'Project 1',
              description: { nodeType: 'document', content: [] },
              visual: {
                fields: {
                  file: { url: '//images.ctfassets.net/video.mp4' },
                },
              },
              placeholderImage: {
                fields: {
                  file: {
                    url: '//images.ctfassets.net/placeholder.jpg',
                    details: { image: { width: 800, height: 600 } },
                  },
                },
              },
              seoMetaInformation: {
                fields: {
                  title: 'SEO Title',
                  seoTitle: 'SEO Title Tag',
                  description: { description: 'SEO Description' },
                  image: {
                    fields: {
                      file: { url: '//images.ctfassets.net/og-image.jpg' },
                    },
                  },
                  noIndex: false,
                  noFollow: false,
                },
              },
            },
          },
        ],
      });

      const result = await getPortfolioEntry('project-1');

      expect(mockGetEntries).toHaveBeenCalledWith({
        content_type: 'portfolioShowcase',
        'fields.slug': 'project-1',
        limit: 1,
      });
      expect(result).toEqual({
        id: '123',
        slug: 'project-1',
        title: 'Project 1',
        description: { nodeType: 'document', content: [] },
        visual: { url: 'https://images.ctfassets.net/video.mp4' },
        placeholderImage: {
          url: 'https://images.ctfassets.net/placeholder.jpg',
          width: 800,
          height: 600,
        },
        seoMetaInformation: {
          title: 'SEO Title',
          seoTitle: 'SEO Title Tag',
          description: 'SEO Description',
          image: 'https://images.ctfassets.net/og-image.jpg',
          noIndex: false,
          noFollow: false,
        },
      });
    });

    it('returns null when entry not found', async () => {
      mockGetEntries.mockResolvedValue({ items: [] });

      const result = await getPortfolioEntry('non-existent');

      expect(result).toBeNull();
    });

    it('handles entry without SEO information', async () => {
      mockGetEntries.mockResolvedValue({
        items: [
          {
            sys: { id: '789' },
            fields: {
              slug: 'project-3',
              title: 'Project 3',
              description: null,
            },
          },
        ],
      });

      const result = await getPortfolioEntry('project-3');

      expect(result).toEqual({
        id: '789',
        slug: 'project-3',
        title: 'Project 3',
        description: null,
        visual: { url: null },
        placeholderImage: null,
        seoMetaInformation: null,
      });
    });

    it('handles SEO without image', async () => {
      mockGetEntries.mockResolvedValue({
        items: [
          {
            sys: { id: '101' },
            fields: {
              slug: 'project-4',
              title: 'Project 4',
              description: null,
              seoMetaInformation: {
                fields: {
                  title: 'SEO Title',
                  seoTitle: 'SEO Title Tag',
                  description: { description: 'SEO Description' },
                  noIndex: true,
                  noFollow: true,
                },
              },
            },
          },
        ],
      });

      const result = await getPortfolioEntry('project-4');

      expect(result).toEqual({
        id: '101',
        slug: 'project-4',
        title: 'Project 4',
        description: null,
        visual: { url: null },
        placeholderImage: null,
        seoMetaInformation: {
          title: 'SEO Title',
          seoTitle: 'SEO Title Tag',
          description: 'SEO Description',
          image: null,
          noIndex: true,
          noFollow: true,
        },
      });
    });
  });

  describe('getContactInformation', () => {
    it('returns contact information', async () => {
      mockGetEntries.mockResolvedValue({
        items: [
          {
            fields: {
              email: 'test@example.com',
              phoneNumber: '+1234567890',
            },
          },
        ],
      });

      const result = await getContactInformation();

      expect(mockGetEntries).toHaveBeenCalledWith({
        content_type: 'contactInformation',
        limit: 1,
      });
      expect(result).toEqual({
        email: 'test@example.com',
        phoneNumber: '+1234567890',
      });
    });

    it('returns null when no contact info found', async () => {
      mockGetEntries.mockResolvedValue({ items: [] });

      const result = await getContactInformation();

      expect(result).toBeNull();
    });
  });

  describe('getAllPortfolioSlugs', () => {
    it('returns all portfolio slugs', async () => {
      mockGetEntries.mockResolvedValue({
        items: [
          { fields: { slug: 'project-1' } },
          { fields: { slug: 'project-2' } },
          { fields: { slug: 'project-3' } },
        ],
      });

      const result = await getAllPortfolioSlugs();

      expect(mockGetEntries).toHaveBeenCalledWith({
        content_type: 'portfolioShowcase',
        select: ['fields.slug'],
      });
      expect(result).toEqual(['project-1', 'project-2', 'project-3']);
    });

    it('returns empty array when no entries', async () => {
      mockGetEntries.mockResolvedValue({ items: [] });

      const result = await getAllPortfolioSlugs();

      expect(result).toEqual([]);
    });
  });
});
