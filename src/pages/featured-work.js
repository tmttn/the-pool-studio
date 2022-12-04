import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import PortfolioEntries from "../components/portfolio-entries";
import ContactIcons from "../components/contact-icons";

export default function FeaturedWork({ data }) {
  const portfolioEntries = data.allContentfulPortfolioEntry.edges;
  return (
    <Layout>
      <PortfolioEntries portfolioEntries={portfolioEntries} />
      <ContactIcons />
    </Layout>
  );
}

export const query = graphql`
  {
    allContentfulPortfolioEntry(sort: { fields: [order], order: ASC }) {
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
