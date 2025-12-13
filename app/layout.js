import './globals.css';
import PropTypes from 'prop-types';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: {
    default: 'Ellen Lagiewka - freelance producer',
    template: '%s | Ellen Lagiewka',
  },
  description:
    'The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer',
  openGraph: {
    title: 'Ellen Lagiewka - freelance producer',
    description:
      'The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen wrapper">
          <Header />
          <main className="flex flex-col items-center justify-center mb-8">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
