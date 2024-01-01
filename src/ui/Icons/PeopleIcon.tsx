import React from 'react';

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
    >
      <path d="M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm3 5c-4.6 0-6 3.3-6 3.3V19h12v-1.7S16.6 14 12 14z"></path>
      <circle cx="18.5" cy="8.5" r="2.5"></circle>
      <path d="M18.5 13c-1.2 0-2.1.3-2.8.8 2.3 1.1 3.2 3 3.2 3.2v.1H23v-1.3c0-.1-1.1-2.8-4.5-2.8z"></path>
      <circle cx="18.5" cy="8.5" r="2.5"></circle>
      <path d="M18.5 13c-1.2 0-2.1.3-2.8.8 2.3 1.1 3.2 3 3.2 3.2v.1H23v-1.3c0-.1-1.1-2.8-4.5-2.8z"></path>
      <g>
        <circle cx="5.5" cy="8.5" r="2.5"></circle>
        <path d="M5.5 13c1.2 0 2.1.3 2.8.8-2.3 1.1-3.2 3-3.2 3.2v.1H1v-1.3c0-.1 1.1-2.8 4.5-2.8z"></path>
      </g>
    </svg>
  );
}

export default React.memo(PeopleIcon);
