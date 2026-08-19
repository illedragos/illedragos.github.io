import React, { useState } from "react";
import HobbyOrbit from "./HobbyOrbit";
import type { OrbitBody } from "./HobbyOrbit";
import SkillMeter from "./SkillMeter";
import { useInView } from "../hooks/useInView";

// Module-level so the reference stays stable — HobbyOrbit rebuilds its whole
// system whenever this array identity changes.
const HOBBIES: OrbitBody[] = [
  { name: "Tennis", icon: "🎾", level: 90, hue: 68 },
  { name: "Football", icon: "⚽", level: 81, hue: 140 },
  { name: "Running", icon: "🏃", level: 92, hue: 25 },
  { name: "Music", icon: "🎵", level: 75, hue: 320 },
  { name: "Gaming", icon: "🎮", level: 30, hue: 272 },
  { name: "Reading", icon: "📚", level: 84, hue: 205 },
];

const Hobbies: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref: sectionRef, inView: isVisible } = useInView<HTMLElement>();

  const focused = hovered === null ? null : HOBBIES[hovered];

  return (
    <section
      ref={sectionRef}
      id="hobbies"
      className="py-20 section-padding bg-neutral-50 dark:bg-neutral-800/50 transition-colors duration-300"
    >
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 transition-colors">
            Hobbies & Interests
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto transition-colors">
            Beyond coding, I enjoy exploring various activities that keep me
            creative and balanced. Each one orbits at its own speed — the closer
            and faster, the more of my time it takes.
          </p>
        </div>

        {/* Orbital map */}
        <div className="orbit-frame relative mx-auto h-[330px] sm:h-[430px] max-w-4xl">
          <HobbyOrbit
            bodies={HOBBIES}
            onHover={setHovered}
            hovered={hovered}
          />

          <span className="holo-bracket holo-bracket--tl" />
          <span className="holo-bracket holo-bracket--tr" />
          <span className="holo-bracket holo-bracket--bl" />
          <span className="holo-bracket holo-bracket--br" />

          <div className="orbit-hud orbit-hud--top">
            <span className="holo-dot" />
            orbit map · {HOBBIES.length} interests
          </div>
          <div className="orbit-hud orbit-hud--bottom">
            {focused
              ? `${focused.name} · interest ${focused.level}%`
              : "select a body to inspect"}
          </div>
        </div>

        {/* Readable breakdown, linked to the map by hover */}
        <div className="mt-12 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {HOBBIES.map((hobby, index) => (
            <div
              key={hobby.name}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="transition-opacity duration-300"
              style={{
                opacity: isVisible ? (hovered === null || hovered === index ? 1 : 0.45) : 0,
                transitionDelay: `${index * 60}ms`,
              }}
            >
              <SkillMeter
                compact
                icon={hobby.icon}
                label={hobby.name}
                value={hobby.level}
                hue={hobby.hue}
                active={isVisible}
                delay={index * 80}
                highlighted={hovered === index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
