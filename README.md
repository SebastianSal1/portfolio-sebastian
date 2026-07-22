# Sebastian Lumme — Portfolio Website

Strategy, analysis, and industrial engineering portfolio — Next.js, Tailwind CSS, Framer Motion, MDX.

## Setup

```bash
cd src
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

No required env vars for media. Local images live in `public/work/`.

Optional legacy only (leave unset):

```
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

See `.env.example`. Do not commit `.env.local`.

## Folder Structure

```
├── app/                 # layout, page, opengraph-image
├── components/          # UI sections + lightbox
├── content/work/        # MDX work entries
├── lib/
│   ├── types.ts
│   ├── media.ts         # local path helpers + text-led placeholders
│   ├── work.ts          # MDX loader; filters missing /public files
├── public/
│   ├── work/            # WebP screenshots
│   ├── cv.pdf
│   └── fonts/
└── next.config.mjs      # no remote image CDN required
```

## Adding a Work Card

1. Create `content/work/your-slug.mdx` with frontmatter:

```mdx
---
slug: your-slug
title: "Project Title"
domain: "Category Name"
outcome: "One-line result"
category: internship
categoryOrder: 8
featured: false
caption: "Lightbox caption"
screenshots:
  - src: /work/your-image.webp
    alt: "Description"
---

## Context
...
```

2. Place WebP under `public/work/` (or leave `screenshots: []` for intentional text-led cover).
3. Rebuild: `npm run build`.

## Deploy to Vercel

1. Root Directory: **`src`** (repo root is the parent folder).
2. Framework: Next.js (auto).
3. Env: none required for images.
4. Domain: set `metadataBase` in `app/layout.tsx` after production URL is known.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Content | MDX (`next-mdx-remote`) |
| Images | Local `public/work/*` WebP |
| Deploy | Vercel |
