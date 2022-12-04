import React from "preact";
import { Slice } from "gatsby";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen wrapper">
      <Slice alias="header" />
      <main className="flex flex-col items-center justify-center mb-8">
        {children}
      </main>
      <Slice alias="footer" />
    </div>
  );
}
