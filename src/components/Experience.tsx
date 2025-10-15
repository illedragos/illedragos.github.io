import React from "react";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "Full-Stack Developer",
      company: "Current Position",
      period: "2023 - Present",
      description: [
        "Lead development of scalable web applications serving 10,000+ users",
        "Architected microservices infrastructure reducing response time by 40%",
        "Mentored junior developers and conducted technical code reviews",
        "Implemented CI/CD pipelines improving deployment efficiency by 60%",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      title: "Full-Stack Developer",
      company: "Previous Company",
      period: "2022 - 2023",
      description: [
        "Developed and maintained multiple client-facing applications",
        "Collaborated with cross-functional teams using Agile methodologies",
        "Optimized database queries resulting in 30% performance improvement",
        "Built responsive UIs following modern design principles",
      ],
      technologies: ["React", "Express.js", "MongoDB", "TypeScript"],
    },
    {
      title: "Frontend Developer",
      company: "Early Career",
      period: "2021 - 2022",
      description: [
        "Built interactive user interfaces using React and modern CSS",
        "Integrated RESTful APIs and managed application state",
        "Collaborated with designers to implement pixel-perfect designs",
        "Participated in code reviews and technical discussions",
      ],
      technologies: ["React", "JavaScript", "CSS3", "REST APIs"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 section-padding bg-neutral-50 dark:bg-neutral-800/50 transition-colors duration-300"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 transition-colors">
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto transition-colors">
            My journey through the tech industry, building solutions and growing
            expertise across various technologies and domains.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-neutral-200 dark:bg-neutral-700"></div>
              )}

              <div className="flex items-start space-x-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center relative z-10 transition-colors">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex-1 card">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium transition-colors">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1 md:mt-0 transition-colors">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {exp.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-neutral-600 dark:text-neutral-300 flex items-start transition-colors"
                      >
                        <span className="text-primary-500 dark:text-primary-400 mr-2 mt-1 flex-shrink-0">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="card max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 transition-colors">
              Ready for New Challenges
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4 transition-colors">
              Looking for opportunities to contribute to innovative projects and
              grow with a dynamic team.
            </p>
            <a href="#contact" className="btn-primary">
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
