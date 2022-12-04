import React from "react";
import Layout from "../components/layout";
import { Slice, graphql } from "gatsby";
import PortfolioEntries from "../components/portfolio-entries";

export default function Index({ data }) {
  const portfolioEntries = data.allContentfulPortfolioEntry.edges;
  return (
    <Layout>
      <PortfolioEntries portfolioEntries={portfolioEntries} />
      <Slice alias="contact-icons" />
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <meta property="og:title" content="Ellen Lagiewka - freelance producer" />
      <meta
        property="og:description"
        content="The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer"
      />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}

export const query = graphql`
  {
    allContentfulPortfolioEntry(sort: { order: ASC }) {
      edges {
        node {
          id
          slug
          placeholderImage {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
          visual {
            url
          }
          largeSmall
        }
      }
    }
  }
`;
