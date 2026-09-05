import React from "react";

export interface ToolIconProps {
  className?: string;
  size?: number;
}

export function PythonIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M11.91 2C6.35 2 6.7 4.41 6.7 4.41L6.71 6.9H12v.75H4.25S2 7.37 2 12.92c0 5.56 1.96 5.37 1.96 5.37h1.66v-2.33s-.09-2.78 2.74-2.78h4.72s2.64.04 2.64-2.58V4.58S16.2 2 11.91 2zM9.06 3.63c.48 0 .87.39.87.87s-.39.87-.87.87-.87-.39-.87-.87.39-.87.87-.87z"
        fill="#3776AB"
      />
      <path
        d="M12.09 22c5.56 0 5.21-2.41 5.21-2.41l-.01-2.49H12v-.75h7.75s2.25.28 2.25-5.27c0-5.56-1.96-5.37-1.96-5.37h-1.66v2.33s.09 2.78-2.74 2.78h-4.72s-2.64-.04-2.64 2.58v6.02S7.8 22 12.09 22zm2.85-1.63c-.48 0-.87-.39-.87-.87s.39-.87.87-.87.87.39.87.87-.39.87-.87.87z"
        fill="#FFD438"
      />
    </svg>
  );
}

export function PostgreSqlIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12.02 2C6.5 2 2.5 5.5 2.5 10.3c0 3.3 1.9 6.2 4.9 7.7-.2.9-.6 2.4-1.8 3.2 1.6 0 3.5-.8 4.6-2.1.6.1 1.2.2 1.8.2 5.5 0 9.5-3.5 9.5-8.3C21.5 5.5 17.5 2 12.02 2z"
        fill="#336791"
      />
      <path
        d="M14.8 9.2c-.3-.5-.8-.8-1.5-.8-.9 0-1.6.6-1.9 1.5-.1.3-.1.7-.1 1.1 0 .8.2 1.5.7 2 .4.4 1 .6 1.7.6.7 0 1.2-.2 1.6-.6.4-.4.6-1 .6-1.7v-.4h-2.1v-.8h3v1.3c0 1.1-.3 1.9-.9 2.5-.6.6-1.4.9-2.4.9-1.1 0-2-.4-2.6-1.1-.6-.7-.9-1.7-.9-2.8 0-1.1.3-2.1.9-2.8.6-.7 1.5-1.1 2.6-1.1.9 0 1.7.3 2.2.8.5.5.8 1.2.8 2.1h-1c-.1-.7-.3-1.2-.6-1.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PowerBiIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="10" width="5" height="12" rx="1.5" fill="#E6AD10" />
      <rect x="9.5" y="6" width="5" height="16" rx="1.5" fill="#F2C811" />
      <rect x="17" y="2" width="5" height="20" rx="1.5" fill="#F9DE5A" />
    </svg>
  );
}

export function ExcelIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#107C41" />
      <path
        d="M7.5 7.5L11.5 12L7.5 16.5H9.5L12.5 13.1L15.5 16.5H17.5L13.5 12L17.5 7.5H15.5L12.5 10.9L9.5 7.5H7.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function WordIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#185ABD" />
      <path
        d="M7 8L9 16H10.5L12 10.5L13.5 16H15L17 8H15.3L14.2 13.5L12.8 8H11.2L9.8 13.5L8.7 8H7Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PowerPointIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#D83B01" />
      <path
        d="M8.5 7.5H12.5C14.2 7.5 15.5 8.6 15.5 10.2C15.5 11.9 14.2 13 12.5 13H10.5V16.5H8.5V7.5ZM10.5 11.2H12.3C13.1 11.2 13.6 10.8 13.6 10.2C13.6 9.6 13.1 9.2 12.3 9.2H10.5V11.2Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function FigmaIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" fill="#19BCFE" />
      <path d="M4 16a4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4z" fill="#0ACF83" />
      <path d="M12 4H8a4 4 0 1 0 0 8h4V4z" fill="#F24E1E" />
      <path d="M12 4h4a4 4 0 1 1 0 8h-4V4z" fill="#FF7262" />
      <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#A259FF" />
    </svg>
  );
}

export function RIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="7" fill="#276DC3" />
      <path
        d="M10 8H13C14.2 8 15 8.7 15 9.7C15 10.7 14.2 11.4 13 11.4H11.5V14H10V8ZM11.5 10.2H12.8C13.2 10.2 13.6 10 13.6 9.7C13.6 9.4 13.2 9.2 12.8 9.2H11.5V10.2Z"
        fill="#FFFFFF"
      />
      <path d="M13.2 11.2L15.5 14H13.8L11.8 11.4H13.2Z" fill="#FFFFFF" />
    </svg>
  );
}
export function ArenaSimulationIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="6" height="12" rx="2" fill="#3157C8" fillOpacity="0.15" stroke="#3157C8" />
      <circle cx="12" cy="12" r="3" fill="#F0522D" fillOpacity="0.15" stroke="#F0522D" />
      <polygon points="16 6 22 12 16 18 16 6" fill="#3157C8" fillOpacity="0.15" stroke="#3157C8" />
      <line x1="8" y1="12" x2="9" y2="12" stroke="#1A1917" strokeWidth="1.5" strokeDasharray="1,1" />
      <line x1="15" y1="12" x2="16" y2="12" stroke="#1A1917" strokeWidth="1.5" />
    </svg>
  );
}

