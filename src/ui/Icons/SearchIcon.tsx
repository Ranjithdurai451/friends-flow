import React from 'react';

const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      className={className}
    >
      <path d="M27.414 24.586l-5.077-5.077A9.932 9.932 0 0024 14c0-5.514-4.486-10-10-10S4 8.486 4 14s4.486 10 10 10a9.932 9.932 0 005.509-1.663l5.077 5.077a2 2 0 102.828-2.828zM7 14c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7z"></path>
    </svg>
  );
};

export default SearchIcon;
