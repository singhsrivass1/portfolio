/**
 * Site-wide facts. Every value here is verified against a source named in
 * docs/portfolio-2/HANDOFF.md. Change a fact here, not in a component.
 *
 * Copy rule: no em dashes or en dashes anywhere in user-facing text.
 * Ranges use "to".
 */

export const site = {
  name: "Srivass Kumar",
  url: "https://srivxdev.vercel.app",
  role: "Software engineer",
  location: "Deoghar, India",
  email: "srivass15o@gmail.com",

  education: {
    degree: "B.Tech, AI and ML",
    school: "BIT Mesra",
    years: "2024 to 2028",
    graduation: "June 2028",
    cgpa: "8.51",
  },

  // TODO(stage 11): host the final résumé at /public/resume.pdf and point
  // this at "/resume.pdf". Until then it is the link the current site uses.
  resumeUrl: "https://drive.google.com/file/d/1AJTuIfbveXCT1B5Yvikv7A4HN0nAAXXh/view?usp=drivesdk",

  profiles: [
    { label: "GitHub", href: "https://github.com/singhsrivass1" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/srivasskr/" },
    { label: "Codeforces", href: "https://codeforces.com/profile/singhsrivass" },
    { label: "LeetCode", href: "https://leetcode.com/u/dumbbcat/" },
  ],

  record: [
    { label: "B.Tech, AI and ML, BIT Mesra", value: ["2024 to 2028", "CGPA 8.51"] },
    // Checked on codeforces.com/profile/singhsrivass, 6 November 2026.
    { label: "Codeforces", value: ["Max 1221, Pupil", "Now 1176, Newbie"] },
    { label: "Problems solved, LeetCode and Codeforces", value: ["500+"] },
    { label: "JEE Main 2024, Physics", value: ["99.4 percentile"] },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Résumé (PDF)", href: site.resumeUrl, external: true },
  { label: "Email", href: `mailto:${site.email}` },
] as const;
