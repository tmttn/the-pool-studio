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

export const query = graphql`
  {
    allContentfulPortfolioEntry(sort: { order: ASC }) {
      edges {
        node {
          id
          slug
          visual {
            url
          }
          largeSmall
        }
      }
    }
  }
`;
