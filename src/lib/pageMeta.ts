const BASE_TITLE = "CampusLoop";
export const DEFAULT_TITLE = "CampusLoop | Semester 3 notes, study guides & exam prep for B.Tech students";

const ROUTE_TITLES: [RegExp, string][] = [
  [/^\/dashboard/, "Dashboard"],
  [/^\/library\/?$/, "Library"],
  [/^\/library\/[^/]+\/?$/, "Library"],
  [/^\/today/, "Today"],
  [/^\/subjects/, "Subjects"],
  [/^\/subject\/[^/]+\/cheat-sheet/, "Cheat sheet"],
  [/^\/subject\//, "Subject"],
  [/^\/imp-questions/, "Question banks"],
  [/^\/pyq-papers/, "Past papers"],
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
