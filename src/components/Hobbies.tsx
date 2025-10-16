import React, { useEffect, useRef, useState } from "react";

interface Hobby {
  name: string;
  level: number;
  icon: string;
  color: string;
}

const Hobbies: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const hobbies: Hobby[] = [
    { name: "Tennis", level: 90, icon: "🎾", color: "bg-yellow-500" },
    { name: "Football", level: 81, icon: "⚽", color: "bg-green-500" },
    { name: "Running", level: 92, icon: "🏃", color: "bg-orange-500" },
    { name: "Music", level: 75, icon: "🎵", color: "bg-pink-500" },
    { name: "Gaming", level: 30, icon: "🎮", color: "bg-purple-500" },
    { name: "Reading", level: 84, icon: "📚", color: "bg-blue-500" },
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
    <section
      ref={sectionRef}
      id="hobbies"
      className="py-20 section-padding bg-neutral-50 dark:bg-neutral-800/50 transition-colors duration-300"
    >
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 transition-colors">
            Hobbies & Interests
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto transition-colors">
            Beyond coding, I enjoy exploring various activities that keep me
            creative and balanced.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {hobbies.map((hobby, index) => (
            <div
              key={hobby.name}
              className="card p-6 hover:scale-105 transition-all duration-300"
              style={{
                transitionDelay: `${index * 50}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{hobby.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-white transition-colors">
                    {hobby.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors">
                    Interest Level
                  </p>
                </div>
              </div>

              {/* Circular Progress Bar */}
              <div className="relative w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden transition-colors">
                <div className="absolute inset-0 flex">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 mx-0.5 rounded-sm transition-all duration-1000 ${
                        i < Math.floor(hobby.level / 10)
                          ? hobby.color
                          : "bg-transparent"
                      }`}
                      style={{
                        transitionDelay: isVisible
                          ? `${index * 100 + i * 50}ms`
                          : "0ms",
                        opacity:
                          isVisible && i < Math.floor(hobby.level / 10) ? 1 : 0,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Percentage Display */}
              <div className="mt-3 flex justify-between items-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        i < Math.floor(hobby.level / 20)
                          ? hobby.color
                          : "bg-neutral-300 dark:bg-neutral-600"
                      }`}
                      style={{
                        transitionDelay: isVisible
                          ? `${index * 100 + i * 80}ms`
                          : "0ms",
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300 transition-colors">
                  {hobby.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
