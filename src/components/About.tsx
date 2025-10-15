import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 section-padding bg-neutral-50 dark:bg-neutral-800/50 transition-colors duration-300"
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 transition-colors">
                About Me
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
            </div>

            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
              I'm a passionate full-stack developer with over 4 years of
              experience building scalable web applications. My journey in
              software development has been driven by curiosity and a desire to
              create meaningful digital experiences.
            </p>

            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
              I specialize in modern JavaScript frameworks, particularly React
              and Node.js, and I'm always exploring new technologies to stay at
              the forefront of web development. My approach combines technical
              excellence with user-centered design thinking.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="space-y-2 group hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold text-neutral-900 dark:text-white transition-colors">
                  Frontend Focus
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 transition-colors">
                  React, TypeScript, Tailwind
                </p>
              </div>
              <div className="space-y-2 group hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold text-neutral-900 dark:text-white transition-colors">
                  Backend Expertise
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 transition-colors">
                  Node.js, Python, PostgreSQL
                </p>
              </div>
              <div className="space-y-2 group hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold text-neutral-900 dark:text-white transition-colors">
                  Architecture
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 transition-colors">
                  Microservices, REST APIs
                </p>
              </div>
              <div className="space-y-2 group hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold text-neutral-900 dark:text-white transition-colors">
                  Philosophy
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 transition-colors">
                  Clean code, User experience
                </p>
              </div>
            </div>
          </div>

          {/* Image/Visual Element */}
          <div className="relative">
            <div className="card p-8 text-center">
              {/* Placeholder for professional photo */}
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-24 h-24 text-primary-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 transition-colors">
                Full-Stack Developer
              </h3>
              <p className="text-neutral-600 dark:text-neutral-100 mb-4 transition-colors font-medium">
                4+ Years Experience
              </p>

              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 transition-colors">
                    15+
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-300 transition-colors">
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 transition-colors">
                    4+
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-300 transition-colors">
                    Years
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 transition-colors">
                    10+
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-300 transition-colors">
                    Technologies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
