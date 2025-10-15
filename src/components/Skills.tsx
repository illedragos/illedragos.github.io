import React, { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
    { name: "React", percentage: 75, color: "from-blue-500 to-blue-600" },
    { name: "Next.js", percentage: 35, color: "from-gray-700 to-gray-800" },
    { name: "TypeScript", percentage: 70, color: "from-blue-600 to-blue-700" },
    { name: "Node.js", percentage: 65, color: "from-green-500 to-green-600" },
    { name: "Python", percentage: 60, color: "from-yellow-500 to-yellow-600" },
    { name: "PostgreSQL", percentage: 55, color: "from-blue-700 to-blue-800" },
    { name: "MongoDB", percentage: 50, color: "from-green-600 to-green-700" },
    { name: "Docker", percentage: 45, color: "from-blue-400 to-blue-500" },
    { name: "AWS", percentage: 40, color: "from-orange-500 to-orange-600" },
    { name: "Git", percentage: 80, color: "from-red-500 to-red-600" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Here's a breakdown of my technical skills and proficiency levels.
            I'm always learning and expanding my knowledge in emerging
            technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-neutral-900">
                  {skill.name}
                </span>
                <span className="text-sm text-neutral-500">
                  {skill.percentage}%
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className={`progress-fill bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                  style={{
                    width: isVisible ? `${skill.percentage}%` : "0%",
                    transitionDelay: `${index * 100}ms`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center text-neutral-900 mb-8">
            Technologies I Work With
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "JavaScript",
              "React",
              "Node.js",
              "TypeScript",
              "Python",
              "PostgreSQL",
              "MongoDB",
              "Express",
              "Next.js",
              "Docker",
              "AWS",
              "Git",
            ].map((tech) => (
              <div key={tech} className="card text-center py-4">
                <span className="text-sm font-medium text-neutral-700">
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
