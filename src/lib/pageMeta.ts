const BASE_TITLE = "CampusLoop";
export const DEFAULT_TITLE = "CampusLoop | Semester 3 notes, study guides & exam prep for B.Tech students";

const ROUTE_TITLES: [RegExp, string][] = [
  [/^\/dashboard/, "Dashboard"],
  [/^\/library\/?$/, "Library"],
  [/^\/library\/[^/]+\/?$/, "Library"],
  [/^\/exam-plan/, "Exam plan"],
  [/^\/today/, "Today"],
  [/^\/subjects/, "Subjects"],
  [/^\/subject\/[^/]+\/cheat-sheet/, "Cheat sheet"],
  [/^\/subject\//, "Subject"],
  [/^\/imp-questions/, "Question banks"],
  [/^\/(papers|pyq-papers)/, "Past papers"],
  [/^\/mock-exam/, "Mock exams"],
  [/^\/rapid-revision/, "Rapid revision"],
  [/^\/formulas/, "Formula bank"],
  [/^\/coding-lab/, "Coding lab"],
  [/^\/quiz/, "Quiz"],
  [/^\/study-planner/, "Study planner"],
  [/^\/(calculator|gpa-calculator)/, "Attendance & SGPA"],
  [/^\/materials/, "Study materials"],
  [/^\/bookmarks/, "Bookmarks"],
  [/^\/analytics/, "Learning analytics"],
  [/^\/(community|social)/, "Campus feed"],
  [/^\/explore/, "Explore"],
  [/^\/(inbox|messages)/, "Messages"],
  [/^\/profile/, "Profile"],
  [/^\/admin/, "Admin"],
];

export function titleForPath(pathname: string): string {
  const hit = ROUTE_TITLES.find(([re]) => re.test(pathname));
  return hit ? `${hit[1]} · ${BASE_TITLE}` : BASE_TITLE;
}

/** Signed-in app pages should not be indexed even if a crawler reaches them. */
export function setRobots(content: "index, follow" | "noindex, nofollow") {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = "robots";
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export const SITE_URL = typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("localhost")
  ? window.location.origin
  : "https://itm-notes-new.vercel.app";

/** Public, indexable sections of the app (everything else requires sign-in). */
export function isPublicPath(pathname: string) {
  return pathname === "/" || /^\/(library|exam-plan|papers)(\/|$)/.test(pathname);
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

/** Title, description, canonical and social tags for a public page. */
export function setPageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }) {
  document.title = title;
  const url = `${SITE_URL}${path}`;
  upsertMeta("name", "description", description);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  if (image) {
    upsertMeta("property", "og:image", `${SITE_URL}${image}`);
    upsertMeta("name", "twitter:image", `${SITE_URL}${image}`);
  }
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
  setRobots("index, follow");
}
