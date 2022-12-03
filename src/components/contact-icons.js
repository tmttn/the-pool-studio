import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import { Phone, Mail } from "tabler-icons-react";

export default function ContactIcons() {
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
    <div className="flex items-center justify-center mb-20">
      <a
        href={`tel:${social.allContentfulContactInformation.edges[0].node.phoneNumber}`}
        className="inline-block p-2 mr-4 text-gray-400 border-4 border-gray-400 border-solid rounded-full border-3"
      >
        <Phone size={40} />
      </a>
      <a
        href={`mailto:${social.allContentfulContactInformation.edges[0].node.email}`}
        className="inline-block p-2 text-gray-400 border-4 border-gray-400 border-solid rounded-full border-3"
      >
        <Mail size={40} />
      </a>
    </div>
  );
}
