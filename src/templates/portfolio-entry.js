import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Video from "../components/video";
import ContentfulRichText from "../components/contentful-rich-text";

export default function PortfolioEntry({ data }) {
  const portfolioEntry = data.contentfulPortfolioEntry;

  return (
    <Layout>
      <div className="flex flex-col items-center max-w-4xl">
        <Video videoUrl={portfolioEntry.visual.url} />
        <h2 className="py-4 font-bold">{portfolioEntry.title}</h2>
        <ContentfulRichText
          content={portfolioEntry.description}
        />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    contentfulPortfolioEntry(slug: { eq: $slug }) {
      title
      visual {
        url
      }
      description {
        raw
      }
    }
  }
`;
