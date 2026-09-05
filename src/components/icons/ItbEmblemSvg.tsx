import React from "react";

export interface ItbEmblemSvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function ItbEmblemSvg({ size = 20, className = "", ...props }: ItbEmblemSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Institut Teknologi Bandung Crest"
      {...props}
    >
      {/* Outer Lotus / Padma 8-pointed geometric shield */}
      <path
        d="M24 3C25.5 6 28 8 31 8C34.5 8 37 6.5 39 4C38.5 7.5 39.5 10.5 42 12C44.5 13.5 47 13.5 49 12.5C47 15 46.5 18 47.5 21C48.5 24 50 25.5 52 26.5"
        stroke="currentColor"
        strokeWidth="0"
      />
      {/* Authentic ITB Octagonal Mandala Frame */}
      <path
        d="M24 4.5L29.5 8.2L35.8 7.5L38.2 13.5L44.2 16.2L43.8 22.8L48 27.5L44.5 33L46 39.5L39.8 41.5L38.5 48L32 46.8L28.2 51.5L24 48L19.8 51.5L16 46.8L9.5 48L8.2 41.5L2 39.5L3.5 33L0 27.5L4.2 22.8L3.8 16.2L9.8 13.5L12.2 7.5L18.5 8.2L24 4.5Z"
        transform="scale(0.88) translate(3, 2)"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      {/* Inner Lotus Petal Ring */}
      <circle
        cx="24"
        cy="24"
        r="15"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2 1.5"
        opacity="0.6"
      />
      {/* Ganesha Crown (Mukuta) & Head Silhouette */}
      <path
        d="M24 13V15.5M22.5 15.5H25.5L26 17.5H22L22.5 15.5ZM21 18H27L28 21C28 22.5 27 24 25.5 24.5V26.5C25.5 28 24.5 29 23 29C21.5 29 20.8 28 20.8 26.5H19.5C18.5 26.5 17.8 25.5 18.2 24.5L19.5 21L21 18Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Trunk holding the bowl of wisdom (Mangkok Ilmu) */}
      <path
        d="M23 24.5C23.8 25.5 23.8 27 22.8 28C22 28.8 20.8 28.5 20.2 27.5C19.8 26.8 20.2 25.8 21 25.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Wisdom Bowl (Mangkok Amerta) */}
      <path
        d="M18 27.5C18 29 19.5 30 21 30C22.5 30 23.5 29 23.5 27.5H18Z"
        fill="currentColor"
      />
      {/* Open Scripture / Palm-leaf Book (Kitab Suci / Lontar) at base */}
      <path
        d="M17 32.5C19.5 31.8 22 32.2 24 33.2C26 32.2 28.5 31.8 31 32.5V34C28.5 33.3 26 33.7 24 34.7C22 33.7 19.5 33.3 17 34V32.5Z"
        fill="currentColor"
      />
      {/* Ears & Tusk Accents */}
      <path
        d="M18 20.5C16.8 20.5 16 21.5 16.5 23C17 24.2 18.2 24.5 19 24M29.5 20.5C30.7 20.5 31.5 21.5 31 23C30.5 24.2 29.3 24.5 28.5 24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
