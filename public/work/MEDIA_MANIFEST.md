# Media manifest — local screenshots

Paths in MDX: `/work/<filename>`. Missing files filtered at build (no 404).

| Entry | Category | Featured | Website assets | Source class | Status | Redaction | Notes |
|---|---|---|---|---|---|---|---|
| equity-research | internship | yes #1 | `equity-research-cover.webp` only | Intern presentation title slide | PUBLIC_AFTER_REDACTION | Deliverables + valuation slides **removed** | Cover keeps HPS logo + personal name. Firm report templates, target-price memos, and ticker valuation tables not shipped. |
| april-internship | internship | yes #2 | `april-internship-cover.webp` only | Academic KP report cover | PUBLIC_AFTER_REDACTION | Abstract page **removed** | Cover = title/author/ITB only. Abstract named plant unit (RAPP/BCTMP), process detail, and numeric utility ranges. Metrics stay text-only as estimated opportunity. |
| ikonstulan-internship | internship | yes #3 | `ikonstulan-transaction-menu.webp`, `ikonstulan-login.webp` | Practice/demo banking UI | PUBLIC | No prod DB/credentials | Demo/training app — not production MSME banking screenshots. Username field shows demo `admin` only. |
| tdc-business-case | competition | yes #4 | cover, exec-summary, background, problem | Competition pitch deck pp.1–4 | PUBLIC (competition) | None this pass | 1st place via personal certificate. Bobobox = case company; recommendations = proposals not implemented impact. Team names on cover are competition roster. |
| network-to-grow | competition | no | — (text-led) | — | INTENTIONAL_TEXT | — | Label: Strategy Case |
| industrial-fair | competition | no | — (text-led) | — | INTENTIONAL_TEXT | — | Label: Business Proposal. Category still competition pending confirm. |
| industrial-essay | competition | no | — (text-led) | — | INTENTIONAL_TEXT | — | Label: Written Analysis |

## Rejected / removed this remediation

| Asset | Reason |
|---|---|
| `equity-research-deliverables.webp` | Firm report product thumbnails; initiation coverage with target-price framing |
| `equity-research-valuation.webp` | Ticker-specific valuation ranges (TLKM/EXCL) — research-product look |
| `april-internship-abstract.webp` | Named plant (PT Riau Andalan Pulp and Paper), process internals, numeric utility bands |
| HPS daily report PNGs / Bloomberg peers | Firm product / proprietary-looking comps |
| APRIL process P&IDs, mass balance, plant photos | Confidential plant data |
| Ikonsultan ecommerce/Bonita production assets | Employer system risk |
| TDC teammate certificates, guidebook TOC | Wrong person / weak evidence |
| Raw PDFs in `public/` | Do not ship source documents |

## Local source roots (not in repo)

Original export sources live outside this repository under the user's Career media folders. Paths are intentionally omitted from git to avoid private filesystem disclosure. See operator notes, not this file, for absolute paths.
