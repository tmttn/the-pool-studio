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

export function Head() {
  return (
    <>
      <title>Ellen Lagiewka - freelance producer - featured work</title>
      <meta property="og:title" content="Ellen Lagiewka - freelance producer - featured work" />
      <meta
        property="og:description"
        content="The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer. Take a look at some of the work I've done."
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
          visual {
            url
          }
          largeSmall
        }
      }
    }
  }
`;
