import { useStaticQuery, graphql } from "gatsby";
import React from "react";

export default function ContactText() {
  const social = useStaticQuery(graphql`
    {
      allContentfulContactInformation {
        edges {
          node {
            email
            phoneNumber
          }
        }
      }
    }
  `);

  return (
    <div className="flex flex-col mb-20">
      <a
        href={`mailto:${social.allContentfulContactInformation.edges[0].node.email}`}
        className="mb-4 text-2xl tracking-wide text-gray-700 font-extralight"
      >
        {social.allContentfulContactInformation.edges[0].node.email}
      </a>
      <a
        href={`tel:${social.allContentfulContactInformation.edges[0].node.phoneNumber}`}
        className="mr-4 text-2xl tracking-wide text-gray-700 font-extralight"
      >
        {social.allContentfulContactInformation.edges[0].node.phoneNumber}
      </a>
    </div>
  );
}
