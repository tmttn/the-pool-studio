import { Slice } from "gatsby";
import React from "preact";
import Layout from "../components/layout";

export default function ContactAbout() {
  return (
    <Layout>
      <div className="flex flex-col items-center max-w-6xl mb-16 text-gray-700">
        <section className="px-20 mt-32 text-center border-b border-b-black">
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
        <section className="w-full mt-16">
          <h2 className="mb-20 font-serif text-4xl font-thin tracking-widest">
            coffee or collab?
          </h2>

          <Slice alias="contact-text" />
        </section>
      </div>
    </Layout>
  );
}
