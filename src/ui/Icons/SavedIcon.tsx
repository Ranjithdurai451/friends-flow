import React from 'react';

function SavedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      version="1.1"
      viewBox="0 0 24 24"
    >
      <g display="inline" transform="translate(0 -290.65)">
        <path
          className={className}
          d="M6.807 292.65A2.822 2.822 0 004 295.455v16.195a1 1 0 001.496.868L12 308.8l6.504 3.717A1 1 0 0020 311.65v-16.195a2.822 2.822 0 00-2.807-2.805zm0 2h10.386c.464 0 .807.341.807.805v14.47l-5.504-3.144a1 1 0 00-.992 0L6 309.926v-14.47c0-.465.343-.806.807-.806z"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeOpacity="1"
          baselineShift="baseline"
          clipRule="nonzero"
          color="#000"
          colorInterpolation="sRGB"
          colorInterpolationFilters="linearRGB"
          colorRendering="auto"
          direction="ltr"
          display="inline"
          dominantBaseline="auto"
          enableBackground="accumulate"
          fontFamily="sans-serif"
          fontSize="medium"
          fontStretch="normal"
          fontStyle="normal"
          fontVariant="normal"
          fontWeight="normal"
          imageRendering="auto"
          letterSpacing="normal"
          opacity="1"
          overflow="visible"
          shapeRendering="auto"
          stopColor="#000"
          stopOpacity="1"
          textAnchor="start"
          textDecoration="none"
          textRendering="auto"
          vectorEffect="none"
          visibility="visible"
          wordSpacing="normal"
          writingMode="lr-tb"
        ></path>
      </g>
    </svg>
  );
}

export default React.memo(SavedIcon);