export function GitIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.62 10.97l-8.59-8.59a1.85 1.85 0 00-2.62 0L8.47 4.32l3.3 3.3a2.18 2.18 0 012.76 2.76l3.18 3.18a2.18 2.18 0 11-1.31 1.31l-2.95-2.95v4.22a2.18 2.18 0 11-1.85 0V11.8a2.18 2.18 0 01-1.18-2.88L7.17 5.62 2.38 10.4a1.85 1.85 0 000 2.62l8.59 8.59a1.85 1.85 0 002.62 0l8.03-8.02a1.85 1.85 0 000-2.62z"
        fill="#F05032"
      />
    </svg>
  );
}

export function DockerIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M13.98 11.08h-2.12v2.12h2.12v-2.12zm-2.65 0H9.21v2.12h2.12v-2.12zm-2.65 0H6.56v2.12h2.12v-2.12zm5.3-2.65h-2.12v2.12h2.12V8.43zm-2.65 0H9.21v2.12h2.12V8.43zm-2.65 0H6.56v2.12h2.12V8.43zm5.3-2.65h-2.12v2.12h2.12V5.78zm7.68 5.7c-.36-.26-1.18-.36-1.83-.1-.13-.92-.72-1.74-1.57-2.19l-.36-.18-.23.33c-.34.49-.52 1.07-.52 1.67 0 .18.02.36.05.54-.53.3-1.44.4-1.95.42H1.67l-.23.23c-.93.93-1.44 2.17-1.44 3.48 0 4.14 4.35 7.48 10.98 7.48 7.35 0 11.66-4.14 11.66-8.91 0-1.1-.38-2.07-1.04-2.77z"
        fill="#2496ED"
      />
    </svg>
  );
}

export function TableauIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11.2 1.5h1.6v4.6h-1.6V1.5zM11.2 17.9h1.6v4.6h-1.6v-4.6zM4.6 11.2h4.6v1.6H4.6v-1.6zM14.8 11.2h4.6v1.6h-4.6v-1.6z" fill="#E8762D" />
      <path d="M7 6.3h1.4v3.4H7V6.3zm8.6 0H17v3.4h-1.4V6.3zM7 14.3h1.4v3.4H7v-3.4zm8.6 0H17v3.4h-1.4v-3.4z" fill="#1C5E8A" />
      <circle cx="12" cy="12" r="1.8" fill="#E8762D" />
    </svg>
  );
}

export function NotionIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4.46 3.02l10.92-1.99c1.3-.24 2.22.42 2.68 1.48l3.48 8.16c.3.7.3 1.46.02 2.16l-3.8 9.54c-.46 1.16-1.58 1.73-2.88 1.5l-10.9-1.95c-1.3-.23-2.08-1.06-2.42-2.18L.06 7.42C-.28 6.3.2 5.06 1.5 4.82l2.96-.54V3.02zm3.32 5.04c-.66.08-1.1.4-1.1 1.04v7.7c0 .64.44.96 1.1.96.64 0 1.08-.32 1.08-.96V9.1c0-.64-.44-1.04-1.08-1.04zm4.4 0c-.64.08-1.08.4-1.08 1.04v7.7c0 .64.44.96 1.08.96.66 0 1.1-.32 1.1-.96V9.1c0-.64-.44-1.04-1.1-1.04zm4.42 0c-.66.08-1.1.4-1.1 1.04v7.7c0 .64.44.96 1.1.96.64 0 1.08-.32 1.08-.96V9.1c0-.64-.44-1.04-1.08-1.04z"
        fill="#1A1917"
      />
    </svg>
  );
}

export function LatexIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" fill="#008080" fillOpacity="0.15" stroke="#008080" strokeWidth="1.5" />
      <text x="12" y="16" fill="#008080" fontSize="11" fontWeight="bold" fontFamily="serif" textAnchor="middle">
        T<tspan dy="2" fontSize="9">E</tspan><tspan dy="-2">X</tspan>
      </text>
    </svg>
  );
}

export function MatlabIcon({ className = "w-4 h-4", size = 16 }: ToolIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.8 17.5c-.7 1.4-3.1 3.5-6.8 3.5-3.5 0-5.8-2.6-7.8-5.3-2-2.7-3.9-5.2-6.2-5.2-1.2 0-2 .6-2.5 1.5l1.6 1.3c.3-.5.6-.7 1-.7 1.4 0 3 2.1 4.9 4.7 2.1 2.8 4.7 5.7 9 5.7 4.5 0 7.3-2.6 8.3-4.2l-1.5-1.3z"
        fill="#E14414"
      />
      <path
        d="M2.2 6.5C2.9 5.1 5.3 3 9 3c3.5 0 5.8 2.6 7.8 5.3 2 2.7 3.9 5.2 6.2 5.2 1.2 0 2-.6 2.5-1.5l-1.6-1.3c-.3.5-.6.7-1 .7-1.4 0-3-2.1-4.9-4.7C15.9 5.2 13.3 2.3 9 2.3 4.5 2.3 1.7 4.9.7 6.5l1.5 1.3z"
        fill="#0076A8"
      />
    </svg>
  );
}
