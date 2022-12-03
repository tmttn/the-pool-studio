import React from "react";
import { Link } from "gatsby";

export default function Navigation() {
  return (
    <nav className="mt-16 font-sans text-[12px] font-bold">
      <ul className="space-x-6">
        <li className="inline-block">
          <Link to="/featured-work">featured work</Link>
        </li>
        <li className="inline-block">
          <Link to="/contact-about">contact + about</Link>
        </li>
      </ul>
    </nav>
  );
}
