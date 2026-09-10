import React from "react";
import { useInView } from "../hooks/useInView";
import { useTilt } from "../hooks/useTilt";

interface Project {
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  /** Public link where one exists; internal client work has none. */
  href?: string;
  access: "public" | "internal";
  /** Draws a small badge only — every card is the same size. */
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "Multi-Tier Component Library",
    kind: "Design System",
    summary:
      "Two generations of the design system behind a major cloud provider's marketing site: shipped v1 to production, then helped architect the v2 rebuild under strict Atomic Design, with patterns mapped 1:1 to CMS blocks so pages compose without custom code.",
    stack: ["TypeScript", "React", "CSS Modules", "Payload CMS", "Storybook"],
    access: "internal",
    featured: true,
  },
  {
    title: "Google Docs Feedback Extension",
    kind: "Chrome Extension",
    summary:
      "A published Chrome Extension that surfaces real-time writing feedback inside Google Docs, driven by background and content scripts and covered by automated Playwright tests.",
    stack: ["TypeScript", "Chrome APIs", "React", "Playwright"],
    access: "internal",
  },
  {
    title: "Feedback-Driven Writing Platform",
    kind: "Web Application",
    summary:
      "A writing environment built around structured feedback, pairing a Froala-based editor with Node and Express services behind a Next.js front end.",
    stack: ["React", "Next.js", "Froala", "Node.js", "Express"],
    access: "internal",
  },
  {
    title: "Scheduled Reporting Service",
    kind: "Backend Service",
    summary:
      "A batch job I owned end to end for an AI essay-assessment platform, mailing daily operational digests to product and business stakeholders. Designed for safe production runs: env-gated recipients and a dry-run mode that logs payloads instead of sending.",
    stack: ["TypeScript", "Node.js", "Sequelize", "AWS SES", "Docker", "GitLab CI"],
    access: "internal",
  },
  {
    title: "Employee Management Platform",
    kind: "Internal Platform",
    summary:
      "A company-wide platform I worked across both sides of: a role-gated React and TypeScript SPA over an Express and MySQL API, covering time-off, desk booking on an interactive floorplan, team administration and reporting. Shipped to Kubernetes.",
    stack: ["React", "TypeScript", "Redux", "Express", "MySQL", "Kubernetes"],
    access: "internal",
  },
  {
    title: "Corporate Site & CMS",
    kind: "Marketing Site",
    summary:
      "A responsive corporate website with dynamic article management through Strapi, tuned for SEO and fast content delivery.",
    stack: ["Next.js", "Strapi", "Tailwind", "SEO"],
    access: "internal",
  },
  {
    title: "Tennis Statistics Platform",
    kind: "Internship Project",
    summary:
      "Player statistics and profiles served by a Java and Spring backend, with a dynamic Angular front end. Built during an internship at Fortech.",
    stack: ["Java", "Spring", "Angular", "REST"],
    access: "internal",
  },
  {
    title: "This Portfolio",
    kind: "Open Source",
    summary:
      "The site you're on: a hand-rolled WebGL point cloud, canvas-projected 3D scenes and a hacker mode, built with no 3D library and shipped to GitHub Pages.",
    stack: ["React 19", "TypeScript", "WebGL", "Vite", "Tailwind"],
    href: "https://github.com/illedragos/illedragos.github.io",
    access: "public",
  },
];

const ProjectCard: React.FC<{ project: Project; index: number; shown: boolean }> = ({
  project,
  index,
  shown,
}) => {
  const tilt = useTilt<HTMLDivElement>({ max: 7, lift: 12, perspective: 1100 });

  return (
    <div
      className="[perspective:1100px]"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 600ms ease ${index * 80}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
    >
      <div
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        className="project-card tilt-3d"
      >
        {/* Stretched link: keeps the card a plain div while still giving
            keyboard and screen-reader users one real, labelled target. */}
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
            aria-label={`${project.title} — view source on GitHub`}
          />
        )}

        <span className="project-card__sweep" />

        <div className="project-card__top">
          <span className="project-card__kind">
            {project.featured && <em className="project-card__flag">featured</em>}
            {project.kind}
          </span>
          <span className="project-card__index">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="project-card__title">
          {project.title}
          {project.href && (
            <svg
              className="project-card__arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          )}
        </h3>

        <p className="project-card__summary">{project.summary}</p>

        <div className="project-card__stack">
          {project.stack.map((tech) => (
            <span key={tech} className="project-card__chip">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card__foot">
          <span className={`project-card__dot project-card__dot--${project.access}`} />
          {project.access === "public" ? "source available" : "private repository"}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="projects"
      className="py-20 section-padding bg-neutral-50 dark:bg-neutral-800/50 transition-colors duration-300"
    >
      <div className="container-max">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 transition-colors">
            Selected Work
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto transition-colors">
            Products and platforms I've designed, built and shipped — from a
            published Chrome Extension to role-based internal platforms.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              shown={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
