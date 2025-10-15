import React, { useEffect, useState } from "react";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding"
    >
      <div className="container-max text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* AI-inspired floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            <div
              className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent-400 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary-300 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          <div className="relative z-10">
            <p className="text-primary-600 font-medium text-lg mb-4 tracking-wide">
              Hello, I'm
            </p>

            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              Dragos Ille
            </h1>

            <h2 className="text-2xl md:text-3xl text-neutral-600 mb-8 font-light">
              Full-Stack Developer
            </h2>

            <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              Crafting elegant digital experiences with 4+ years of expertise in
              modern web technologies. Passionate about building scalable
              solutions that make a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#about" className="btn-primary">
                Get to know me
              </a>
              <a href="#experience" className="btn-secondary">
                View my work
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
