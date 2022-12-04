import React from "react";
import { Link } from "gatsby";

export default function Navigation() {
  return (
    <nav className="mt-20 font-sans text-[11px] font-bold">
      <ul className="space-x-6">
        <li className="inline-block after:content-['/'] after:ml-6">
          <Link to="/featured-work" activeClassName="text-indigo-600">
            featured work
          </Link>
        </li>
        <li className="inline-block">
          <Link to="/contact-about" activeClassName="text-indigo-600">
            contact + about
          </Link>
        </li>
      </ul>
    </nav>
  );
}
