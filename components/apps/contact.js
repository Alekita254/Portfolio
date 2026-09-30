import React from 'react';
import identity from '../../config/identity';

function ContactRow({ label, value, href }) {
  if (!value) return null;

  return (
    <div className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 px-3 py-3">
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400">{label}</div>
      {href ? (
        <a href={href} target={href.startsWith('mailto:') ? '_self' : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer noopener'} className="mt-1 block text-sm text-emerald-200 underline underline-offset-2">
          {value}
        </a>
      ) : (
        <div className="mt-1 text-sm text-gray-200">{value}</div>
      )}
    </div>
  );
}

export function Contact() {
  return (
    <div className="w-full h-full bg-ub-grey text-white overflow-y-auto windowMainScreen">
      <div className="sticky top-0 z-10 border-b border-white border-opacity-10 bg-black bg-opacity-30 backdrop-blur-sm px-4 py-3">
        <div className="text-xs uppercase tracking-[0.25em] text-gray-400">CONTACT</div>
        <div className="mt-1 text-sm text-gray-300">Reach out through the channels below.</div>
      </div>
      <div className="p-4 space-y-3">
        <ContactRow label="Email" value={identity.email} href={`mailto:${identity.email}`} />
        <ContactRow label="GitHub" value={identity.github.replace('https://', '')} href={identity.github} />
        {identity.linkedin ? <ContactRow label="LinkedIn" value={identity.linkedin.replace('https://', '')} href={identity.linkedin} /> : null}
        <ContactRow label="Phone" value={identity.phone} />
        <ContactRow label="Location" value={identity.location} />
      </div>
    </div>
  );
}

export default Contact;

export const displayContact = () => {
  return <Contact></Contact>;
};
