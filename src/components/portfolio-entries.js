import React from "react";
import Video from "./video";
import { Link } from "gatsby";

export default function PortfolioEntries({ portfolioEntries }) {
  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-2 mt-8 mb-20 md:grid-cols-2">
      {portfolioEntries.map(({ node }) => (
        <Link
          to={`/featured-work/${node.slug}`}
          key={node.id}
          className={`block aspect-[16/9] ${
            node.largeSmall ? "md:col-span-2" : ""
          }`}
          style={{
            backgroundImage: `url("${node.visual.url}")`,
          }}
        >
          <Video videoUrl={node.visual.url} />
        </Link>
      ))}
    </div>
  );
}