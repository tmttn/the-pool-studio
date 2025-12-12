import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getPortfolioEntries() {
  const entries = await client.getEntries({
    content_type: 'portfolioShowcase',
    order: ['fields.order'],
  });

  return entries.items.map((item) => ({
    id: item.sys.id,
    slug: item.fields.slug,
    title: item.fields.title,
    largeSmall: item.fields.largeSmall,
    visual: {
      url: item.fields.visual?.fields?.file?.url
        ? `https:${item.fields.visual.fields.file.url}`
        : null,
    },
    placeholderImage: item.fields.placeholderImage?.fields?.file?.url
      ? {
          url: `https:${item.fields.placeholderImage.fields.file.url}`,
          width: item.fields.placeholderImage.fields.file.details.image.width,
          height: item.fields.placeholderImage.fields.file.details.image.height,
        }
      : null,
  }));
}

export async function getPortfolioEntry(slug) {
  const entries = await client.getEntries({
    content_type: 'portfolioShowcase',
    'fields.slug': slug,
    limit: 1,
  });

  if (!entries.items.length) {
    return null;
  }

  const item = entries.items[0];
  return {
    id: item.sys.id,
    slug: item.fields.slug,
    title: item.fields.title,
    description: item.fields.description,
    visual: {
      url: item.fields.visual?.fields?.file?.url
        ? `https:${item.fields.visual.fields.file.url}`
        : null,
    },
    placeholderImage: item.fields.placeholderImage?.fields?.file?.url
      ? {
          url: `https:${item.fields.placeholderImage.fields.file.url}`,
          width: item.fields.placeholderImage.fields.file.details.image.width,
          height: item.fields.placeholderImage.fields.file.details.image.height,
        }
      : null,
    seoMetaInformation: item.fields.seoMetaInformation?.fields
      ? {
          title: item.fields.seoMetaInformation.fields.title,
          seoTitle: item.fields.seoMetaInformation.fields.seoTitle,
          description: item.fields.seoMetaInformation.fields.description?.description,
          image: item.fields.seoMetaInformation.fields.image?.fields?.file?.url
            ? `https:${item.fields.seoMetaInformation.fields.image.fields.file.url}`
            : null,
          noIndex: item.fields.seoMetaInformation.fields.noIndex,
          noFollow: item.fields.seoMetaInformation.fields.noFollow,
        }
      : null,
  };
}

export async function getContactInformation() {
  const entries = await client.getEntries({
    content_type: 'contactInformation',
    limit: 1,
  });

  if (!entries.items.length) {
    return null;
  }

  const item = entries.items[0];
  return {
    email: item.fields.email,
    phoneNumber: item.fields.phoneNumber,
  };
}

export async function getAllPortfolioSlugs() {
  const entries = await client.getEntries({
    content_type: 'portfolioShowcase',
    select: ['fields.slug'],
  });

  return entries.items.map((item) => item.fields.slug);
}
