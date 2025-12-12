export default function ContactText({ contactInfo }) {
  if (!contactInfo) return null;

  return (
    <div className="flex flex-col mb-20">
      <a
        href={`mailto:${contactInfo.email}`}
        className="mb-4 text-2xl tracking-wide text-gray-700 font-extralight"
      >
        {contactInfo.email}
      </a>
      <a
        href={`tel:${contactInfo.phoneNumber}`}
        className="mr-4 text-2xl tracking-wide text-gray-700 font-extralight"
      >
        {contactInfo.phoneNumber}
      </a>
    </div>
  );
}
