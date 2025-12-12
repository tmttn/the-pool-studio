import PortfolioEntries from '@/components/portfolio-entries';
import ContactIcons from '@/components/contact-icons';
import { getPortfolioEntries, getContactInformation } from '@/lib/contentful';

export const metadata = {
  title: 'Ellen Lagiewka - freelance producer - featured work',
  openGraph: {
    title: 'Ellen Lagiewka - freelance producer - featured work',
    description:
      "The Pool Studio is the portfolio website of Ellen Lagiewka - freelance producer. Take a look at some of the work I've done.",
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function FeaturedWorkPage() {
  const portfolioEntries = await getPortfolioEntries();
  const contactInfo = await getContactInformation();

  return (
    <>
      <PortfolioEntries portfolioEntries={portfolioEntries} />
      <ContactIcons contactInfo={contactInfo} />
    </>
  );
}
