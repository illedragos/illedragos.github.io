import React from "react";
import TechCube from "./TechCube";
import SkillMeter from "./SkillMeter";
import { useInView } from "../hooks/useInView";

interface Skill {
  name: string;
  percentage: number;
  /** Hue for the meter's palette — see `--meter-hue` in index.css. */
  hue: number;
}

const Skills: React.FC = () => {
  const { ref: sectionRef, inView: isVisible } = useInView<HTMLElement>();

  const skills: Skill[] = [
    { name: "React", percentage: 75, hue: 190 },
    { name: "Next.js", percentage: 65, hue: 205 },
    { name: "TypeScript", percentage: 70, hue: 218 },
    { name: "Node.js", percentage: 85, hue: 135 },
    { name: "Material-UI", percentage: 80, hue: 45 },
    { name: "MySQL", percentage: 55, hue: 232 },
    { name: "Express", percentage: 60, hue: 152 },
    { name: "Docker", percentage: 45, hue: 200 },
    { name: "Chrome extension", percentage: 80, hue: 28 },
    { name: "Git", percentage: 80, hue: 12 },
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
              hue={skill.hue}
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
              "Strapi",
              "Froala",
              "Docker",
              "Material-UI",
              "Tailwind",
              "Shadcn",
              "Radix UI",
              "Lucide",
              "Playwright",
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
