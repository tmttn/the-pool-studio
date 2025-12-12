import PortfolioEntries from '@/components/portfolio-entries';
import ContactIcons from '@/components/contact-icons';
import { getPortfolioEntries, getContactInformation } from '@/lib/contentful';

export const metadata = {
  title: 'Ellen Lagiewka - freelance producer',
  openGraph: {
    title: 'Ellen Lagiewka - freelance producer',
    description:
      'The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function HomePage() {
  const portfolioEntries = await getPortfolioEntries();
  const contactInfo = await getContactInformation();

  return (
    <>
      <PortfolioEntries portfolioEntries={portfolioEntries} />
      <ContactIcons contactInfo={contactInfo} />
    </>
  );
}
