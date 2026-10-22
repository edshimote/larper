// Central site config for SEO/metadata. Set NEXT_PUBLIC_SITE_URL in the deploy environment to the
// real production domain once one exists (see DEPLOYMENT.md). Falls back to a placeholder so the
// site still builds locally; the placeholder is never presented as a real/confirmed URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://eduardo-dev.vercel.app";

export const SITE_NAME = "Eduardo.dev";
export const SITE_TITLE = "Eduardo.dev — Full-Stack Developer & Automation Specialist";
export const SITE_DESCRIPTION =
  "Eduardo builds high-performance websites, intelligent automations, bots, and custom software for US small and medium businesses. Full-stack development in React, Next.js, Node.js, Python and C#.";

export const PROJECT_ROUTES = [
  "northstar-barber",
  "ember-oak",
  "northline-logistics",
  "vanta-store",
  "flowcore-automation",
  "nexus-bot-console",
  "beyond-the-screen",
] as const;
