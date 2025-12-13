import PropTypes from 'prop-types';
import { Phone, Mail } from 'tabler-icons-react';

export default function ContactIcons({ contactInfo }) {
  if (!contactInfo) return null;

  return (
    <div className="flex items-center justify-center mb-20">
      <a
        href={`tel:${contactInfo.phoneNumber}`}
        className="inline-block p-2 mr-4 text-gray-400 border-4 border-gray-400 border-solid rounded-full border-3"
      >
        <Phone size={40} />
      </a>
      <a
        href={`mailto:${contactInfo.email}`}
        className="inline-block p-2 text-gray-400 border-4 border-gray-400 border-solid rounded-full border-3"
      >
        <Mail size={40} />
      </a>
    </div>
  );
}

ContactIcons.propTypes = {
  contactInfo: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};
