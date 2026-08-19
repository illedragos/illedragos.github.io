import React, { useEffect, useState } from "react";
import Cyberspace from "./Cyberspace";
import MatrixRain from "./MatrixRain";
import GlitchText from "./GlitchText";
import TerminalBoot from "./TerminalBoot";
import { useHackerMode } from "../context/HackerModeContext";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isHackerMode } = useHackerMode();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Layered depth: glyph rain furthest back, 3D scene in front of it. */}
      <div className="absolute inset-0 opacity-40 dark:opacity-60">
        <MatrixRain intensity={0.9} green={isHackerMode} />
      </div>
      <div className="absolute inset-0 opacity-80 dark:opacity-90">
        <Cyberspace />
      </div>

      {/* Keeps the headline readable over the animation. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/25 to-white/70 dark:from-neutral-900/70 dark:via-neutral-900/25 dark:to-neutral-900/70" />

      <div className="container-max relative z-10 text-center py-28">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="status-chip mx-auto mb-6">
            <span className="status-chip__dot" />
            {isHackerMode ? "root shell · engaged" : "system online · available"}
          </div>

          <p className="text-primary-600 dark:text-primary-400 font-medium text-lg mb-4 tracking-wide transition-colors">
            Hello, I'm
          </p>

          <GlitchText
            as="h1"
            text="Dragos Ille"
            className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight transition-colors"
          />

          <h2 className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-100 mb-8 font-light transition-colors">
            Full-Stack Developer
          </h2>

          <p className="text-lg text-neutral-500 dark:text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors">
            Crafting elegant digital experiences with 4+ years of expertise in
            modern web technologies. Passionate about building scalable
            solutions that make a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#about" className="btn-primary group">
              <span className="group-hover:translate-x-1 transition-transform inline-block">
                Get to know me
              </span>
            </a>
            <a href="#experience" className="btn-secondary group">
              <span className="group-hover:translate-x-1 transition-transform inline-block">
                View my work
              </span>
            </a>
          </div>

          <TerminalBoot />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
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
