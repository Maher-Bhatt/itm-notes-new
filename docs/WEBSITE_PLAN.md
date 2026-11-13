# CampusLoop: from app to professional website

Benchmark: [College Confidential](https://collegeconfidential.com/), reviewed 13 Nov 2026.

## What College Confidential does well

| Area | College Confidential | CampusLoop today |
|---|---|---|
| Promise | One line: "The Real Deal on Applying To College", one button | Several competing headlines, typewriter text, an "interactive test drive" |
| Navigation | 3 menu groups (Community, College, Resources) + 2 highlighted tools | Landing: 4 anchor links. App: ~20 sidebar items |
| Proof | 3 big numbers (22M posts, 300+ schools, 10,000+ articles), each with its own call to action | Mix of real and unverified numbers |
| Public content | Article library, A–Z school directory, calendars, scholarship search: thousands of indexable URLs | Landing + Semester 3 Library (68 URLs, made public 13 Nov) |
| Trust | About, Privacy Policy, Terms, Forum Rules, Press, Partner pages; consent banner | No About, Privacy or Terms page |
| Separation | Marketing site (collegeconfidential.com) and community (talk.collegeconfidential.com) | One single-page app does everything |
| Design | White + light gray, one blue accent, one yellow highlight, illustrations, generous spacing | Calm cream/charcoal palette now, but the landing page is still busy |

## Principles for CampusLoop

1. **Content first, app second.** Notes, guides and papers are the product and should be public and indexable. Sign-in is for personal features (progress, notes, community, coding lab).
2. **One promise per page.** Every page answers one question and has one primary button.
3. **Only real numbers.** Every count on the site is computed from data.
4. **Fewer, deeper features.** Promote 5 things; tuck the rest under "More tools".
5. **Trust is a feature.** Legal, about and contact pages; clear ownership; a privacy-respecting consent banner.

## Information architecture

```
/                      Home: promise, search, subjects, proof, testimonials, footer
/library               All subjects (public)
/library/:subject      Subject hub: study guide, units, papers (public, indexable)
/library/:subject/:doc Reader (public, indexable)
/papers                Previous-year papers by subject and year (public)
/guides                Exam-prep articles: "How to prepare DBMS in 7 days" (public)
/universities          University directory (only universities with real content)
/about  /privacy  /terms  /contact  /guidelines
/app/...               Signed-in area: dashboard, progress, quiz, mock exams, coding lab, community
```

Top navigation (public): **Library · Papers · Guides · Universities**, then a highlighted **Search**, then **Sign in**.

## Phases

### Phase 1: Foundation (1–2 days)

- [x] Make the Library and reader public; sitemap with all 68 URLs; robots allow `/library` and `/reading/`
- [ ] Replace the landing page with a College Confidential-style home: one promise ("Your semester, in one calm place"), a search box, subject cards, 3 real proof numbers (documents, subjects, practicals), a "Why CampusLoop" section, footer
- [ ] Public header and footer on all public pages (logo, 4 links, search, sign in; footer with About, Privacy, Terms, Contact)
- [ ] About, Privacy Policy, Terms of Use, Contact and Community Guidelines pages
- [ ] Cookie/analytics consent that defaults to essential-only
- [ ] Remove the unused PWA install prompt branding and the leftover "ITM SLS Baroda" hard-coding in the logo subtitle and sidebar

### Phase 2: Discoverability (2–3 days)

- [ ] **Prerender public routes** at build time so Google and link previews see full HTML without running JavaScript (`vite-plugin-prerender` or `react-snap`; or move the public site to Astro/Next.js in a later phase)
- [ ] Per-document Open Graph images (title + subject on the paper background)
- [ ] `Article` / `LearningResource` structured data on reader pages; `Course` on subject hubs; breadcrumbs
- [ ] Custom domain (e.g. `campusloop.in`), redirect from the vercel.app URL
- [ ] Google Search Console + Bing Webmaster: submit sitemap, monitor coverage
- [ ] Privacy-friendly analytics (Vercel Analytics or Plausible): search terms, top documents, drop-off

### Phase 3: Content depth (ongoing)

- [ ] Previous-year papers section with year/subject filters and solutions
- [ ] Exam-prep guides (10–20 articles): one per subject plus cross-cutting ("last 7 days plan", "how to write a 7-mark answer")
- [ ] In-document search and "jump to unit" on subject hubs
- [ ] Better source conversion: OCR for handwritten notes (searchable text alongside page images); formula extraction for CONMP
- [ ] Semester 1, 2, 4 libraries using `scripts/library`

### Phase 4: Community done properly

- [ ] Doubt threads attached to documents and sections (like CC's school forums)
- [ ] Moderation queue, report button, rate limits, community guidelines
- [ ] Email digests: "new notes for your subjects", "exam in 7 days"

### Phase 5: Polish and quality

- [ ] Design system pass: one card style, one button style, spacing scale, illustration set
- [ ] Accessibility audit (contrast, focus states, keyboard navigation, screen-reader labels)
- [ ] Performance: split the 10 MB main bundle (question banks and practicals load on demand), image compression for scanned pages (WebP/AVIF)
- [ ] Error monitoring and uptime checks

## Decisions needed from the owner

1. **Domain name**: buy `campusloop.in` (or similar)?
2. **Positioning**: one university done deeply (ITM SLS Baroda) or multi-university? College Confidential works because every school page has real content; empty university pages hurt trust and SEO.
3. **Material permissions**: confirm that sharing faculty slides and notes publicly is allowed, or limit the public library to student-written study guides.
4. **Monetisation**: none, ads, or sponsors? This affects the privacy policy and consent banner.
