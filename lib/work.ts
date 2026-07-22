import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { isValidPublicSrc, toScreenshot } from "./media";
import type { WorkCardData, WorkCategory, WorkFrontmatter } from "./types";

const WORK_DIR = join(process.cwd(), "content", "work");
const PUBLIC_DIR = join(process.cwd(), "public");

const VALID_CATEGORIES: WorkCategory[] = [
  "work",
  "internship",
  "competition",
  "organization",
  "volunteer",
];

function normalizeCategory(raw: unknown): WorkCategory {
  if (
    typeof raw === "string" &&
    VALID_CATEGORIES.includes(raw as WorkCategory)
  ) {
    return raw as WorkCategory;
  }
  return "competition";
}

function publicFileExists(src: string): boolean {
  const rel = src.replace(/^\//, "");
  return existsSync(join(PUBLIC_DIR, rel));
}

function resolveScreenshots(
  entries: {
    src?: string;
    publicId?: string;
    alt: string;
  }[] = []
) {
  return entries
    .filter((e) => isValidPublicSrc(e.src) && publicFileExists(e.src!))
    .map((e) => toScreenshot(e.src!, e.alt));
}

export async function getAllWorkCards(): Promise<WorkCardData[]> {
  const files = readdirSync(WORK_DIR).filter((f) => f.endsWith(".mdx"));
  const cards: WorkCardData[] = [];

  for (const file of files) {
    const source = readFileSync(join(WORK_DIR, file), "utf-8");
    const { frontmatter, content } = await compileMDX<
      WorkFrontmatter & { tags?: string[] }
    >({
      source,
      options: { parseFrontmatter: true },
    });

    const category =
      frontmatter.category ??
      (frontmatter.tags?.[0] === "internship" ? "internship" : "competition");

    const screenshots = resolveScreenshots(frontmatter.screenshots ?? []);

    cards.push({
      slug: frontmatter.slug,
      title: frontmatter.title,
      domain: frontmatter.domain,
      outcome: frontmatter.outcome,
      category: normalizeCategory(category),
      categoryOrder: Number(frontmatter.categoryOrder) || 99,
      featured: Boolean(frontmatter.featured),
      featuredOrder:
        frontmatter.featuredOrder != null
          ? Number(frontmatter.featuredOrder)
          : 99,
      caption: frontmatter.caption,
      screenshots,
      cover: screenshots[0] ?? null,
      body: content,
    });
  }

  return cards.sort((a, b) => a.categoryOrder - b.categoryOrder);
}

export function getFeaturedCards(cards: WorkCardData[]): WorkCardData[] {
  return cards
    .filter((c) => c.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getCardsByCategory(
  cards: WorkCardData[],
  category: WorkCategory
): WorkCardData[] {
  return cards
    .filter((c) => c.category === category)
    .sort((a, b) => a.categoryOrder - b.categoryOrder);
}
