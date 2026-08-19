import React from "react";
import { useCountUp } from "../hooks/useCountUp";

interface Props {
  label: string;
  value: number;
  /** Hue drives the whole meter's palette through a CSS custom property. */
  hue: number;
  active: boolean;
  delay?: number;
  icon?: string;
  compact?: boolean;
  highlighted?: boolean;
}

/**
 * An extruded HUD power meter: a perspective-tilted track with a lit top face,
 * a thickness edge below it, LED segmentation and a glowing playhead pinned to
 * the fill. Colour comes from `--meter-hue`, so hacker mode can retint every
 * meter on the page with one rule.
 */
const SkillMeter: React.FC<Props> = ({
  label,
  value,
  hue,
  active,
  delay = 0,
  icon,
  compact = false,
  highlighted = false,
}) => {
  const shown = useCountUp(value, active, delay);

  return (
    <div
      className={`meter ${compact ? "meter--compact" : ""} ${
        highlighted ? "meter--hot" : ""
      }`}
      style={
        {
          "--meter-hue": hue,
          "--meter-value": `${active ? value : 0}%`,
        } as React.CSSProperties
      }
    >
      <div className="meter__head">
        <span className="meter__label">
          {icon && <span className="meter__icon">{icon}</span>}
          {label}
        </span>
        <span className="meter__value">{Math.round(shown)}%</span>
      </div>

      <div className="meter__stage">
        <div className="meter__track">
          <div className="meter__fill" />
          <div className="meter__segments" />
          <div className="meter__spark" />
        </div>
        <div className="meter__reflection" />
      </div>
    </div>
  );
};

export default SkillMeter;
