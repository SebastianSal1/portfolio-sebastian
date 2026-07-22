import type { ReactNode } from "react";

/** Canonical content category — one per entry. */
export type WorkCategory =
  | "work"
  | "internship"
  | "competition"
  | "organization"
  | "volunteer";

export interface WorkScreenshot {
  src: string;
  alt: string;
}

export interface WorkFrontmatter {
  slug: string;
  title: string;
  domain: string;
  outcome: string;
  category: WorkCategory;
  categoryOrder: number;
  featured?: boolean;
  featuredOrder?: number;
  caption: string;
  screenshots?: {
    src?: string;
    /** @deprecated Cloudinary publicId — ignored; use local src */
    publicId?: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
}

export interface WorkCardData {
  slug: string;
  title: string;
  domain: string;
  outcome: string;
  category: WorkCategory;
  categoryOrder: number;
  featured: boolean;
  featuredOrder: number;
  caption: string;
  screenshots: WorkScreenshot[];
  cover: WorkScreenshot | null;
  body?: ReactNode;
}

export const CATEGORY_LABEL: Record<WorkCategory, string> = {
  work: "Work Experience",
  internship: "Internship",
  competition: "Competition & Case Study",
  organization: "Organization",
  volunteer: "Volunteering",
};
