import React from 'react';

function CreateIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      version="1.1"
      viewBox="0 0 24 24"
      className={className}
    >
      <g
        fill="#000"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeMiterlimit="4"
        strokeOpacity="1"
        clipRule="nonzero"
        color="#000"
        colorInterpolation="sRGB"
        colorInterpolationFilters="linearRGB"
        colorRendering="auto"
        direction="ltr"
        display="inline"
        dominantBaseline="auto"
        fontFamily="sans-serif"
        fontSize="medium"
        fontStretch="normal"
        fontStyle="normal"
        fontVariant="normal"
        fontWeight="normal"
        imageRendering="auto"
        letterSpacing="normal"
        shapeRendering="auto"
        textAnchor="start"
        textRendering="auto"
        transform="translate(0 -290.65)"
        visibility="visible"
        wordSpacing="normal"
        writingMode="lr-tb"
      >
        <path
          d="M6 292.65c-2.199 0-4 1.802-4 4v12c0 2.2 1.801 4 4 4h12c2.199 0 4-1.8 4-4v-12c0-2.198-1.801-4-4-4zm0 2h12c1.125 0 2 .875 2 2v12c0 1.126-.875 2-2 2H6c-1.125 0-2-.874-2-2v-12c0-1.125.875-2 2-2z"
          className={className}
          strokeLinejoin="round"
          baselineShift="baseline"
          display="inline"
          enableBackground="accumulate"
          opacity="1"
          overflow="visible"
          stopColor="#000"
          stopOpacity="1"
          textDecoration="none"
          vectorEffect="none"
        ></path>
        <path
          d="M12 296.65a1 1 0 00-1 1v4H7a1 1 0 00-1 1 1 1 0 001 1h4v4a1 1 0 001 1 1 1 0 001-1v-4h4a1 1 0 001-1 1 1 0 00-1-1h-4v-4a1 1 0 00-1-1z"
          className={className}
          strokeLinejoin="miter"
          baselineShift="baseline"
          display="inline"
          enableBackground="accumulate"
          opacity="1"
          overflow="visible"
          stopColor="#000"
          stopOpacity="1"
          textDecoration="none"
          vectorEffect="none"
        ></path>
      </g>
    </svg>
  );
}

export default React.memo(CreateIcon);
