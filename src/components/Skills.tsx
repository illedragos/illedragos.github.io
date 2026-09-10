import React from "react";
import TechCube from "./TechCube";
import SkillMeter from "./SkillMeter";
import { useInView } from "../hooks/useInView";

interface Skill {
  name: string;
  percentage: number;
}

const Skills: React.FC = () => {
  const { ref: sectionRef, inView: isVisible } = useInView<HTMLElement>();

  const skills: Skill[] = [
    { name: "React", percentage: 75 },
    { name: "Next.js", percentage: 65 },
    { name: "TypeScript", percentage: 70 },
    { name: "Node.js", percentage: 85 },
    { name: "Material-UI", percentage: 80 },
    { name: "MySQL", percentage: 55 },
    { name: "Express", percentage: 60 },
    { name: "Docker", percentage: 45 },
    { name: "Chrome extension", percentage: 80 },
    { name: "Git", percentage: 80 },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 section-padding bg-white dark:bg-neutral-900 transition-colors duration-300"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 transition-colors">
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto transition-colors">
            Here's a breakdown of my technical skills and proficiency levels.
            I'm always learning and expanding my knowledge in emerging
            technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <SkillMeter
              key={skill.name}
              label={skill.name}
              value={skill.percentage}
              active={isVisible}
              delay={index * 90}
            />
          ))}
        </div>

        {/* Technologies Grid */}
        <div className="mt-20">
          <TechCube />

          <h3 className="mt-14 text-2xl font-semibold text-center text-neutral-900 dark:text-white mb-8 transition-colors">
            Technologies I Work With
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Express",
              "Vite",
              "CSS Modules",
              "styled-components",
              "Tailwind",
              "Material-UI",
              "Shadcn",
              "Radix UI",
              "Lucide",
              "Storybook",
              "Payload CMS",
              "Strapi",
              "Froala",
              "Sequelize",
              "MySQL",
              "Turborepo",
              "Docker",
              "AWS",
              "GitLab CI",
              "Playwright",
              "Jest",
              "Chrome Extension",
              "Google Auth",
              "Google Calendar API",
              "Slack API",
            ].map((tech) => (
              <div
                key={tech}
                className="card tech-chip text-center py-4"
              >
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 transition-colors">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
