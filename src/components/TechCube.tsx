import React from "react";

const FACES = [
  { label: "React", cls: "cube__face--front" },
  { label: "Node", cls: "cube__face--back" },
  { label: "TS", cls: "cube__face--right" },
  { label: "Docker", cls: "cube__face--left" },
  { label: "SQL", cls: "cube__face--top" },
  { label: "Git", cls: "cube__face--bottom" },
];

/** A genuine CSS 3D cube — six transformed planes rotating in a perspective scene. */
const TechCube: React.FC = () => (
  <div className="cube-scene" aria-hidden="true">
    <div className="cube">
      {FACES.map((f) => (
        <div key={f.label} className={`cube__face ${f.cls}`}>
          {f.label}
        </div>
      ))}
    </div>
    <div className="cube-shadow" />
  </div>
);

export default TechCube;
