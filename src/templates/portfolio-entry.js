import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Video from "../components/video";
import ContentfulRichText from "../components/contentful-rich-text";
import { navigate } from "gatsby";
import { ChevronLeft } from "tabler-icons-react";

export default function PortfolioEntry({ data }) {
  const portfolioEntry = data.contentfulPortfolioEntry;

  return (
    <Layout>
      <div className="flex flex-col items-center max-w-4xl mt-8 mb-20">
        <Video
          videoUrl={portfolioEntry.visual.url}
          autoPlay={false}
          controls={true}
        />
        <div className="flex flex-col items-center mt-8">
          <h2 className="py-4 text-sm font-bold">{portfolioEntry.title}</h2>
          <ContentfulRichText content={portfolioEntry.description} />
          <button
            onClick={() => navigate(-1)}
            className="flex flex-row items-center mt-8 text-sm font-thin text-gray-400"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        </div>
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
