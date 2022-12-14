import { Slice } from "gatsby";
import React from "react";
import Layout from "../components/layout";

export default function ContactAbout() {
  return (
    <Layout>
      <div className="flex flex-col items-center max-w-6xl mb-16 text-gray-700">
        <section className="px-8 mt-32 text-center border-b lg:px-20 border-b-black">
          <h2 className="font-serif text-4xl">about</h2>
          <p className="mt-16 font-light tracking-wide">
            I'm a freelance producer based in Ghent (BE), with roots in Limburg
            but a wandering mind worldwide.
          </p>
          <p className="mb-40 font-light tracking-wide">
            Hit me up for your tv / film / commercial / music video or other
            audiovisual production.
          </p>
        </section>
        <section className="w-full px-8 mt-16 lg:px-0">
          <h2 className="mb-20 font-serif text-4xl font-thin tracking-widest">
            coffee or collab?
          </h2>

          <Slice alias="contact-text" />
        </section>
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <title>Ellen Lagiewka - freelance producer - contact + about</title>
      <meta property="og:title" content="Ellen Lagiewka - freelance producer - contact + about" />
      <meta
        property="og:description"
        content="The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer. Contact me for your tv / film / commercial / music video or other audiovisual production."
      />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
