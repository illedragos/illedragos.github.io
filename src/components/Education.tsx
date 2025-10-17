import React from "react";

interface EducationItem {
  period: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
}

const Education: React.FC = () => {
  const education: EducationItem[] = [
    {
      period: "2021 - present",
      degree: "Doctoral School of Engineering Sciences",
      field: "Engineering Sciences",
      institution: "University of Oradea",
      location: "Oradea",
    },
    {
      period: "2018 - 2021",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      institution: "University of Oradea",
      location: "Oradea",
    },
    {
      period: "2013 - 2015",
      degree: "Master's Degree",
      field: "Geography - GIS Specialist",
      institution: "University Babes Bolyai",
      location: "Cluj-Napoca",
    },
    {
      period: "2009 - 2013",
      degree: "Bachelor's Degree",
      field: "Cadastre-Topography - Surveyor",
      institution: "Technical University of Cluj-Napoca",
      location: "Cluj-Napoca",
    },
    {
      period: "2005 - 2009",
      degree: "High School Diploma (Baccalaureate)",
      field: "Mathematics - Computer Science",
      institution: "Avram Iancu National College",
      location: "Ștei",
    },
  ];

  return (
    <section
      id="education"
      className="py-20 section-padding bg-white dark:bg-neutral-900 transition-colors duration-300"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 transition-colors">
            Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto transition-colors">
            My academic journey across multiple disciplines, from engineering to
            computer science.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 hidden md:block"></div>

            {/* Education items */}
            <div className="space-y-8">
              {education.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute left-8 top-6 w-4 h-4 bg-primary-500 dark:bg-primary-400 rounded-full border-4 border-white dark:border-neutral-900 transform -translate-x-1/2 hidden md:block group-hover:scale-125 transition-transform duration-300"></div>

                  {/* Content card */}
                  <div className="md:ml-20 card p-6 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                          <svg
                            className="w-5 h-5 text-primary-600 dark:text-primary-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white transition-colors">
                            {item.degree}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium transition-colors">
                            {item.field}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 transition-colors">
                        {item.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">
                        {item.institution}, {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
